import React, { useMemo } from 'react'
import { PricingPlan } from 'app/types'
import { motion } from 'framer-motion'
import { Button } from 'app/components'
import { useNotify } from 'app/hooks'
import { useAppSelector } from 'app/hooks'
import { selectUser } from 'app/redux/slices/userSlice'
import { useAddSubscriptionMutation } from 'app/api/subscriptionApi'
import { useScriptLoaded } from 'app/hooks'

import { useCheckDiscountCodeValidityMutation } from 'app/api/subscriptionApi'
import { useRouter } from 'next/router'
import { calculateDiscountedPrice } from '../coursedetails/CourseDetailsHero'

type DiscountDetailsType = {
  value: number
  type: 'DiscountByPercentage' | 'DiscountByAbsoluteValue'
  hasAppliedDiscount: boolean
  discountCode: string
}

interface Props {
  closeModal: () => void
  pricings: any
  courseId: string
  setIsSubscribed: React.Dispatch<React.SetStateAction<boolean | null>>
  isExternal: boolean
  discountDetails: DiscountDetailsType
  setDiscountDetails: (details: DiscountDetailsType) => void
  calculateDiscountedPrice: (
    price: number,
    discountDetails: DiscountDetailsType
  ) => number
  pricingPlan: PricingPlan
}

const freePlan: PricingPlan = {
  id: `${Number.MAX_SAFE_INTEGER}`,
  offers: [],
  name: 'Free',
  subscriptionType: 'Free',
  price: 0,
}

// interface Props {
//   closeModal: () => void;
//   pricingPlan: PricingPlan;
// }

