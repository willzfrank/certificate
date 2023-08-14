import React from 'react';
import { Tabs } from 'app/components/elements';
import Slider from 'react-slick';
import { categories as courses } from 'app/constants';
import { CourseTaken } from 'app/components/cards';
import { useWatchSearchParams } from 'app/hooks';
import { useGetWishlistQuery } from 'app/api/wishlistApi';
import { useAppSelector } from 'app/redux/hooks';
import { selectUser } from 'app/redux/slices/userSlice';
import { USERTYPES } from 'app/types';
import {
  useGetInProgressCoursesQuery,
  useGetCompletedCoursesQuery,
} from 'app/api/subscriptionApi';

interface NextArrowProps {
  onClick: () => void;
}

const NextArrow: React.FC<NextArrowProps> = ({ onClick }) => {
  return (
    <button
      className="w-10 h-10 items-center justify-center flex rounded-full bg-app-dark-500 bg-opacity-50 absolute z-10 -right-6"
      onClick={onClick}
    >
      <svg
        width="9"
        height="15"
        viewBox="0 0 9 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.62842 14.0612L7.91047 7.77546L1.62842 1.48975"
          stroke="white"
          strokeWidth="1.49123"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

const PrevArrow: React.FC<NextArrowProps> = ({ onClick }) => (
  <button
    className="w-10 h-10 items-center justify-center flex rounded-full bg-app-dark-500 bg-opacity-50 absolute z-10 -left-6"
    onClick={onClick}
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.9102 17.0612L7.6281 10.7755L13.9102 4.48975"
        stroke="white"
        strokeWidth="1.49123"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
);

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 1,
  swipeToSlide: true,
  initialSlide: 0,
  nextArrow: (
    <NextArrow
      onClick={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  ),
  prevArrow: (
    <PrevArrow
      onClick={function (): void {
        throw new Error('Function not implemented.');
      }}
    />
  ),

  arrows: true,
  drag: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 6,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

enum TabValues {
  inProgress = 'inProgress',
  wishlist = 'wishlist',
  completed = 'completed',
}

const CoursesSection = () => {
  const page = useWatchSearchParams('page');
  const user = useAppSelector(selectUser);

  const { data, isLoading, isError } = useGetWishlistQuery(
    { studentId: user.id as string },
    { skip: user.roleName?.toLowerCase() !== USERTYPES.STUDENT.toLowerCase() }
  );

  const {
    data: inProgressCourses,
    isLoading: loadingInProgressCourses,
    isError: inProgressCoursesError,
  } = useGetInProgressCoursesQuery({
    page: 1,
    perPage: 1000,
    studentId: user.id as string,
  });

  const {
    data: completedCourses,
    isLoading: loadingCompletedCourses,
    isError: completedCoursesError,
  } = useGetCompletedCoursesQuery({
    page: 1,
    perPage: 1000,
    studentId: user.id as string,
  });

  return (
    <div className="coursesSection px-6 mt-10  md:px-14">
      <p className="text-xl mb-6 md:mb-10 font-medium">Your Learning</p>
      <Tabs
        isLink={true}
        containerClassName="space-x-12 my-4"
        tabs={[
          {
            href: `/dashboard?page=${TabValues.inProgress}`,
            title: 'In Progress',
            active: !page || page === TabValues.inProgress,
          },
          {
            href: `/dashboard?page=${TabValues.completed}`,
            title: 'Completed Courses',
            active: page === TabValues.completed,
          },
          {
            href: `/dashboard?page=${TabValues.wishlist}`,
            title: 'Wishlist',
            active: page === TabValues.wishlist,
          },
        ]}
        id={'courses-tabs'}
      />

      <div className="my-10">
        {!page || page === TabValues.inProgress ? (
          <Slider {...sliderSettings}>
            {inProgressCourses?.map((course) => (
              <CourseTaken
                key={course.courseId}
                courseId={course.courseId}
                slugName={course.slugName}
                title={course.title}
                imageUrl={course.imageUrl}
                videoUrl={course.videoUrl}
                module={'One'}
                percentageCompleted={course.percentCompleted}
                certificateRequired={course.certificateRequired}
              />
            ))}
          </Slider>
        ) : null}
        {page === TabValues.completed ? (
          <Slider {...sliderSettings}>
            {completedCourses?.map((course) => (
              <CourseTaken
                courseId={course.courseId}
                key={course.courseId}
                title={course.title}
                imageUrl={course.imageUrl}
                slugName={course.slugName}
                videoUrl={course.videoUrl}
                module={'One'}
                percentageCompleted={course.percentCompleted}
                certificateRequired={course.certificateRequired}
              />
            ))}
          </Slider>
        ) : null}
        {page === TabValues.wishlist ? (
          <Slider {...sliderSettings}>
            {data?.data.pagedList.map((course) => (
              <CourseTaken
                key={course.courseId}
                courseId={course.courseId}
                slugName={course.slugName}
                title={course.title}
                imageUrl={course.imageUrl}
                videoUrl={course.videoUrl}
              />
            ))}
          </Slider>
        ) : null}
      </div>
    </div>
  );
};

export default CoursesSection;
