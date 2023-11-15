import React, {
  useState,
  useEffect,
  Fragment,
  ReactNode,
  useMemo,
} from 'react';
import {
  Checkbox,
  Image,
  StarRating,
  Modal,
  VideoPlayer,
  Button,
  CustomizedLottie,
  FallbackImage,
} from 'app/components';
import {
  CheckDiscountCodeValidityResponse,
  ExternalCourse,
  SingleCourseDetailsResponse,
} from 'app/types';
import {
  useAddSubscriptionMutation,
  useCheckDiscountCodeValidityMutation,
} from 'app/api/subscriptionApi';
import { useAppSelector, useScriptLoaded, useNotify } from 'app/hooks';
import { useRouter } from 'next/router';
import useFreeModulesAvailable from 'app/hooks/useFreeModulesAvailable';

import checkLottie from 'app/lotties/check.json';
import { motion } from 'framer-motion';
import { useLazyGetSingleCoursePreviewQuery } from 'app/api/courseApi';
import { USER as USERMODEL, PricingPlan } from 'app/types';
import { selectUser } from 'app/redux/slices/userSlice';
import Link from 'next/link';
import {
  useLazyPaymentConfirmQuery,
  usePaymentConfirmQuery,
} from 'app/api/confirmPaymentApi';
import { getTime } from 'app/utils';
import FullAccess from '../watchcourse/FullAccess';
import { Disclosure } from '@headlessui/react';
import DiscountModal from '../watchcourse/DiscountModal';

const freePlan: PricingPlan = {
  id: `${Number.MAX_SAFE_INTEGER}`,
  offers: [],
  name: 'Free',
  subscriptionType: 'Free',
  price: 0,
};

const memoizedCheckLottieConfig = {
  loop: false,
  autoplay: true,
  animationData: checkLottie,
};

