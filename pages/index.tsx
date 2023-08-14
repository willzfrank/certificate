//@ts-nocheck

import * as React from "react";
import { SmoothScroll } from "app/components/layouts";
import { Header, Footer } from "app/components/elements";
import { Hero, CategorizedCourses, WhyChooseUs } from "app/components/pages";
import { Course, NextPageWithLayout } from "app/types";
import { wrapper } from "app/redux/store";

//@ts-ignore
import TawkMessengerReact from "@tawk.to/tawk-messenger-react";

import courseApi from "app/api/courseApi";

const Home: NextPageWithLayout<{ courses: Array<Course> }> = (props) => {
  return (
    <SmoothScroll>
      <Header />
      <main className="overflow-hidden">
        <Hero />
        <CategorizedCourses courses={props.courses} />
        <WhyChooseUs />
      </main>
      <Footer withSignUpPromotion />
      <TawkMessengerReact
        propertyId="637caa92daff0e1306d8c8c1"
        widgetId="1giffkjn5"
      />
    </SmoothScroll>
  );
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      const {
        data: { pagedList: courses },
      } = await store
        .dispatch(
          courseApi.endpoints.getCourses.initiate({ page: 1, pageSize: 10 })
        )
        .unwrap();

        console.log('successfully retrieved courses', courses);

      return {
        props: {
          courses: courses,
        },
      };
    } catch (error) { 
      console.log('an error exists', error);
      return {
        props: {
          courses: [],
        },
      };
    }
  }
);
