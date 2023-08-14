import type { CourseApprovalStatus, NextPageWithLayout } from 'app/types';
import { EmptyState, InstructorsLayout, Loader } from 'app/components';
import Slider from 'react-slick';
import Link from 'next/link';
import InstructorCards from 'app/components/cards/InstructorCards';
import { selectUser } from 'app/redux/slices/userSlice';
import { InstructorFeatures } from 'app/components/cards/InstructorFeatures';
import { formatCurrency } from 'app/utils';
import { useAppSelector } from 'app/redux/hooks';
import { useGetInstructorCourseStatusQuery } from 'app/api/courseApi';

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 700,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  initialSlide: 0,
  arrows: true,
  drag: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2.6,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1.2,
      },
    },
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
const InstructorsDashboard: NextPageWithLayout<{}> = () => {
  const { firstName } = useAppSelector((store) => store.user);
  const user = useAppSelector(selectUser);

  const { isLoading, data, isSuccess, isError } =
    useGetInstructorCourseStatusQuery({
      instructorId: user.id as string,
      page: 1,
      perPage: 10,
    });

  return (
    <div className="px-6 py-8 md:px-14 md:py-10">
      <div className="bg-app-dark-500 w-full p-4 text-white">
        <p>
          To upload a course, you have to apply to be a verified instructor on
          Certifications by Unify.
          <span className="text-app-pink">
            <Link href="/instructors/application"> Click here to apply</Link>
          </span>
        </p>
      </div>
      <div className="mt-4 border p-6">
        <div className="m font-medium text-xl">Welcome {firstName},</div>
        <div>
          {' '}
          <div className="md:flex justify-between mt-3">
            <div className="md:max-w-[45vw]">
              You’ll be able to create, track and manage your courses on this
              dashboard. You can also track your payments and reviews.
            </div>
            <div className="md:flex mt-2 md:mt-0 space-x-2 flex-col">
              <Link href="./createcourse/courseinfo">
                <button
                  type="submit"
                  className="relative flex items-center justify-center md:w-full text-sm font-medium border border-transparent rounded-md group focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200  w-full "
                >
                  Create new course
                </button>
              </Link>
              <Link href="./createcourse/courseinfo?isExternal=true">
                <button
                  type="submit"
                  className="relative flex items-center justify-center md:w-full text-sm font-medium border border-transparent rounded-md group focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200  w-[200px]"
                >
                  Create new external course
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Slider {...sliderSettings}>
          <div>
            <InstructorFeatures value={0} title="Courses created" />
          </div>
          <div>
            <InstructorFeatures value={0} title="Students" />
          </div>
          <div>
            <InstructorFeatures value="0.00" title="Average ratings" />
          </div>
          <div>
            {' '}
            <InstructorFeatures
              value={formatCurrency(0)}
              title="Total Revenue generated"
            />
          </div>
        </Slider>
      </div>
      <div className="mt-6 mb-24">
        <div className=" font-medium text-xl">My courses</div>

        {!data && isLoading && (
          <div className="h-[30vh] w-full flex items-center justify-center">
            <Loader mainColor="red" className="w-24 h-24" />
          </div>
        )}

        {data && data.data.pagedList.length === 0 ? (
          <EmptyState containerClassName="!md:h-[50vh]" />
        ) : (
          <div>
            {' '}
            <div className="grid md:grid-cols-2 md:gap-5 mt-6 space-y-4 md:space-y-0">
              {data?.data?.pagedList.slice(0, 4).map((course, i) => (
                <InstructorCards
                  id={course.courseId}
                  key={course.courseId}
                  title={course.title}
                  imageUrl={course.imageUrl}
                  ratings={course.ratings as number}
                  revenue={course.revenue as number}
                  approvalStatus={course.approvalStatus!}
                  isExternal={course.isExternal}
                  redirectUrl={course.redirectUrl}
                />
              ))}
            </div>
            {data && (
              <div className="flex justify-center items-center mt-7">
                <Link href="courses">
                  <a className="text-sm font-medium border border-transparent rounded-md group m py-2.5 px-9 mr-2 mb-2 text-white bg-[#B61046] border-gray-200  ">
                    See more
                  </a>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorsDashboard;

InstructorsDashboard.getLayout = (page) => {
  return <InstructorsLayout>{page}</InstructorsLayout>;
};