const CourseDetailsHero = (props: ExternalCourse) => {
  const [pricingPlan, setPricingPlan] = useState<PricingPlan>(
    props.pricings[0] ?? freePlan
  );

  const status = useScriptLoaded('https://checkout.flutterwave.com/v3.js');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [accessModal, setAccessModal] = useState(false);
  const [discountModal, setDiscountModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [addSubscription, { isLoading, error, isError, isSuccess }] =
    useAddSubscriptionMutation();
  const [accessCourse, setAccessCourse] = useState(false);
  const [showAccessButton, setShowAccessButton] = useState(true);

  const handleAccessCourse = () => {
    setShowAccessButton(false);
    setAccessCourse(true);
  };

  const [trigger, { isLoading: confirmingPurchase }] =
    useLazyPaymentConfirmQuery();

  const notify = useNotify();
  const { token } = useAppSelector((store) => store.user);
  const freeModulesAvailable = useFreeModulesAvailable(props?.modules);

  const [getCourseDetails, { isFetching: isLoadingCourseDetails }] =
    useLazyGetSingleCoursePreviewQuery();

  const router = useRouter();
  const { asPath } = useRouter();

  type DiscountDetailsType = {
    value: number;
    type: 'DiscountByPercentage' | 'DiscountByAbsoluteValue';
    hasAppliedDiscount: boolean;
    discountCode: string;
  };

  const [discountDetails, setDiscountDetails] =
    React.useState<DiscountDetailsType>({
      value: 0,
      type: 'DiscountByPercentage',
      hasAppliedDiscount: false,
      discountCode: '',
    });

  React.useEffect(() => {
    if (discountDetails.hasAppliedDiscount) {
      setPricingPlan((pricingPlan) => ({
        ...pricingPlan,
        price:
          discountDetails.type === 'DiscountByAbsoluteValue'
            ? discountDetails.value
            : pricingPlan.price -
              Math.floor(pricingPlan.price * (discountDetails.value / 100)),
      }));
    }
  }, [
    discountDetails.hasAppliedDiscount,
    discountDetails.value,
    discountDetails.type,
  ]);

  useEffect(() => {
    (async () => {
      if (token) {
        try {
          const res = await getCourseDetails({
            courseId: props.id,
            token: token,
          }).unwrap();

          setIsSubscribed(res.isSubscribed);
        } catch (err) {
          console.log(err);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (error || isError) {
      // @ts-ignore
      if (error?.status === 401) {
        router.push(`/auth/register?redirectTo=${asPath}`);
      }
    }
  }, [error, isError, router, asPath]);

  const user = useAppSelector(selectUser);
  const [profile, setProfile] = useState<USERMODEL | null>(null);

  useEffect(() => {
    if (user?.id) {
      setProfile({ ...user });
    }
  }, [user]);

  const closeModal = () => {
    setAccessModal(false);
  };

  const openModal = () => {
    setAccessModal(true);
  };

  const closeDiscountModal = () => {
    setDiscountModal(false);
  };

  const openDiscountModal = () => {
    setDiscountModal(true);
  };

  const calculateDiscountedPrice = (
    price: number,
    discountDetails: DiscountDetailsType
  ) => {
    let updatedPrice = props.pricings[0].price;

    if (discountDetails.hasAppliedDiscount) {
      updatedPrice =
        discountDetails.type === 'DiscountByAbsoluteValue'
          ? discountDetails.value
          : props.pricings[0].price -
            Math.floor(props.pricings[0].price * (discountDetails.value / 100));
    }

    // Update the pricing plan with the updated price
    setPricingPlan((prevPricingPlan) => ({
      ...prevPricingPlan,
      price: updatedPrice,
    }));

    return updatedPrice;
  };

  const handlePay =
    (
      price: number,
      subscriptionType: string | number,
      title: string,
      pricingId: string
    ) =>
    async () => {
      if (price !== 0) {
        return; // Don't execute if price is not zero
      }

      try {
        const {
          data: { id, referenceNumber },
        } = await addSubscription({
          studentId: profile?.id as string,
          courseId: props.id,
          amountPaid: price,
          subscriptionType,
          channel: 'Card',
          source: 'Web',
          discountCode: discountDetails.hasAppliedDiscount
            ? discountDetails.discountCode
            : undefined,
          coursePricingId: pricingId,
        }).unwrap();

        await trigger({ tx_ref: referenceNumber }).unwrap();

        setIsSubscribed(true);

        // router.push(`/paymentProcess/${courseId}?tx_ref=${referenceNumber}`)
      } catch (error) {
        //@ts-ignore
        if (error?.status === 400 || error?.status === 401) {
          router.push('/auth/register');
          notify({
            title: "Couldn't enroll for this course.",
            description: 'Please create an account to enrol for this course.',
            type: 'error',
          });
        }

        //@ts-ignore
        if (error?.status >= 500) {
          notify({
            title: 'Could not enroll for this course',
            description:
              'The fault is on us. Please reach out to our customer support',
            type: 'error',
          });
        }
      }
    };

  return (
    <React.Fragment>
      <div className="min-h-[65vh] lg:px-14 lg:py-20 lg:bg-app-dark-500 lg:text-white flex flex-col overflow-y-auto no-scrollbar">
        <div className="flex flex-col lg:flex-row lg:divide-x-2 lg:divide-[#2E284A] h-full items-stretch flex-1">
          <div className="lg:w-[63%] lg:h-[calc(65vh-4rem)] h-full lg:flex lg:items-center gap-8">
            <div className="h-[30vh] lg:h-[400px] w-full lg:w-[300px] relative rounded-lg overflow-clip">
              <Image
                src={props.imageUrl}
                alt="course image"
                className="!absolute h-full w-full"
                objectFit="cover"
                objectPosition={'top center'}
              />
              <button
                onClick={() => setVideoModalOpen(true)}
                className="w-20 h-20 rounded-full bg-[#FEFCF280] relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center"
              >
                <svg
                  width="32"
                  height="35"
                  viewBox="0 0 32 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.5317 14.992C31.6827 16.234 31.6828 19.3388 29.5317 20.5807L5.33223 34.5522C3.18117 35.7942 0.492332 34.2418 0.492332 31.7579V3.8148C0.492332 1.33097 3.18116 -0.221436 5.33223 1.02048L29.5317 14.992Z"
                    fill="#130F26"
                    fillOpacity="0.5"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 lg:pr-8 space-y-[16px] lg:space-y-[20px] p-6 lg:pl-0">
              <p className="text-xl lg:text-2xl font-semibold lg:mb-4">
                {props.name}
              </p>
              <p className="text-muted lg:text-[#D1CFDB] leading-[1.8rem]">
                {props.description}
              </p>
              <div className="flex gap-2">
                <StarRating
                  rating={Number(
                    (props.ratings / (props.ratingsCount || 1)).toPrecision(2)
                  )}
                  over={5}
                  starClassName="scale-130"
                  containerClassName="!gap-2"
                />
                <div className="stars flex gap-1 items-center"></div>

                <p className="text-muted lg:text-[#D1CFDB]">
                  {(props.ratings / (props.ratingsCount || 1)).toPrecision(2)}
                  /5.0 ({props.ratingsCount} reviews)
                </p>
              </div>

              <p className="text-muted lg:text-[#D1CFDB]">
                Duration: ({props.modules.length} lessons){' '}
                {getTime(
                  props.totalNumberOfSeconds * 1000,
                  'HH hours, MM minutes',
                  'relative'
                )}
              </p>
              <p className="text-muted lg:text-[#D1CFDB]">
                Instructor(s):{' '}
                {props.instructors
                  .map((instructor) => instructor.name)
                  .join(', ')}
              </p>
            </div>
          </div>

          <div className="lg:w-[37%] lg:h-[calc(65vh-4rem)] h-full pl-14 lg:pt-4 bg-app-dark-500 px-6 py-10 text-white flex flex-col justify-between">
            <div>
              <p className="text-xl font-semibold">Pricing</p>
              {props.pricings.length > 0 && (
                <div
                  className="flex gap-[12px] items-start"
                  onClick={() => {
                    const selectedPrice = calculateDiscountedPrice(
                      props.pricings[0].price, // Original price
                      discountDetails
                    );

                    console.log('selectedPrice:', selectedPrice); // Log the selected price
                    console.log('discountDetails:', discountDetails); // Lo

                    setPricingPlan({
                      ...props.pricings[0], // Use the last price in the array
                      price: selectedPrice,
                    });
                  }}
                >
                  <div className="md:flex-1 flex md:items-start items-center justify-between w-[250px] flex-row md:flex-col">
                    <p className="font-semibold">
                      {discountDetails.hasAppliedDiscount ? (
                        <span className="inline-flex gap-4 ml-2">
                          <span className="text-white line-through">
                            ₦ {props.pricings[0].price}
                          </span>
                          <span className="text-white">
                            ₦
                            {discountDetails.type === 'DiscountByAbsoluteValue'
                              ? discountDetails.value
                              : props.pricings[0].price -
                                Math.floor(
                                  props.pricings[0].price *
                                    (discountDetails.value / 100)
                                )}
                          </span>
                        </span>
                      ) : (
                        <span className="text-white">
                          ₦ {props.pricings[0].price.toLocaleString()}
                        </span>
                      )}
                    </p>
                    <div className="ml-0">
                      {props.pricings[0].price === 0 ? (
                        ''
                      ) : (
                        <p
                          className=" h-3 cursor-pointer text-orange-500 text-[10px] md:text-[13px] font-medium underline"
                          onClick={openDiscountModal}
                        >
                          Use Discount Code
                        </p>
                      )}
                      {(!isSubscribed || !props.isSubscribed) && (
                        <div
                          className={`${
                            isSubscribed || props.isSubscribed
                              ? 'cursor-not-allowed'
                              : 'cursor-pointer'
                          }`}
                        >
                          {accessModal && !isSubscribed && (
                            <Modal isOpen={accessModal} closeModal={closeModal}>
                              <FullAccess
                                closeModal={closeModal}
                                pricings={props?.pricings}
                                courseId={props?.id}
                                setIsSubscribed={setIsSubscribed}
                                isExternal={props?.isExternal}
                                discountDetails={discountDetails}
                                setDiscountDetails={setDiscountDetails}
                                calculateDiscountedPrice={
                                  calculateDiscountedPrice
                                }
                                setPricingPlan={setPricingPlan}
                                pricingPlan={pricingPlan}
                              />
                            </Modal>
                          )}
                          {/* For Dicount  */}
                          {/* i know am supposed to refactor full access to fit it but am too lazy to think */}
                          <Modal
                            isOpen={discountModal}
                            closeModal={closeDiscountModal}
                          >
                            <DiscountModal
                              closeModal={closeDiscountModal}
                              pricings={props?.pricings}
                              courseId={props?.id}
                              setIsSubscribed={setIsSubscribed}
                              isExternal={props?.isExternal}
                              discountDetails={discountDetails}
                              setDiscountDetails={setDiscountDetails}
                              calculateDiscountedPrice={
                                calculateDiscountedPrice
                              }
                              setPricingPlan={setPricingPlan}
                              pricingPlan={pricingPlan}
                            />
                          </Modal>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="w-5/6">
              {isSubscribed || props.isSubscribed ? (
                <Link href={`/course/${props.id}?slugName=${props.slugName}`}>
                  <div className="flex justify-center flex-1 gap-2 flex-col cursor-pointer">
                    <span
                      className="bg-white bg-opacity-10 rounded-lg h-[56px] w-full
                 text-[#06C281] border-2 inline-flex items-center justify-center space-x-4
                  border-[#06C281] font-bold"
                    >
                      <CustomizedLottie
                        config={memoizedCheckLottieConfig}
                        className="w-9 h-9"
                      />
                      <motion.span
                        initial={{ opacity: 0, y: 14 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.4, delay: 0.2 },
                        }}
                      >
                        Start Course{' '}
                      </motion.span>
                    </span>
                  </div>
                </Link>
              ) : (
                <>
                  {showAccessButton && freeModulesAvailable && (
                    <button
                      className={`bg-white text-[#4993ea] font-bold rounded-lg h-[56px] w-full  border-2 border-black`}
                      onClick={() => {
                        handleAccessCourse();
                      }}
                    >
                      {pricingPlan.price === 0 ? (
                        <div
                          onClick={handlePay(
                            pricingPlan?.price,
                            pricingPlan?.subscriptionType,
                            pricingPlan?.name,
                            pricingPlan?.id
                          )}
                        >
                          <div>
                            <p>Enroll For Free</p>
                            <p className="text-xs">Start now</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-center text-blue-500 md:text-lg text-base font-bold">
                          Start Course
                        </p>
                      )}
                    </button>
                  )}
                  {showAccessButton && freeModulesAvailable && (
                    <p
                      className={`text-center text-xs text-zinc-100 mb-2 ${
                        pricingPlan.price === 0 ? '' : 'font-bold'
                      }`}
                    >
                      {pricingPlan.price === 0
                        ? 'Enroll now to access the free contents in this course'
                        : 'Start now to access the contents in this course'}
                    </p>
                  )}
                </>
              )}
              {/* BUY NOW BUTTON */}
              {(accessCourse || !freeModulesAvailable) &&
                pricingPlan?.price > 0 && (
                  <div className="space-y-2">
                    {!isSubscribed && !props.isSubscribed && (
                      <div className="w-full h-[56px] flex items-center justify-center bg-red-600 cursor-pointer rounded-[35.06px] transition-transform md:mt-0 mt-5 hover:scale-105">
                        <Button
                          className="text-white  text-[12.88px] md:text-[15.88px] font-semibold  flex flex-col items-center justify-center"
                          // onClick={handlePay(pricingPlan?.price, pricingPlan?.subscriptionType, pricingPlan?.name, pricingPlan?.id)}
                          onClick={openModal}
                          loading={
                            confirmingPurchase ||
                            isLoading ||
                            isLoadingCourseDetails
                          }
                        >
                          Buy Now
                          <small className="text-white text-[10px] font-semibold">
                            Access all the contents of this course
                          </small>
                        </Button>
                      </div>
                    )}

                    {freeModulesAvailable && (
                      <Link
                        href={`/course/${props.id}?slugName=${props.slugName}`}
                      >
                        <div className="w-full h-[56px] flex items-center flex-col  justify-center gap-1 rounded-[35.06px] border border-red-600 cursor-pointer transition-transform hover:scale-105">
                          <p className="text-white  text-[12.88px] md:text-[15.88px] font-semibold">
                            Learn For Free
                          </p>
                          <small className="text-white text-[10px] font-semibold">
                            Access the free contents of this course
                          </small>
                        </div>
                      </Link>
                    )}
                  </div>
                )}

              {pricingPlan?.price === 0 && !freeModulesAvailable && (
                <>
                  {!isSubscribed && (
                    <button
                      className={`bg-white text-[#4993ea] font-bold rounded-lg h-[56px] w-full  border-2 border-black`}
                      onClick={() => {
                        handleAccessCourse();
                      }}
                    >
                      {pricingPlan.price === 0 ? (
                        <div
                          onClick={handlePay(
                            pricingPlan?.price,
                            pricingPlan?.subscriptionType,
                            pricingPlan?.name,
                            pricingPlan?.id
                          )}
                        >
                          <div>
                            <p>Enroll For Free</p>
                            <p className="text-xs">Start now</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-center text-blue-500 md:text-lg text-base font-bold">
                          Start Course
                        </p>
                      )}
                    </button>
                  )}
                  {!isSubscribed && (
                    <p
                      className={`text-center text-xs text-zinc-100 mb-2 ${
                        pricingPlan.price === 0 ? '' : 'font-bold'
                      }`}
                    >
                      {pricingPlan.price === 0
                        ? 'Enroll now to access the free contents in this course'
                        : 'Start now to access the contents in this course'}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={videoModalOpen}
        closeModal={() => setVideoModalOpen(false)}
      >
        <VideoPlayer
          className="h-[70vh] w-[70vw]"
          title={props.name}
          src={props.previewVideoUrl}
          posterUrl={props.imageUrl}
        />
      </Modal>
    </React.Fragment>
  );
};

export default CourseDetailsHero;
