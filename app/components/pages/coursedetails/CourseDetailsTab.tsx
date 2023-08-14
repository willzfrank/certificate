import { Tabs } from 'app/components/elements';
import { SingleCourseDetailsResponse } from 'app/types';
import * as React from 'react';

const CourseDetailsTab = ({
  course,
  currentPage,
}: {
  course: SingleCourseDetailsResponse;
  currentPage?: string;
}) => {
  return (
    <div className="md:p-14 pb-0 px-6 py-12">
      <Tabs
        tabClassName="text-sm mb-2"
        containerClassName="hidden md:flex"
        activeTabIndex={0}
        isLink
        id="courseDetailsTab"
        tabs={[
          {
            title: 'OVERVIEW',
            href: `/course/${course.id}/preview?currentPage=overview`,
            active: !currentPage || currentPage.toLowerCase() === 'overview',
          },
          {
            title: 'COURSE CONTENT',
            href: `/course/${course.id}/preview?currentPage=coursecontent`,
            active: currentPage?.toLowerCase() === 'coursecontent',
          },
          {
            title: 'INSTRUCTOR',
            href: `/course/${course.id}/preview?currentPage=instructor`,
            active: currentPage?.toLowerCase() === 'instructor',
          },
          {
            title: 'REVIEW',
            href: `/course/${course.id}/preview?currentPage=review`,
            active: currentPage?.toLowerCase() === 'review',
          },
        ]}
      />
    </div>
  );
};

export default CourseDetailsTab;
