// @ts-nocheck
import * as React from "react";
import { SingleCourseDetailsResponse, NextPageWithLayout, USERTYPES } from "app/types";
import { MainLayout, CourseDetailsHero, CourseDetailsTab, CourseContent, CourseInstructorDetails, CarouselContainer, CourseDescription, CourseReview as CourseReviews, Loader } from "app/components";

import courseApi from "app/api/courseApi";

// wrapper to handle SSG rendering... links nextjs with redux
import { wrapper } from "app/redux/store";
import { useWatchSearchParams } from "app/hooks";
import { useGetCoursesQuery } from "app/api/courseApi";

import Head from "next/head";

type Course = SingleCourseDetailsResponse;

const CourseDetails: NextPageWithLayout<Course> = (course) => {
	const currentPage = useWatchSearchParams("currentPage") as string;

	const {
		data = { data: { pagedList: [] } },
		isLoading,
		isError,
	} = useGetCoursesQuery({
		page: 1,
		pageSize: 20,
	});

	return (
		<>
			<Head>
				<title>{`Course: ${course.name}`}</title>
				<meta name="description" content={course.description} />
				<meta name="title" content="Certifications by Unify" />
				<meta name="robots" content="index, follow" />

				{/* Open Graph / Facebook */}

				<meta property="og:type" content="website" />
				<meta property="og:title" content={`Course: ${course.name}`} />
				<meta property="og:description" content={course.description} />
				<meta property="og:url" content="https://certifications.unifyedu.ng" />
				<meta property="og:image" content={course.imageUrl} />
				<meta property="og:site_name" content="Certifications by Unify" />

				{/* Twitter */}

				<meta name="twitter:card" content="summary_large_image" />
				<meta property="twitter:domain" content="https://certifications.unifyedu.ng" />
				<meta property="twitter:url" content="https://certifications.unifyedu.ng" />
				<meta name="twitter:title" content={`Course: ${course.name}`} />
				<meta name="twitter:description" content={course.description} />
				<meta name="twitter:image" content={course.imageUrl} />
			</Head>
			<CourseDetailsHero {...course} />
			<CourseDetailsTab {...{ course, currentPage }} />
			{(!currentPage || currentPage === "overview") && (
				<React.Fragment>
					<CourseDescription {...course} />
					<CourseContent modules={course.modules} courseId={course.id} />
					<CourseInstructorDetails instructors={course.instructors} currentCourseId={course.id} />
					<CourseReviews />
				</React.Fragment>
			)}

			{currentPage === "coursecontent" && <CourseContent modules={course.modules} courseId={course.id} courseType={course?.pricings[0]?.price === 0 ? "free" : "paid"} />}

			{currentPage === "instructor" && <CourseInstructorDetails instructors={course.instructors} currentCourseId={course.id} />}

			{currentPage === "review" && <CourseReviews />}

			{isLoading ? (
				<Loader mainColor="red" className="w-24 h-24" />
			) : (
				<CarouselContainer
					title={"People also viewed"}
					// @ts-ignore
					courses={data.data.pagedList.slice(0, 6)}
				/>
			)}
		</>
	);
};

CourseDetails.getLayout = function (page) {
	return <MainLayout allowedUserTypes={[USERTYPES.INSTRUCTOR, USERTYPES.STUDENT]}>{page}</MainLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
	if (typeof params?.courseId === "string") {
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
});

export default CourseDetails;
