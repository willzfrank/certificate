import * as React from 'react';

import {
  MainLayout,
  Loader,
  Redirect,
  AssessmentMobile,
  WatchCourseMain as WatchCourse,
} from 'app/components';

import { ModuleContentTypes, NextPageWithLayout, USERTYPES } from 'app/types';

import { useAppSelector, useWatchSearchParams } from 'app/hooks';
import { deviceType as getDeviceType, getAllModuleResources } from 'app/utils';
import { useRouter } from 'next/router';
import { useGetSingleCoursePreviewQuery } from 'app/api/courseApi';
import { useGetCourseModuleContentQuery } from 'app/api/subscriptionApi';
import { WatchCourseContext } from 'app/contexts';

const Index: NextPageWithLayout<{}> = () => {
  const { query } = useRouter();
  const [page, setPage] = React.useState<string | null>();

  const [deviceType, setDeviceType] =
    React.useState<ReturnType<typeof getDeviceType>>();

  const [loading, setLoading] = React.useState(true);

  const { id: userId } = useAppSelector((store) => store.user);

  const courseId = useWatchSearchParams('courseId') as string;

  const {
    isLoading,
    data: courseDetails,
    isError,
    error,
  } = useGetSingleCoursePreviewQuery({ courseId }, { skip: !courseId });

  const [activeResourceType, setActiveResourceType] =
    React.useState<ModuleContentTypes>(ModuleContentTypes.video);
  const [activeResourceIndex, setActiveResourceIndex] =
    React.useState<number>(0);

  const [activeModuleIndex, setActiveModuleIndex] = React.useState(0);

  const { data, isError: moduleContentError } = useGetCourseModuleContentQuery(
    {
      courseId,
      moduleId: courseDetails?.modules[activeModuleIndex]?.moduleId as string,
    },
    { skip: !courseId }
  );

  const watchCourseContextInitValues: React.ContextType<
    typeof WatchCourseContext
  > = {
    courseDetails: courseDetails ? courseDetails : undefined,
    allResourses: getAllModuleResources(data?.data),
    activeResourceIndex,
    setActiveResourceIndex,
    activeResourceType,
    setActiveResourceType,
    activeModuleIndex,
    setActiveModuleIndex,
  };

  React.useEffect(() => {
    setDeviceType(getDeviceType());
    const searchParams = new URLSearchParams(location.search);
    const _page = searchParams.get('page');
    setPage(_page);
    setLoading(false);
  }, [query.page]);

  const isCourseInstructor = React.useCallback((): boolean => {
    return (
      courseDetails?.instructors.findIndex(
        (instructor) => instructor.id === userId
      ) !== -1
    );
  }, [courseDetails, userId]);

  if (isLoading || loading) {
    return (
      <div className="h-[85vh] w-[90vw] mx-auto flex items-center justify-center">
        <Loader mainColor="red" className="w-32 h-32" />
      </div>
    );
  }

  if (courseDetails && !isCourseInstructor()) {
    return (
      <div className="h-[85vh] w-[90vw] mx-auto flex items-center justify-center">
        <Loader mainColor="red" className="w-32 h-32" />
        <Redirect to={`/course/${courseId}/preview`} />
      </div>
    );
  }

  return (
    <WatchCourseContext.Provider value={watchCourseContextInitValues}>
      {page === 'assessment' && deviceType !== 'desktop' ? (
        <AssessmentMobile
          moduleId={
            courseDetails?.modules[activeModuleIndex]?.moduleId as string
          }
        />
      ) : (
        <WatchCourse />
      )}
    </WatchCourseContext.Provider>
  );
};

Index.getLayout = function (page) {
  return (
    <MainLayout allowedUserTypes={[USERTYPES.INSTRUCTOR]} requiresLogin>
      {page}
    </MainLayout>
  );
};

export default Index;
