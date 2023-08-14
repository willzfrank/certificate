import * as React from 'react';
import { CourseModules, NextPageWithLayout } from 'app/types';
import {
  Accordion,
  AddModuleAccordion,
  Button,
  CreateCourseLayout,
} from 'app/components';
import { clamp } from 'app/utils';
import Link from 'next/dist/client/link';
import { CourseCreationContext } from 'app/contexts';
import { useCreateNewCourse__GenerateModulesMutation } from 'app/api/courseCreationApi';
import { useDragContext, useNotify, useWatchSearchParams } from 'app/hooks';
import { useRouter } from 'next/router';
import { Draggable, DragAndDropContainer } from 'app/components/dnd';
import DragAndDropContext from 'app/components/dnd/DragAndDropContext';
import { useSortModuleMutation } from 'app/api/courseApi';
import { useSortModuleContentMutation } from 'app/api/courseApi';

const CreateCourse_CreateCurriculum: NextPageWithLayout<{}> = () => {
  const { courseInfo, updateCourseInfo, courseModules, updateCourseModules } =
    React.useContext(CourseCreationContext);

  const notify = useNotify();

  const router = useRouter();

  const NUMBER_OF_MODULES_TO_GENERATE = 1;

  const [generateModules, { isLoading }] =
    useCreateNewCourse__GenerateModulesMutation();

  const [mode, courseId] = useWatchSearchParams([
    'mode',
    'courseId',
  ]) as string[];

  const handleGenerateModules = async () => {
    const { data: modulesGenerated, errors } = await generateModules({
      courseId: courseInfo.id,
      quantityToGenerate: NUMBER_OF_MODULES_TO_GENERATE,
    }).unwrap();

    updateCourseInfo({
      ...courseInfo,
      lastSavePoint: 2,
    });

    console.log(modulesGenerated);

    // update course context with the list of newly generated modules
    updateCourseModules([
      ...courseModules,
      ...modulesGenerated.map(({ moduleId: id, ...rest }) => ({
        ...rest,
        moduleId: id,
      })),
    ]);

    if (!errors) {
      router.push(`./review?mode=edit&courseId=${courseId}`);
    }
  };

  React.useEffect(() => {
    if (courseModules.length > 0) {
      // resetModulePosition(courseModules);
    }
  }, [courseModules]);

  const [sort, { isLoading: isSortingModule, isError: sortModuleError }] =
    useSortModuleMutation();

  console.log('Sort', sort);

  const { drag, drop } = React.useContext(DragAndDropContext);
  console.log('Drop', drop);
  console.log('Drag', drag);

  const resetModulePosition = React.useCallback(
    (resources: CourseModules[]) => {
      const res = Promise.all(
        resources.map((resource, index) =>
          sort([
            {
              moduleId: resource.moduleId,
              oldPosition: 100,
              newPosition: index + 1,
            },
            {
              moduleId: resource.moduleId,
              oldPosition: 100,
              newPosition: index + 1,
            },
          ])
        )
      );

      console.log(res);
    },
    []
  );
  console.log;

  const onDropCallback = React.useCallback(async () => {
    // console.log(drag, drop);
    if (
      drag.elementId &&
      drop.elementId &&
      drag.position >= 0 &&
      drop.position >= 0 &&
      drag.children &&
      drop.children
    ) {
      try {
        const res = await sort([
          {
            moduleId: drag.elementId as string,
            oldPosition: drag.position,
            newPosition: drop.position,
          },
          {
            moduleId: drop.elementId as string,
            oldPosition: drop.position,
            newPosition: drag.position,
          },
        ]);

        window.location.reload();
        notify({
          type: 'success',
          title: 'Rearrange successful',
          description: 'Your module has been successfully rearranged',
        });
      } catch (error) {
        notify({
          type: 'error',
          title: 'Error',
          description: 'Could not sort modules. Please try again',
        });
      }
    }
  }, [drag, drop]);
  console.log('onDropCallback', onDropCallback);
  console.log('courseModules', courseModules);

  return (
    <React.Fragment>
      {/* <h1 className="text-5xl">{courseInfo.id}</h1> */}
      <div className="mb-6 md:mb-14 md:w-[65%] w-full">
        <p className="text-2xl md:text-lg font-medium my-1 hidden md:block">
          Create your currriculum
        </p>
        <p className="text-muted text-base leading-7 hidden md:block">
          You’ll be able to create, track and manage your courses on this
          dashboard. You can also track your payments and reviews.
        </p>
      </div>

      <div className="flex items-center justify-end">
        <Button
          loading={isLoading}
          onClick={handleGenerateModules}
          className="text-sm border border-app-pink bg-app-pink text-white rounded px-4 py-2 min-w-[100px] flex items-center gap-3 transition-all"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5V19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 12H19"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Add Module
        </Button>
      </div>

      <Accordion.Group className="md:my-6 my-10">
        {courseModules.map((module) => (
          <Draggable
            key={module.moduleId}
            elementId={module.moduleId}
            onDropCallback={onDropCallback}
            position={module.position}
          >
            <AddModuleAccordion
              {...module}
              id={module.moduleId}
              key={module.moduleId}
            />
          </Draggable>
        ))}
      </Accordion.Group>

      <Link
        href={
          mode === 'edit'
            ? `./uploadimages?mode=edit&courseId=${courseId}`
            : './uploadimages'
        }
      >
        <a className="text-app-pink border-2 border-app-pink px-8 py-2 rounded">
          Next
        </a>
      </Link>
    </React.Fragment>
  );
};

export default CreateCourse_CreateCurriculum;

CreateCourse_CreateCurriculum.getLayout = function (page) {
  return (
    <CreateCourseLayout title="Create Curriculum">{page}</CreateCourseLayout>
  );
};
