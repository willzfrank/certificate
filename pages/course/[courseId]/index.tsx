import * as React from 'react';

import {
  AssessmentMobile,
  Loader,
  MainLayout,
  Redirect,
  WatchCourseMain,
} from 'app/components';

import { ModuleContentTypes, NextPageWithLayout, USERTYPES } from 'app/types';
import { useAppSelector, useWatchSearchParams } from 'app/hooks';
import { deviceType as getDeviceType, getAllModuleResources } from 'app/utils';
import { useRouter } from 'next/router';
import { useGetCourseModuleContentQuery } from 'app/api/subscriptionApi';
import { WatchCourseContext } from 'app/contexts';
import { useLazyGetSingleCoursePreviewQuery } from 'app/api/courseApi';

const Index: NextPageWithLayout<{}> = () => {
  const { query } = useRouter();
  const router = useRouter();
  const [page, setPage] = React.useState<string | null>();
  const { token } = useAppSelector((store) => store.user);

  const [deviceType, setDeviceType] =
    React.useState<ReturnType<typeof getDeviceType>>();

  const [loading, setLoading] = React.useState(true);

  const courseId = useWatchSearchParams('courseId') as string;

  const [getCourseDetails, { isLoading, data: courseDetails, isError, error }] =
    useLazyGetSingleCoursePreviewQuery();

  React.useEffect(() => {
    (async function () {
      if (courseId) {
        const res = await getCourseDetails(
          {
            courseId,
            token: String(token),
          },
          false
        ).unwrap();

        if (
          res.isExternal &&
          confirm('Are you sure you want to redirect to ' + res.redirectUrl)
        ) {
          router.replace(res.redirectUrl);
        } else {
          setLoading(false);
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const [activeResourceType, setActiveResourceType] =
    React.useState<ModuleContentTypes>(ModuleContentTypes.video);
  const [activeResourceIndex, setActiveResourceIndex] =
    React.useState<number>(0);
  const [activeModuleIndex, setActiveModuleIndex] = React.useState<number>(0);

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
  }, [query.page]);

  if (isLoading || loading) {
    return (
      <div className="h-[85vh] w-[90vw] mx-auto flex items-center justify-center">
        <Loader mainColor="red" className="w-24 h-24" />
      </div>
    );
  }

  if (courseDetails && !courseDetails.isSubscribed) {
    return (
      <div className="h-[85vh] w-[90vw] mx-auto flex items-center justify-center">
        <Loader mainColor="red" className="w-24 h-24" />
        <div>You don&apos;t yet have access to this course</div>
        {/* <Redirect to={`/course/${courseId}/preview`} /> */}
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
        <WatchCourseMain />
      )}
    </WatchCourseContext.Provider>
  );
};

Index.getLayout = function (page) {
  return (
    <MainLayout allowedUserTypes={[USERTYPES.STUDENT]} requiresLogin>
      {page}
    </MainLayout>
  );
};

export default Index;
