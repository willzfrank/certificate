import React, { Fragment, useState, useEffect } from 'react'
import { NextPageWithLayout, USERTYPES } from 'app/types'
import { Loader, MainLayout } from 'app/components'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { usePaymentConfirmQuery } from 'app/api/confirmPaymentApi'
import { useLazyGetSingleCoursePreviewQuery } from 'app/api/courseApi'
import { useWatchSearchParams } from 'app/hooks'

const PaymentProcess: NextPageWithLayout<any> = (props) => {
  const router = useRouter()
  const [tx_ref, isExternal] = useWatchSearchParams([
    'tx_ref',
    'isExternal',
  ]) as [string, string]

  const [getCourseDetails, { isFetching: isLoadingCourseDetails, data }] =
    useLazyGetSingleCoursePreviewQuery()

  const courseId = router?.query?.course as string

  const { isError, isFetching, isSuccess } = usePaymentConfirmQuery(
    {
      tx_ref: tx_ref as string,
    },
    { skip: !tx_ref }
  )

  useEffect(() => {
    ;(async () => {
      if (courseId) {
        try {
          const res = await getCourseDetails({
            courseId,
          }).unwrap()
        } catch (err) {}
      }
    })()
  }, [courseId, getCourseDetails])

  // useEffect(() => {
  //   if (isSuccess && courseId) {
  //     if (isExternal && data?.redirectUrl) {
  //       window.location.href = data.redirectUrl;
  //     } else {
  //       router.push(`/course/${courseId}`);
  //     }
  //   }
  // }, [isSuccess, courseId, isExternal, data]);

  const handleStartHereClick = () => {
    if (isExternal && data?.redirectUrl) {
      window.open(data.redirectUrl, '_blank')
    } else if (data?.id) {
      const courseId = data.id
      const awaitingCourseId1 = 'b31c7954-faa3-4adb-9338-d19cda985861'
      const awaitingCourseId2 = 'c23638f5-6be7-4662-91aa-450a90c2959a'

      if (courseId === awaitingCourseId1 || courseId === awaitingCourseId2) {
        window.location.href = `/course/${courseId}/AwaitingCourse`
      } else {
        window.location.href = `/course/${courseId}`
      }
    }
  }

  return (
    <div className="relative text-center md:mt-[120px] md:min-h-[500px]">
      <div className="pt-6 px-[50px]">
        {isFetching ? (
          <>
            <div className="mt-2">Processing Payment...</div>
            <div className="flex items-center justify-center aspect-square w-20 mx-auto">
              <Loader mainColor="red" className="w-20 h-20" />
            </div>
          </>
        ) : null}
        {isSuccess ? (
          <>
            <div className="mt-2">
              <h3 className="text-xl font-bold">
                Congratulations! You have successfully purchased{' '}
                {data?.id ? (
                  <>
                    <strong>{data?.name} </strong> by{' '}
                    <strong>
                      {data?.instructors.map((ins) => ins.name)?.join(' & ')}
                    </strong>
                  </>
                ) : (
                  <>this course</>
                )}
              </h3>
            </div>
            <div className="my-9">
              <div className="mx-auto w-40">
                <button
                  onClick={handleStartHereClick}
                  className="flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200"
                >
                  Start Here
                </button>
              </div>
            </div>
          </>
        ) : null}
        {isError ? (
          <>
            <div className="mt-2 text-lg">
              <h3 className="text-xl font-bold">
                Oops! Something went wrong with your payment.
              </h3>
              <h3 className="text-xl font-bold my-2">
                Please try again later or contact customer support for
                assistance.
              </h3>
              <p className="text-base">
                Once your payment is successful, we&apos;ll send you a
                confirmation email.
              </p>
              <p className="text-sm my-2">
                Transaction reference: <b>{tx_ref}</b>
              </p>
            </div>
            <div>
              <div className="mx-auto w-40">
                <Link href="/dashboard">
                  <a className="flex items-center justify-center w-full text-sm font-medium border border-transparent rounded-md group focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 ">
                    Go Home{' '}
                  </a>
                </Link>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

PaymentProcess.getLayout = (page) => {
  return (
    <MainLayout
      allowedUserTypes={[USERTYPES.INSTRUCTOR, USERTYPES.STUDENT]}
      completeFooter
    >
      {page}
    </MainLayout>
  )
}

export default PaymentProcess
