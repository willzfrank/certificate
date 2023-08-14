import * as React from 'react';
import Head from 'next/head';
import { clamp } from 'app/utils';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { WatchCourseContext } from 'app/contexts';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/types';

import {
  VideoPlayer,
  Certificate,
  Modal,
  Tabs,
  SelectAllThatApplyPreview,
  ClickAndMatchPreview,
  ThisOrThatPreview,
  FillInTheBlankPreview,
  SelectAnAnswerPreview,
  Button,
} from 'app/components';
import CourseContent from './CourseContent';
import { LOCAL_COMPLETED_COURSES } from 'app/constants';
import { Dialog, Transition } from '@headlessui/react';
import {
  useRegisterDocumentAsReadMutation,
  useRegisterVideoAsWatchedMutation,
} from 'app/api/subscriptionApi';
import * as resourceGuards from 'app/types/guards';
import { QuestionOptionType, ModuleContentTypes, USERTYPES } from 'app/types';
import {
  useWatchSearchParams,
  useAppSelector,
  useCourseCompletion,
  useNotify,
} from 'app/hooks';
import { useRateCourseMutation } from 'app/api/ratingsApi';
import { FillInTheBlankBody } from 'app/api/courseCreationApi';
import Notes from './notes';
import Discussion from './discussion';
import AssessmentDesktop from './assessmentdesktop';
import StarRating from './starRating';
import PDFViewerModal from 'app/components/elements/PDFViewerModal';
import VideoCoursePlayer from 'app/components/elements/VideoCoursePlayer';

const PDFViewer = dynamic(() => import('app/components/elements/PDFViewer'), {
  ssr: false,
  suspense: true,
});