const DiscountModal = (props: Props) => {
  const { closeModal, pricings, courseId, setIsSubscribed, isExternal } = props
  const status = useScriptLoaded('https://checkout.flutterwave.com/v3.js')
  const [isApplyingDiscountCode, setIsApplyingDiscountCode] =
    React.useState(false)
  const notify = useNotify()

  const [checkCodeValidity, { isLoading: isCheckingCodeValidity }] =
    useCheckDiscountCodeValidityMutation()
  const user = useAppSelector(selectUser)
  const [
    addSubscription,
    { isLoading: isCheckingSubscription, error, isError, isSuccess },
  ] = useAddSubscriptionMutation()
  const router = useRouter()

  const applyDiscountCode = React.useCallback(async () => {
    try {
      console.log(props.discountDetails)
      const res = await checkCodeValidity(
        props.discountDetails.discountCode
      ).unwrap()
      if (res.data.isValid) {
        props.setDiscountDetails({
          ...props.discountDetails,
          hasAppliedDiscount: true,
          value: res.data.value,
          type: res.data.discountType,
        })
        notify({
          type: 'success',
          title: `Discount code ${res.data.code.toUpperCase()} applied successfully`,
          description: 'Please process to make payment',
        })
      } else {
        notify({
          type: 'error',
          title: `Discount code ${res.data.code.toUpperCase()} not valid`,
        })
      }
    } catch (error) {
      console.log(error)
      notify({
        type: 'error',
        title: 'Failed to apply discount code',
        description: (error as any).data?.errors[0]?.errorMessages[0],
      })
    }
    // eslint-disable-next-line
  }, [props.discountDetails])

  const handlePay =
    (
      price: number,
      subscriptionType: string | number,
      title: string,
      pricingId: string
    ) =>
    async () => {
      if (price === 0) {
        try {
          const {
            data: { id, referenceNumber },
          } = await addSubscription({
            studentId: user?.id as string,
            courseId,
            amountPaid: price,
            subscriptionType,
            channel: 'Card',
            source: 'Web',
            discountCode: props.discountDetails.hasAppliedDiscount
              ? props.discountDetails.discountCode
              : undefined,
            coursePricingId: pricingId,
          }).unwrap()
          // await trigger({ tx_ref: referenceNumber }).unwrap();
          setIsSubscribed(true)
          router.push(`/paymentProcess/${courseId}?tx_ref=${referenceNumber}`)
        } catch (error) {
          //@ts-ignore
          if (error?.status === 400 || error?.status === 401) {
            router.push('/auth/register')
            notify({
              title: "Couldn't enroll for this course.",
              description: 'Please create an account to enrol for this course.',
              type: 'error',
            })
          }

          //@ts-ignore
          if (error?.status >= 500) {
            notify({
              title: 'Could not enroll for this course',
              description:
                'The fault is on us. Please reach out to our customer support',
              type: 'error',
            })
          }
        }

        return
      }

      if (status === 'ready' && window) {
        let discount = calculateDiscountedPrice(price, props.discountDetails)
        console.log(discount)
        const config = {
          public_key: isExternal
            ? process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY_NEXFORD
            : process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY_TEST ||
              process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
          tx_ref: '', // Initialize tx_ref as an empty string
          amount: price,
          currency: 'NGN',
          meta: {},
          payment_options: 'card,mobilemoney,ussd',
          customer: {
            email: user?.email,
            name: `${user?.lastName} ${user?.firstName}`,
          },
          customizations: {
            title: `${title} package`,
          },
          redirect_url: `${window?.location?.origin}/paymentProcess/${courseId}?isExternal=${isExternal}`,
        }

        try {
          const {
            data: { id, referenceNumber },
          } = await addSubscription({
            studentId: user?.id as string,
            courseId,
            amountPaid: price,
            subscriptionType,
            channel: 'Card',
            source: 'Web',
            coursePricingId: pricingId,
            discountCode: props.discountDetails.hasAppliedDiscount
              ? props.discountDetails.discountCode
              : undefined,
          }).unwrap()

          // Check if referenceNumber exists before proceeding
          if (!referenceNumber) {
            // Handle the case where referenceNumber is missing
            notify({
              title: 'Reference number is missing',
              description: 'Please try again later or contact support.',
              type: 'error',
            })
            return // Exit the function
          }

          config.meta = { id, referenceNumber }
          config.tx_ref = referenceNumber
          // console.log(config)

          // @ts-ignore
          window.FlutterwaveCheckout(config)
        } catch (error) {
          // @ts-ignore
          if (error?.status === 400 || error?.status === 401) {
            router.push('/auth/register')
            notify({
              title: "Couldn't enroll for this course.",
              description:
                'Please create an account to enroll for this course.',
              type: 'error',
            })
          } else {
            notify({
              title: "Couldn't process payment",
              description: JSON.stringify(error),
              type: 'error',
            })
          }
        }
      }
    }

  return (
    <div className="flex items-center flex-col relative  bg-zinc-300  rounded p-10 md:px-20 md:py-12">
      <div>
        <div className="text-black md:text-[25px] font-bold text-center font-['Inter']">
          Get Full Access!
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2.5"
          stroke="currentColor"
          className=" w-[20px] md:w-[30px] h-10.5  cursor-pointer absolute top-5 right-10"
          onClick={closeModal}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <div className=" text-black sm:text-xs md:text-lg font-medium text-center font-['Inter']">
          Subscribe for this course to get full access
        </div>
        <div className="flex mt-10 items-center gap-2">
          {/* DISCOUNT HERE */}
          {!props.discountDetails.hasAppliedDiscount ? (
            <div className="space-y-4 w-full">
              <div className="overflow-clip ">
                <motion.div
                  className=" space-x-1 rounded-lg p-1 text-muted h-14 flex"
                  animate={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 60 }}
                >
                  <input
                    className="h-full px-2 flex-1 uppercase border bg-white rounded-[10px]  border-red-600"
                    maxLength={15}
                    placeholder="Enter Discount Code"
                    readOnly={props.discountDetails.hasAppliedDiscount}
                    onChange={(e) =>
                      props.setDiscountDetails({
                        ...(props.discountDetails as DiscountDetailsType), // Cast discountDetails to the correct type
                        discountCode: e.target.value,
                      })
                    }
                  />

                  <Button
                    className="border border-muted h-full text-sm px-4  bg-red-600 rounded-[10px]"
                    onClick={applyDiscountCode}
                    loading={isCheckingCodeValidity}
                    disabled={props.discountDetails.hasAppliedDiscount}
                  >
                    <span className="md:w-[60px] text-white text-lg font-semibold font-['Inter']">
                      APPLY
                    </span>{' '}
                  </Button>
                </motion.div>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
        <>
          {props.discountDetails.hasAppliedDiscount && (
            <div className=" flex items-center justify-center w-full">
              <Button
                className="bg-red-600 px-7 md:w-[319px] flex items-center justify-center flex-col  py-1 rounded-lg cursor-pointer shadow-md "
                onClick={handlePay(
                  props.pricingPlan?.price,
                  props.pricingPlan?.subscriptionType,
                  props.pricingPlan?.name,
                  props.pricingPlan?.id
                )}
                loading={isCheckingSubscription}
              >
                <div className="flex items-center">
                  <span className=" text-white text-lg font-semibold font-['Inter']">
                    Pay
                  </span>
                  {props.pricings.length > 0 && (
                    <div className="flex gap-[12px] items-start">
                      <div className="flex-1">
                        <p className="font-semibold">
                          <span className="inline-flex gap-4 ml-2">
                            {/* <span className="text-white line-through">
                              ₦ {props.pricings[0].price}
                            </span> */}
                            <span className="text-white">
                              ₦
                              {props.discountDetails.type ===
                              'DiscountByAbsoluteValue'
                                ? props.discountDetails.value.toLocaleString()
                                : (
                                    props.pricings[0].price -
                                    Math.floor(
                                      props.pricings[0].price *
                                        (props.discountDetails.value / 100)
                                    )
                                  ).toLocaleString()}
                            </span>
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Button>
            </div>
          )}
        </>
      </div>
    </div>
  )
}

export default DiscountModal
