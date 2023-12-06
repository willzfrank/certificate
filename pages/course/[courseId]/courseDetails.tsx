// @ts-nocheck
import * as React from 'react'
import {
  SingleCourseDetailsResponse,
  NextPageWithLayout,
  USERTYPES,
} from 'app/types' // import { shuffle } from 'app/utils'
import Head from 'next/head'
import CourseDetailsLayout from 'app/components/layouts/courseDetailsLayout'
import DiscountHero from 'app/components/courseDetailsComponent/DiscountHero'
import CourseDetailsHeader from 'app/components/courseDetailsComponent/CourseDetailsHeader'
import AboutCourseDetails from 'app/components/courseDetailsComponent/AboutCourseDetails'
import CourseDetailsModules from 'app/components/courseDetailsComponent/CourseDetailsModules'
import FooterCourseDetails from 'app/components/courseDetailsComponent/FooterCourseDetails'
import AuthModal from 'app/components/modalAuth/AuthModal'
import { Modal } from 'app/components'
import FullAccess from 'app/components/pages/watchcourse/FullAccess'
import { calculateDiscountedPrice } from 'app/components/pages/coursedetails/CourseDetailsHero'

import courseApi from 'app/api/courseApi'
import { DiscountDetailsType } from 'app/components/pages/coursedetails/CourseDetailsHero'
import { freePlan } from 'app/components/pages/coursedetails/CourseDetailsHero'

// wrapper to handle SSG rendering... links nextjs with redux
import { wrapper } from 'app/redux/store'
import CourseDetailsNavbar from 'app/components/courseDetailsComponent/CourseDetailsNavbar'

type Course = SingleCourseDetailsResponse

const CourseDetails: NextPageWithLayout<Course> = (course) => {
  const [showAuthModal, setShowAuthModal] = React.useState(false)
  const [accessModal, setAccessModal] = React.useState(false)
  const [pricingPlan, setPricingPlan] = React.useState<PricingPlan>(
    course.pricings[0] ?? freePlan
  )
  const [isSubscribed, setIsSubscribed] = React.useState<boolean | null>(null)

  const [discountDetails, setDiscountDetails] =
    React.useState<DiscountDetailsType>({
      value: 0,
      type: 'DiscountByPercentage',
      hasAppliedDiscount: false,
      discountCode: '',
    })
  React.useEffect(() => {
    if (discountDetails.hasAppliedDiscount) {
      setPricingPlan((pricingPlan) => ({
        ...pricingPlan,
        price:
          discountDetails.type === 'DiscountByAbsoluteValue'
            ? discountDetails.value
            : pricingPlan.price -
              Math.floor(pricingPlan.price * (discountDetails.value / 100)),
      }))
    }
  }, [
    discountDetails.hasAppliedDiscount,
    discountDetails.value,
    discountDetails.type,
  ])
  

  return (
    <>
      <Head>
        <title>{`Course Details: ${course.name}`}</title>
        <meta name="description" content={course.description} />
        <meta name="title" content="Certifications by Unify" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}

        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Course Details: ${course.name}`} />
        <meta property="og:description" content={course.description} />
        <meta property="og:url" content="https://certifications.unifyedu.ng" />
        <meta property="og:image" content={course.imageUrl} />
        <meta property="og:site_name" content="Certifications by Unify" />

        {/* Twitter */}

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="https://certifications.unifyedu.ng"
        />
        <meta
          property="twitter:url"
          content="https://certifications.unifyedu.ng"
        />
        <meta name="twitter:title" content={`Course Details: ${course.name}`} />
        <meta name="twitter:description" content={course.description} />
        <meta name="twitter:image" content={course.imageUrl} />
      </Head>
      <main>
        {showAuthModal && (
          <Modal
            isOpen={showAuthModal}
            closeModal={() => setShowAuthModal(false)}
          >
            <AuthModal
              setShowAuthModal={setShowAuthModal}
              setAccessModal={setAccessModal}
            />
          </Modal>
        )}
        <>
          <CourseDetailsNavbar {...course} />
          <DiscountHero isAvailable={true} />
          <section className="lg:px-20 px-10">
            <CourseDetailsHeader
              {...course}
              setShowAuthModal={setShowAuthModal}
              setAccessModal={setAccessModal}
            />
            <AboutCourseDetails
              {...course}
              setShowAuthModal={setShowAuthModal}
              setAccessModal={setAccessModal}
              isUserSubscribed={isSubscribed}
              setIsUserSubscribed={setIsSubscribed}
            />
            <CourseDetailsModules {...course} />
          </section>
          <FooterCourseDetails {...course} />
          {accessModal && !isSubscribed && (
            <Modal
              isOpen={accessModal}
              closeModal={() => setAccessModal(false)}
            >
              <FullAccess
                closeModal={() => setAccessModal(false)}
                pricings={course?.pricings}
                courseId={course?.id}
                setIsSubscribed={setIsSubscribed}
                isExternal={course?.isExternal}
                discountDetails={discountDetails}
                setDiscountDetails={setDiscountDetails}
                calculateDiscountedPrice={calculateDiscountedPrice}
                setPricingPlan={setPricingPlan}
                pricingPlan={pricingPlan}
                shown={false}
              />
            </Modal>
          )}
        </>
      </main>
    </>
  )
}

export default CourseDetails

CourseDetails.getLayout = function (page) {
  return (
    <CourseDetailsLayout
      allowedUserTypes={[USERTYPES.INSTRUCTOR, USERTYPES.STUDENT]}
    >
      {page}
    </CourseDetailsLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params }) => {
      if (typeof params?.courseId === 'string') {
        const course = await store
          .dispatch(
            courseApi.endpoints.getSingleCoursePreview.initiate({
              courseId: params.courseId,
            })
          )
          .unwrap()

        return {
          props: course,
        }
      }
    }
    
)