const WatchCourseMain = () => {
  const isPdfOpen = useSelector((state: RootState) => state.modalToggle.isOpen);

  const [courseId, page] = useWatchSearchParams([
    'courseId',
    'page',
  ]) as string[];

  /**
   * page can be either of the following: coursecontent, notes, discussion, assessment or interactivepreview
   *
   * if the value of page is interactivepreview, there should also be a query param called previewType
   * which is either of the following: selectAnAnswer, selectAllThatApply, thisOrThat, fillInTheBlanks, or clickAndMatch
   */
  const isDiscussion = page === 'discussion';
  const { id: studentId, roleName } = useAppSelector((store) => store.user);

  const router = useRouter();

  const [
    registerVideo,
    {
      isLoading: isRegisteringVideo,
      isError: isRegisteringError,
      isSuccess: isRegisteringSuccess,
    },
  ] = useRegisterVideoAsWatchedMutation();

  type CourseContentRefType = React.ElementRef<typeof CourseContent>;

  const courseContentRef = React.useRef<CourseContentRefType>(null);

  const {
    activeResourceIndex,
    setActiveResourceIndex,
    activeModuleIndex,
    setActiveModuleIndex,
    courseDetails,
    allResourses,
    activeResourceType,
    setActiveResourceType,
  } = React.useContext(WatchCourseContext);

  const activeResource = allResourses[activeResourceIndex];

  const moveToNextModule = React.useCallback(() => {
    setActiveModuleIndex(
      clamp(
        0,
        (courseDetails?.modules.length as number) - 1,
        activeModuleIndex + 1
      )
    );
    setActiveResourceIndex(0);
  }, [
    activeModuleIndex,
    courseDetails?.modules.length,
    setActiveModuleIndex,
    setActiveResourceIndex,
  ]);

  const moveToNextResource = React.useCallback(() => {
    if (
      resourceGuards.isVideo(activeResource) &&
      roleName?.toLowerCase() === USERTYPES.STUDENT
    ) {
      registerVideo({
        studentId: studentId as string,
        moduleVideoId: activeResource.id,
        moduleId: courseDetails?.modules[activeModuleIndex].moduleId || '',
      });
    }

    // we just completed the last module
    if (activeResourceIndex === allResourses.length - 1) {
      moveToNextModule();
    } else {
      const nextResourceIndex = clamp(
        0,
        allResourses.length - 1,
        activeResourceIndex + 1
      );

      const newActiveResource = allResourses[nextResourceIndex];

      setActiveResourceIndex(nextResourceIndex);

      if (resourceGuards.isAssessment(newActiveResource)) {
        router.push(
          `${
            roleName?.toLowerCase() === USERTYPES.INSTRUCTOR
              ? '/instructors'
              : ''
          }/course/${courseId}/?page=assessment&assessmentId=${
            newActiveResource.id
          }`
        );
      } else if (
        resourceGuards.isClickAndMatch(newActiveResource) ||
        resourceGuards.isSelectAnAnswer(newActiveResource) ||
        resourceGuards.isFillInTheBlank(newActiveResource) ||
        resourceGuards.isAllThatApply(newActiveResource) ||
        resourceGuards.isThisOrThat(newActiveResource)
      ) {
        router.push(
          `${
            roleName?.toLowerCase() === USERTYPES.INSTRUCTOR
              ? '/instructors'
              : ''
          }/course/${courseId}/?page=interactivepreview`
        );
      } else if (resourceGuards.isDocument(newActiveResource)) {
        setActiveResourceType(ModuleContentTypes.document);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeResource,
    roleName,
    setActiveResourceIndex,
    activeResourceIndex,
    studentId,
    courseDetails?.modules,
    activeModuleIndex,
  ]);

  let [isOpen, setIsOpen] = React.useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [rating, setRating] = React.useState(0);
  const [message, setMessage] = React.useState('');
  const [wouldRecommend, setWouldRecommend] = React.useState<boolean>(true);

  //@ts-ignore
  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const isCourseCompleted = useCourseCompletion(
    courseId,
    courseDetails?.modules.map((module) => module.moduleId) || ['']
  );

  const [shouldShowCertificate, setShouldShowCertificate] =
    React.useState(false);

  React.useEffect(() => {
    const localCompletedCourses = JSON.parse(
      localStorage.getItem(LOCAL_COMPLETED_COURSES) || '[]'
    ) as string[];
    setShouldShowCertificate(
      isCourseCompleted && !localCompletedCourses.includes(courseId)
    );
  }, [isCourseCompleted, courseId]);

  const [
    registerDocumentAsRead,
    {
      isLoading: isRegisteringDocumentAsRead,
      error: registerDocumentAsReadError,
    },
  ] = useRegisterDocumentAsReadMutation();

  const [rateCourse, { data, isLoading, isSuccess, error, isError }] =
    useRateCourseMutation();

  const notify = useNotify();

  const onSubmit = async () => {
    try {
      const res = await rateCourse({
        studentId: studentId as string,
        courseId: courseId as string,
        score: rating,
        text: message,
        wouldRecommend,
      });

      // @ts-ignore
      if (!res?.error) {
        notify({
          title: 'Success',
          description: 'You have successfully rated this course',
          type: 'success',
        });
      } else {
        throw res;
      }
    } catch (error) {
      notify({
        title: 'Error',
        description:
          "An error occurred while rating this course. If you've rated this course before, you can only rate it once",
        type: 'error',
      });
    }
  };

  const numberToQuestionTypeMap: Record<number, QuestionOptionType> = {
    1: 'OptionOne',
    2: 'OptionTwo',
    3: 'OptionThree',
    4: 'OptionFour',
  };

  const markDocumentAsRead = React.useCallback(async () => {
    if (resourceGuards.isDocument(activeResource)) {
      const res = await registerDocumentAsRead({
        studentId: studentId as string,
        moduleDocumentID: activeResource.id,
        moduleId: courseDetails?.modules[activeModuleIndex].moduleId as string,
      }).unwrap();

      if (res.errors.length === 0) {
        notify({
          title: 'Successful',
          description: 'Document successfully marked as read',
          type: 'success',
        });

        moveToNextResource();
      }
    }

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeResource, activeModuleIndex, courseDetails?.modules]);

  const getFillBlank = (body: FillInTheBlankBody) => {
    const OptMap = {
      0: 'optionOne',
      1: 'optionTwo',
      2: 'optionThree',
      3: 'optionFour',
    };

    if (body) {
      const [beforeDash, afterDash] = body?.question?.split(
        body?.answers[0]?.blankSection
      );

      const props = {
        initialValues: {
          ...body,
          beforeDash,
          afterDash,
          //@ts-ignore
          correctOption: body[OptMap[body?.answers[0]?.correctOption]],
        },
      };

      return props;
    }

    return {
      initialValues: { afterDash: '', beforeDash: '', correctOption: '' },
    };
  };

  return (
    <>
      <Head>
        <title>{courseDetails?.name}</title>
      </Head>
      <div className="px-6 md:px-5 md:fullscreen:px-0 ">
        <p className="py-3 md:py-6 text-sm">
          {/* Science of Afro-pop / Lesson 1 / Introduction to the course */}
        </p>

        <div className=" block lg:grid lg:grid-cols-[25vw,_1fr] gap-2 lg:fullscreen:grid-cols-1 ">
          <div className="hidden lg:block ">
            <h6 className="hidden lg:block text-black text-base inter font-normal mb-2">
              Course Outline
            </h6>
            <div className=" h-screen overflow-x-hidden overflow-y-auto">
              <CourseContent
                openModuleId={
                  courseDetails?.modules[activeModuleIndex]?.moduleId
                }
                courseModules={courseDetails?.modules || []}
                courseId={courseDetails?.id as string}
                ref={courseContentRef}
              />
            </div>
          </div>
          <div>
            {shouldShowCertificate ? (
              <Certificate
                courseName={courseDetails?.name || ''}
                onClick={openModal}
                courseId={courseId}
                close={() => setShouldShowCertificate(false)}
              />
            ) : resourceGuards.isVideo(activeResource) ? (
              <div className=" flex items-center justify-center flex-col mt-[-30px]">
                <div className=" w-full h-auto">
                  <h6 className="text-black mb-3 text-center text-base md:text-xl mt-2 lg:mt-0 inter font-semibold ">
                    {courseDetails?.name}
                  </h6>

                  {/* <VideoPlayer
                    className="mt-4 md:mt-0 md:fullscreen:h-screen md:fullscreen:rounded-none"
                    title={activeResource.displayName}
                    description={activeResource.description}
                    src={activeResource.videoUrl}
                    onVideoEnded={moveToNextResource}
                  /> */}
                  <VideoCoursePlayer
                    className="mt-4 md:mt-0 md:fullscreen:h-screen md:fullscreen:rounded-none"
                    title={activeResource.displayName}
                    description={activeResource.description}
                    src={activeResource.videoUrl}
                    onVideoEnded={moveToNextResource}
                  />
                </div>
              </div>
            ) : null}

            {resourceGuards.isDocument(activeResource) ? (
              <div className="">
                <h6 className="text-black mb-3 text-center text-base md:text-xl mt-2 lg:mt-0 inter font-semibold ">
                  {courseDetails?.name}
                </h6>
                <React.Suspense fallback={'Loading PDF Reader'}>
                  <PDFViewer
                    document={activeResource}
                    close={() =>
                      setActiveResourceType(ModuleContentTypes.video)
                    }
                    markAsCompletedLoading={isRegisteringDocumentAsRead}
                    markAsCompleted={markDocumentAsRead}
                  />
                </React.Suspense>
              </div>
            ) : null}

            {isPdfOpen && resourceGuards.isDocument(activeResource) && (
              <Modal
                isOpen={activeResourceType === ModuleContentTypes.document}
                closeModal={() =>
                  setActiveResourceType(ModuleContentTypes.video)
                }
                className="!bg-opacity-100"
              >
                <React.Suspense fallback={'Loading PDF Reader'}>
                  <PDFViewerModal
                    document={activeResource}
                    close={() =>
                      setActiveResourceType(ModuleContentTypes.video)
                    }
                    markAsCompletedLoading={isRegisteringDocumentAsRead}
                    markAsCompleted={markDocumentAsRead}
                  />
                </React.Suspense>
              </Modal>
            )}

            {roleName?.toLowerCase() === USERTYPES.STUDENT ? (
              <div className="lg:w-[95%] hidden lg:block">
                <Tabs
                  id="notes and discussion tab"
                  containerClassName="my-8"
                  isLink
                  tabs={[
                    {
                      title: 'Notes',
                      href: `/course/${courseId}?page=notes`,
                      active: !page || !isDiscussion,
                    },
                    {
                      title: 'Discussion Forum',
                      href: `/course/${courseId}?page=discussion`,
                      active: page === 'discussion',
                    },
                  ]}
                />

                {page !== 'discussion' && <Notes />}
                {page === 'discussion' && <Discussion />}
              </div>
            ) : (
              <Discussion />
            )}

            {page === 'interactivepreview' &&
              (resourceGuards.isSelectAnAnswer(activeResource) ? (
                <>
                  <SelectAnAnswerPreview
                    shouldShow
                    onClose={(isCorrect?: boolean) => {
                      setActiveResourceType(ModuleContentTypes.video);
                      router.back();

                      if (isCorrect) moveToNextResource();
                    }}
                    initialValues={{
                      ...activeResource,
                      correctOption:
                        numberToQuestionTypeMap[
                          activeResource.correctOption + 1
                        ],
                    }}
                  />
                </>
              ) : resourceGuards.isClickAndMatch(activeResource) ? (
                <>
                  <ClickAndMatchPreview
                    shouldShow
                    onClose={(isCorrect?: boolean) => {
                      setActiveResourceType(ModuleContentTypes.video);
                      router.back();

                      if (isCorrect) moveToNextResource();
                    }}
                    initialValues={{
                      title: activeResource.title,
                      statements: activeResource.statements,
                      moduleId: activeResource.moduleId,
                      id: activeResource.id,
                    }}
                  />
                </>
              ) : resourceGuards.isThisOrThat(activeResource) ? (
                <>
                  <ThisOrThatPreview
                    shouldShow
                    onClose={(isCorrect?: boolean) => {
                      setActiveResourceType(ModuleContentTypes.video);
                      router.back();

                      if (isCorrect) moveToNextResource();
                    }}
                    initialValues={{
                      questions: activeResource.questions.map((val) => ({
                        ...val,
                        answer:
                          val.correctOption === 0 ? 'OptionOne' : 'OptionTwo',
                        // cardType of zero represents image, one represents text
                        cardType:
                          val.cardDetails.cardType === 1 ? 'text' : 'image',
                        cardContent: val.cardDetails.content,
                      })),
                      groupId: activeResource.group,
                    }}
                  />
                </>
              ) : resourceGuards.isFillInTheBlank(activeResource) ? (
                <>
                  {/* @ts-ignore */}
                  <FillInTheBlankPreview
                    shouldShow
                    onClose={(isCorrect?: boolean) => {
                      setActiveResourceType(ModuleContentTypes.video);
                      router.back();

                      if (isCorrect) moveToNextResource();
                    }}
                    {...getFillBlank(
                      //@ts-ignore
                      activeResource
                    )}
                  />
                </>
              ) : resourceGuards.isAllThatApply(activeResource) ? (
                <>
                  <SelectAllThatApplyPreview
                    shouldShow
                    onClose={(isCorrect?: boolean) => {
                      setActiveResourceType(ModuleContentTypes.video);
                      router.back();

                      if (isCorrect) moveToNextResource();
                    }}
                    initialValues={{
                      ...activeResource,
                      answers: activeResource.answers.map(
                        (num) => numberToQuestionTypeMap[num + 1]
                      ),
                    }}
                  />
                </>
              ) : null)}

            <div className="block lg:hidden lg:w-1/3">
              <Tabs
                id="notes and discussion tab mobile "
                containerClassName="my-8 !space-x-2"
                tabClassName="text-sm"
                isLink
                tabs={
                  roleName?.toLowerCase() === USERTYPES.INSTRUCTOR
                    ? [
                        {
                          title: 'Course content',
                          href: `/course/${courseId}?page=coursecontent`,
                          active: !page || page === 'coursecontent',
                        },
                        {
                          title: 'Discussion Forum',
                          href: `/course/${courseId}?page=discussion`,
                          active: page === 'discussion',
                        },
                      ]
                    : [
                        {
                          title: 'Course content',
                          href: `/course/${courseId}?page=coursecontent`,
                          active: !page || page === 'coursecontent',
                        },
                        {
                          title: 'Notes',
                          href: `/course/${courseId}?page=notes`,
                          active: page === 'notes',
                        },
                        {
                          title: 'Discussion Forum',
                          href: `/course/${courseId}?page=discussion`,
                          active: page === 'discussion',
                        },
                      ]
                }
              />

              {page === 'notes' &&
                roleName?.toLowerCase() === USERTYPES.STUDENT && <Notes />}

              {page === 'discussion' && <Discussion />}
            </div>

            {(!page || page === 'coursecontent') && (
              <div className="lg:hidden">
                <CourseContent
                  openModuleId={
                    courseDetails?.modules[activeModuleIndex]?.moduleId
                  }
                  courseModules={courseDetails?.modules || []}
                  courseId={courseDetails?.id as string}
                  ref={courseContentRef}
                />
              </div>
            )}

            {page === 'assessment' && (
              <AssessmentDesktop
                moduleId={
                  courseDetails?.modules[activeModuleIndex].moduleId as string
                }
              />
            )}
          </div>
        </div>

        <Transition appear show={isOpen} as={React.Fragment}>
          <Dialog
            as="div"
            className="relative z-10 m-2 min-w-[800px]"
            onClose={closeModal}
          >
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto md:min-w-[531px]">
              <div className="flex min-h-full items-center justify-center text-center">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full md:min-w-[742px] max-w-md transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl transition-all divide-y">
                    <Dialog.Title as="h3" className="font-medium p-4 relative">
                      <div className="text-center font-sans">
                        Rate this course
                      </div>
                      <button
                        type="button"
                        className="absolute right-4 top-2/4 -translate-y-2/4"
                        onClick={closeModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="#2F2D37"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12.994 1.005l-11.99 11.99M13 13.002L1 1"
                          ></path>
                        </svg>
                      </button>
                    </Dialog.Title>
                    <div className="p-6 px-[50px]">
                      <div className="text-center mt-2">
                        <p className=" text-xl font-medium mb-4">
                          Rate “{courseDetails?.name}”
                        </p>
                        <form className="bg-white rounded w-full">
                          <StarRating rating={rating} setRating={setRating} />

                          <p className="my-4">
                            Would you recommend this course to your friend?
                          </p>
                          <div className="flex items-center justify-center gap-8">
                            <div className="flex gap-2 items-center">
                              <label htmlFor="true">Yes</label>
                              <input
                                type="radio"
                                name="would recommend to friend"
                                id={'true'}
                                defaultChecked={true}
                                onChange={() => setWouldRecommend(true)}
                              />
                            </div>
                            <div className="flex gap-2 items-center">
                              <label htmlFor="false">No</label>
                              <input
                                type="radio"
                                name="would recommend to friend"
                                id={'false'}
                                onChange={() => setWouldRecommend(false)}
                              />
                            </div>
                          </div>

                          <div className="mb-5 form-inputs mt-4 md:mt-0">
                            <div className="overflow-hidden flex items-stretch justify-between relative">
                              <textarea
                                id="text"
                                placeholder=" Your review"
                                onChange={handleChange}
                                value={message}
                                className="mt-5 mx-auto resize-none md:w-[420px] h-40 px-3 py-2 pr-10 leading-tight text-gray-700 border border-app-gray rounded"
                              ></textarea>
                            </div>
                          </div>
                        </form>
                      </div>
                      <p>
                        By clicking Submit, I agree that my feedback may be
                        viewed by the Certifications by Unify community, in
                        compliance with the Certifications by Unify Terms of Use
                        and privacy settings.
                      </p>
                      <div className="my-9  flex items-center justify-center">
                        <Button
                          loading={isLoading}
                          type="submit"
                          onClick={onSubmit}
                          className="relative text-sm font-medium border border-transparent rounded-md group focus:outline-none m py-2.5 px-9 mr-2 mb-2 text-white bg-[#B61046] border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                        >
                          Submit review
                        </Button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};

export default WatchCourseMain;
