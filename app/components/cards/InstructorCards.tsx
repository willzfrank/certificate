import * as React from 'react';
import Link from 'next/link';
import { Image, Button, Loader } from 'app/components';
import {
  Course,
  CourseApprovalStatus,
  LastSavedPointType,
  PreviewProps,
  SingleCourseDetailsResponse,
} from 'app/types';

import { formatCurrency, slugify } from 'app/utils';
import {
  useGetInstructorCourseStatusQuery,
  useMoveCourseToDraftMutation,
} from 'app/api/courseApi';
import { useNotify } from 'app/hooks';
import { useDeleteCourseMutation } from 'app/api/courseApi';
import { motion } from 'framer-motion';

interface CourseTakenType {
  // instructors: SingleCourseDetailsResponse["instructors"];
  id: string;
  title: string;
  imageUrl: string;
  ratings: number;
  revenue: number | string;
  approvalStatus: CourseApprovalStatus;
  isExternal: boolean;
  redirectUrl: string | undefined;
}

const InstructorCards = function (props: CourseTakenType) {
  const [moveCourseToDraft, { isLoading: isMovingCourseToDrafts }] =
    useMoveCourseToDraftMutation();

  const [deleteCourse, { isLoading: isDeletingCourse }] =
    useDeleteCourseMutation();

  const notify = useNotify();

  const handleDeleteCourse = React.useCallback(async (courseId: string) => {
    if (confirm('Are you sure you want to delete this course')) {
      try {
        const res = await deleteCourse(courseId).unwrap();
        if (res) {
          notify({
            type: 'success',
            title: 'Successfully deleted course',
            description: 'You have successfully deleted the course',
          });
        } else {
          notify({
            type: 'error',
            title: 'Error - Could not delete course',
            description: JSON.stringify(res),
          });
        }
      } catch (error) {
        notify({
          type: 'error',
          title: 'Error - Could not delete course',
          description: JSON.stringify(error),
        });
      }
    }
  }, []);

  const move = React.useCallback(async (id: string) => {
    try {
      const res = await moveCourseToDraft(id).unwrap();
      console.log(res);
      notify({
        type: 'success',
        title: 'Successfully moved course to draft',
      });
    } catch (error) {
      notify({
        type: 'error',
        title: 'Error',
        description: 'Could not move course to draft',
      });
    }
  }, []);

  const [showDropDown, setShowDropDown] = React.useState<boolean>(false);

  return (
    <div className="border grid grid-cols-[30%_minmax(0,1fr)_5%] border-[#EAEAEA] rounded-[4px] gap-y-2 overflow-clip relative">
      <div className="relative rounded-md overflow-hidden md:rounded-none aspect-2/3">
        <Image
          src={props.imageUrl}
          alt="Picture of the course"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className="h-full"
        />
      </div>

      {/* if the course still a draft, redirect to a different page... So, the instructor can edit the course */}
      <div>
        <Link
          href={
            props.approvalStatus === CourseApprovalStatus.Draft
              ? `/instructors/createcourse/courseinfo?mode=edit&courseId=${
                  props.id
                }${props.isExternal ? '&isExternal=true' : ''}`
              : props.isExternal
              ? props.redirectUrl || ''
              : `/instructors/course/${props.id}`
          }
        >
          <a>
            <div className="p-4">
              <div className="space-y-2">
                <p className="font-medium truncate">{props.title}</p>
                <p className="text-muted truncate">
                  Average ratings : {props.ratings}
                </p>
                <p className="text-muted truncate">
                  Total Revenue : {formatCurrency(props.revenue)}
                </p>
                <p className="font-medium truncate">{props.approvalStatus}</p>
              </div>
            </div>
          </a>
        </Link>
        {props.approvalStatus === CourseApprovalStatus.Draft ? (
          <Link href={`/instructors/course/${props.id}`}>
            <a className="text-app-pink">
              <p className="px-4 py-2 -mt-4">Open as student</p>
            </a>
          </Link>
        ) : (
          <Button
            className={`text-app-pink items-center justify-center ${
              isMovingCourseToDrafts ? 'px-8' : 'px-4'
            } !bg-transparent`}
            loaderColor="red"
            loading={isMovingCourseToDrafts}
            onClick={() => move(props.id)}
          >
            Move to draft
          </Button>
        )}
      </div>
      <div className="mt-4">
        <button onClick={() => setShowDropDown(!showDropDown)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="#898989"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 13a1 1 0 100-2 1 1 0 000 2zM19 13a1 1 0 100-2 1 1 0 000 2zM5 13a1 1 0 100-2 1 1 0 000 2z"
            ></path>
          </svg>
        </button>
      </div>

      {showDropDown ? (
        <motion.div
          className="absolute top-0 right-0 w-52 h-auto p-2 bg-app-gray-100 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ul>
            <li>
              <button onClick={() => handleDeleteCourse(props.id)}>
                {isDeletingCourse ? (
                  <Loader mainColor="red" className="w-24 h-24" />
                ) : (
                  'Delete Course'
                )}
              </button>
            </li>
          </ul>
        </motion.div>
      ) : null}
    </div>
  );
};

export default InstructorCards;
