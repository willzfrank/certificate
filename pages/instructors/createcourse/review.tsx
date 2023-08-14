import * as React from 'react';
import { NextPageWithLayout } from 'app/types';
import {
  Accordion,
  Button,
  CourseContent,
  CreateCourseLayout,
  Image,
  Loader,
  Modal,
  VideoPlayer,
} from 'app/components';
import Link from 'next/link';
import { CourseCreationContext } from 'app/contexts';
import { useAppSelector, useNotify, useWatchSearchParams } from 'app/hooks';
import { useSubmitForReviewMutation } from 'app/api/courseCreationApi';
import { useRouter } from 'next/router';
import { useGetSingleCoursePreviewQuery } from 'app/api/courseApi';

const EditIconLink = ({ color, href }: { color?: string; href: string }) => (
  <Link href={href}>
    <a>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer"
      >
        <path
          d="M17.1641 21.6287H21.9991"
          stroke={color || '#EAEAEA'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16.52 10.5299C17.0371 9.91186 17.9667 9.82124 18.5975 10.3278C18.6324 10.3553 19.753 11.2259 19.753 11.2259C20.446 11.6448 20.6613 12.5354 20.2329 13.2151C20.2102 13.2515 13.8746 21.1763 13.8746 21.1763C13.6639 21.4393 13.3439 21.5945 13.0019 21.5982L10.5757 21.6287L10.029 19.3149C9.95244 18.9895 10.029 18.6478 10.2398 18.3849L16.52 10.5299Z"
          stroke={color || '#EAEAEA'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.3477 12.0005L18.9825 14.7919"
          stroke={color || '#EAEAEA'}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  </Link>
);

const CreateCourse_Review: NextPageWithLayout<{}> = () => {
  const [openVideoModal, setOpenVideoModal] = React.useState(false);
  const { courseInfo, courseMedia, courseModules } = React.useContext(
    CourseCreationContext
  );

  const courseId = courseInfo.id;

  const mode = useWatchSearchParams('mode') as 'edit';

  const { data } = useGetSingleCoursePreviewQuery({ courseId });

  const { firstName, lastName } = useAppSelector((store) => store.user);
  const notify = useNotify();
  const router = useRouter();

  const [submitForReview, { isLoading: isSubmitting, error: submitError }] =
    useSubmitForReviewMutation();

  const handleSubmitForReview = React.useCallback(async () => {
    const res = await submitForReview(courseInfo.id).unwrap();

    if (res.errors.length === 0) {
      notify({
        type: 'success',
        title: 'Success',
        description:
          "Course has been submitted for review. You'll be notified as soon as the course has been reviewed",
      });

      router.push('/instructors/courses?page=Requesting%20Review');
    }
  }, [courseInfo.id, submitForReview, notify, router]);

  return (
    <React.Fragment>
      <div className="px-14 py-6 hidden md:block">
        <p className="font-medium text-lg">Preview your course</p>
      </div>

      <div className="md:px-14 md:h-[60vh] md:bg-app-dark-500 flex flex-col lg:flex-row items-center md:text-white gap-12">
        <div className="md:w-[300px] md:h-[360px] h-[250px] w-full rounded-lg overflow-clip relative">
          {!courseMedia.imagePreview ? (
            <Loader
              mainColor="white"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          ) : (
            <>
              <Image
                src={
                  (courseMedia.imagePreview as string) ||
                  '/images/unifyLogo.png'
                }
                alt={courseInfo.courseName.toLocaleLowerCase() || ''}
                className="h-full w-full"
                objectFit="cover"
              />
              <button
                onClick={() => setOpenVideoModal(true)}
                className="w-20 h-20 bg-[#FEFCF280] rounded-full items-center flex justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
              >
                <svg
                  width="32"
                  height="35"
                  viewBox="0 0 32 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29.5312 14.992C31.6823 16.234 31.6823 19.3388 29.5312 20.5807L5.33174 34.5522C3.18068 35.7942 0.491844 34.2418 0.491844 31.7579V3.8148C0.491844 1.33097 3.18067 -0.221436 5.33174 1.02048L29.5312 14.992Z"
                    fill="#130F26"
                    fillOpacity="0.5"
                  />
                </svg>
              </button>
            </>
          )}
        </div>

        <div className="lg:w-[45%] flex flex-col gap-4">
          <div className="flex">
            <p className="text-xl font-medium flex items-center">
              {courseInfo.courseName}
            </p>
            <EditIconLink
              href={`/instructors/createcourse/courseinfo?${
                mode == 'edit' ? `mode=${mode}&courseId=${courseId}` : ''
              }&focusOn=courseName`}
            />
          </div>
          <div className="flex">
            <p className="leading-7 opacity-80">
              {courseInfo.courseDescription}
            </p>
            <EditIconLink
              href={`/instructors/createcourse/courseinfo?${
                mode == 'edit' ? `mode=${mode}&courseId=${courseId}` : ''
              }&focusOn=courseDescription`}
            />
          </div>
          <div className="flex items-center opacity-80">
            <p>
              Total Video content uploaded: {data?.totalNumberOfSeconds} seconds
            </p>
            <button>
              <EditIconLink
                href={`/instructors/createcourse/createcurriculum?${
                  mode == 'edit' ? `mode=${mode}&courseId=${courseId}` : ''
                }`}
              />
            </button>
          </div>
          <div className="flex items-center opacity-80">
            <p>
              Instructor(s):{' '}
              <span className="capitalize">
                {firstName} {lastName}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="px-14 pb-14">
        <div className="items-center flex gap-2 mt-8 mb-2">
          <p className="font-medium">About the course</p>
          <EditIconLink
            color={'#898989'}
            href={`/instructors/createcourse/courseinfo?${
              mode == 'edit' ? `mode=${mode}&courseId=${courseId}` : ''
            }&focusOn=courseDescription`}
          />
        </div>
        <p className="w-[65%] leading-[160%] tracking-[0.01em] text-muted">
          {courseInfo.courseDescription}
        </p>

        <div className="items-center flex gap-2 mt-8 mb-2">
          <p className="font-medium">Who is this course for?</p>
          <EditIconLink
            color={'#898989'}
            href={`/instructors/createcourse/courseinfo?${
              mode == 'edit' ? `mode=${mode}&courseId=${courseId}` : ''
            }&focusOn=targetAudience`}
          />
        </div>
        <p className="w-[65%] leading-[160%] tracking-[0.01em] text-muted">
          {courseInfo.targetAudience}
        </p>

        <div className="items-center flex gap-2 mt-8 mb-2">
          <p className="font-medium">Course curriculum</p>
          <EditIconLink
            color={'#898989'}
            href={`/instructors/createcourse/createcurriculum?${
              mode == 'edit' ? `mode=${mode}&courseId=${courseId}` : ''
            }`}
          />
        </div>

        {/* <Accordion.Group className="w-[73%]">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <Accordion.Item
                key={index}
                head={({ isOpen }) => (
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-app-dark-400 truncate">
                        Module one: Something Something
                      </p>
                      <p className="text-muted text-[15px]">10 mins</p>
                    </div>
                    <svg
                      className={`transition duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                      width="16"
                      height="9"
                      viewBox="0 0 16 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 1L8 8L1 1"
                        stroke="#2F2D37"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                )}
                body={
                  <p className="leading-7 text-muted text-[15px] md:w-[90%]">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Fusce porttitor nam nunc egestas vel etiam tempus nibh nibh.
                    Ullamcorper odio justo, nisl, faucibus augue ipsum. Egestas
                    pellentesque id donec nibh. Scelerisque venenatis adipiscing
                    augue sagittis.
                  </p>
                }
              />
            ))}
        </Accordion.Group> */}

        <CourseContent
          modules={courseModules}
          courseId={courseInfo.id}
          containerClassName="!p-0"
          hideTitle
        />

        <div className="items-center flex gap-2 mt-8 mb-2">
          <p className="font-medium">Instructor profile</p>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 11.9995C2 6.48051 6.48 1.99951 12 1.99951C17.53 1.99951 22 6.48051 22 11.9995C22 17.5205 17.53 21.9995 12 21.9995C6.48 21.9995 2 17.5205 2 11.9995ZM11.12 8.20951C11.12 7.73051 11.52 7.32951 12 7.32951C12.48 7.32951 12.87 7.73051 12.87 8.20951V12.6295C12.87 13.1105 12.48 13.4995 12 13.4995C11.52 13.4995 11.12 13.1105 11.12 12.6295V8.20951ZM12.01 16.6805C11.52 16.6805 11.13 16.2805 11.13 15.8005C11.13 15.3205 11.52 14.9305 12 14.9305C12.49 14.9305 12.88 15.3205 12.88 15.8005C12.88 16.2805 12.49 16.6805 12.01 16.6805Z"
              fill="#940101"
            />
          </svg>
        </div>
        <p>
          Instructor profile incomplete.{' '}
          <Link href="../profile">
            <a className="underline text-app-pink">Click to update profile</a>
          </Link>
        </p>

        <Button
          loading={isSubmitting}
          className="text-white bg-app-pink border-2 border-app-pink px-8 py-2 rounded my-8"
          onClick={handleSubmitForReview}
        >
          Submit for Review
        </Button>
      </div>

      <Modal
        isOpen={openVideoModal}
        closeModal={() => setOpenVideoModal(false)}
      >
        <VideoPlayer
          className="h-[70vh] w-[70vw]"
          title={courseInfo.courseName}
          description={courseInfo.courseDescription}
          src={courseMedia.videoPreview as string}
          posterUrl={courseMedia.imagePreview as string}
        />
      </Modal>
    </React.Fragment>
  );
};

export default CreateCourse_Review;

CreateCourse_Review.getLayout = function (page) {
  return <CreateCourseLayout noPadding>{page}</CreateCourseLayout>;
};
