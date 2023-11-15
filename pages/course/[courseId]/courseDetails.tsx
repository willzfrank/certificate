// @ts-nocheck
import * as React from 'react';
import {
  SingleCourseDetailsResponse,
  NextPageWithLayout,
  USERTYPES,
} from 'app/types'; // import { shuffle } from 'app/utils'
import Head from 'next/head';
import CourseDetailsLayout from 'app/components/layouts/courseDetailsLayout';
import DiscountHero from 'app/components/courseDetailsComponent/DiscountHero';
import CourseDetailsHeader from 'app/components/courseDetailsComponent/CourseDetailsHeader';
import AboutCourseDetails from 'app/components/courseDetailsComponent/AboutCourseDetails';
import CourseDetailsModules from 'app/components/courseDetailsComponent/CourseDetailsModules';
import FooterCourseDetails from 'app/components/courseDetailsComponent/FooterCourseDetails';
import AuthModal from 'app/components/modalAuth/AuthModal';

import courseApi from 'app/api/courseApi';

// wrapper to handle SSG rendering... links nextjs with redux
import { wrapper } from 'app/redux/store';
import CourseDetailsNavbar from 'app/components/courseDetailsComponent/CourseDetailsNavbar';

type Course = SingleCourseDetailsResponse;

const CourseDetails: NextPageWithLayout<Course> = (course) => {
  console.log('course', course);

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
        <CourseDetailsNavbar {...course} />
        <DiscountHero />
        <section className="lg:px-20 px-10">
          <CourseDetailsHeader {...course} />
          <AboutCourseDetails {...course} />
          <CourseDetailsModules {...course} />
        </section>
      </main>
      <FooterCourseDetails />
    </>
  );
};

export default CourseDetails;

CourseDetails.getLayout = function (page) {
  return (
    <CourseDetailsLayout
      allowedUserTypes={[USERTYPES.INSTRUCTOR, USERTYPES.STUDENT]}
    >
      {page}
    </CourseDetailsLayout>
  );
};

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
          .unwrap();
        return {
          props: course,
        };
      }
    }
);
