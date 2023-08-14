import React, { useMemo } from 'react';
import { Course, CourseApprovalStatus, NextPageWithLayout } from 'app/types';
import { useAppSelector } from 'app/redux/hooks';

import InstructorCards from 'app/components/cards/InstructorCards';
import { selectUser } from 'app/redux/slices/userSlice';
import { InstructorsLayout, Loader, Tabs } from 'app/components';
import { useGetInstructorCourseStatusQuery } from 'app/api/courseApi';
import { useWatchSearchParams } from 'app/hooks';
import { EmptyState } from 'app/components';

const InstructorCourses: NextPageWithLayout<{}> = () => {
  const page = useWatchSearchParams('page');
  const user = useAppSelector(selectUser);

  const { isLoading, data, isSuccess, isError } =
    useGetInstructorCourseStatusQuery({
      instructorId: user.id as string,
      page: 1,
      perPage: 1000,
    });

  const groupedCourses = useMemo(() => {
    const result: Array<{ name: CourseApprovalStatus; list: Course[] }> = [
      { name: CourseApprovalStatus.Approved, list: [] },
      { name: CourseApprovalStatus.Pending, list: [] },
      { name: CourseApprovalStatus.Draft, list: [] },
      { name: CourseApprovalStatus.RequestingReview, list: [] },
      { name: CourseApprovalStatus.InReview, list: [] },
      { name: CourseApprovalStatus.Disapproved, list: [] },
      { name: CourseApprovalStatus.ChangesRequested, list: [] },
    ];

    data?.data?.pagedList?.forEach((course, i) => {
      if (
        course.approvalStatus ===
        CourseApprovalStatus.Approved.split(' ').join('')
      ) {
        result[0].list.push(course);
      }
      if (
        course.approvalStatus ===
        CourseApprovalStatus.Pending.split(' ').join('')
      ) {
        result[1].list.push(course);
      }
      if (
        course.approvalStatus === CourseApprovalStatus.Draft.split(' ').join('')
      ) {
        result[2].list.push(course);
      }
      if (
        course.approvalStatus ===
        CourseApprovalStatus.RequestingReview.split(' ').join('')
      ) {
        result[3].list.push(course);
      }
      if (
        course.approvalStatus ===
        CourseApprovalStatus.InReview.split(' ').join('')
      ) {
        result[4].list.push(course);
      }
      if (
        course.approvalStatus ===
        CourseApprovalStatus.Disapproved.split(' ').join('')
      ) {
        result[5].list.push(course);
      }
      if (
        course.approvalStatus ===
        CourseApprovalStatus.ChangesRequested.split(' ').join('')
      ) {
        result[6].list.push(course);
      }
    });
    return result;
  }, [data]);

  return (
    <div className="m-7">
      <Tabs
        isLink={true}
        containerClassName="space-x-12 my-4"
        tabs={groupedCourses.map((g, i) => ({
          href: `/instructors/courses?page=${g.name}`,
          title: g.name,
          active: i === 0 ? !page || page === g.name : page === g.name,
        }))}
        id="instructor's status tab"
      />
      <div className="flex items-center justify-end"></div>

      {isLoading && (
        <div className="h-[60vh] w-full flex items-center justify-center">
          <Loader mainColor="red" className="w-24 h-24" />
        </div>
      )}

      {groupedCourses.find((l) => l.name === page && l.list.length === 0) && (
        <EmptyState svgClassName={{ transform: 'scale(2)' }} />
      )}

      <div className="grid md:grid-cols-2 md:gap-5 mt-6 space-y-4 md:space-y-0">
        {groupedCourses
          .find((g) => g.name === (page || 'Approved'))
          ?.list.map((course, i) => (
            <InstructorCards
              id={course.courseId}
              key={course.courseId}
              title={course.title}
              imageUrl={course.imageUrl}
              ratings={course.ratings as number}
              revenue={course.revenue as number}
              isExternal={course.isExternal}
              approvalStatus={course.approvalStatus as CourseApprovalStatus}
              redirectUrl={course.redirectUrl}
            />
          ))}
      </div>
    </div>
  );
};

export default InstructorCourses;

InstructorCourses.getLayout = (page) => {
  return <InstructorsLayout>{page}</InstructorsLayout>;
};
