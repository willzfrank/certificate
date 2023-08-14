import * as React from 'react'
import { useRouter } from 'next/router'
import { useAppSelector, useWatchSearchParams } from 'app/hooks'
import { Modal, Loader, Button } from 'app/components'
import AssessmentIntro from './assessmentIntro'
import QuestionsAndAnswers from './QuestionsAndAnswers'
import { clamp } from 'app/utils'
import {
  useLazyGetAssessmentDetailsQuery,
  useLazyGetAssessmentResultQuery,
} from 'app/api/courseApi'

const AssessmentDesktop = ({
  moduleId,
  onClickOut,
}: {
  moduleId: string
  onClickOut?: VoidFunction
}) => {
  const router = useRouter()

  const urlParams = new URLSearchParams('?' + router.asPath.split('?')[1])
  const { id: studentId } = useAppSelector((store) => store.user)

  // @ts-ignore
  const [courseId, assessmentId, action] = useWatchSearchParams([
    'courseId',
    'assessmentId',
    'action',
  ])

  const [assessmentPageIndex, setAssessmentPageIndex] = React.useState(0)

  const [
    getAssessmentDetails,
    { data: assessmentRes, isLoading, isError, isSuccess, error },
  ] = useLazyGetAssessmentDetailsQuery()

  // const [] =

  React.useEffect(() => {
    getAssessmentDetails({
      courseId,
      assessmentId,
      moduleId: moduleId as string,
      studentId: studentId as string,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [
    getAssessmentResults,
    {
      data: assessmentResults = { data: { questions: [] } },
      isLoading: isGettingAssessmentResults,
      isSuccess: hasGottenAssessmentResults,
      isError: getAssessmentResultsError,
    },
  ] = useLazyGetAssessmentResultQuery()

  const [hasStarted, setHasStarted] = React.useState(false)

  const QUESTIONS_PER_PAGE = 5

  const closeAssessmentModal = () => {
    urlParams.delete('page')
    urlParams.delete('assessmentId')
    urlParams.delete('action')

    const toRedirect = `/course/${
      router.query.courseId
    }/${urlParams.toString()}`

    router.push(toRedirect)
  }

  React.useEffect(() => {
    ;(async () => {
      if (action === 'review') {
        const res = await getAssessmentResults({
          assessmentGradeId: assessmentRes?.data[0].assessmentGradeId as string,
          studentId: studentId as string,
          moduleId: assessmentRes?.data[0].moduleId as string,
          courseId: courseId,
        })

        setAssessmentPageIndex(0)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action])

  return (
    <Modal
      isOpen={true}
      closeModal={onClickOut ? onClickOut : closeAssessmentModal}
    >
      <div
        className={`${
          hasStarted ? 'h-[100vh] w-[100vw]' : 'h-[75vh] w-[60vw]'
        } bg-white rounded-lg transition-all duration-500`}
      >
        {(isLoading || isGettingAssessmentResults) && (
          <div className="h-full flex items-center justify-center flex-col space-y-2">
            <Loader mainColor="red" className="w-24 h-24" />
            {isGettingAssessmentResults && <p>Loading Results...</p>}
          </div>
        )}

        {isError ? (
          <div className="h-full w-full flex items-center justify-center flex-col space-y-8">
            <div className="flex items-center justify-center flex-col gap-2">
              <h1 className="text-2xl">Assessment already taken</h1>
              <p>You can&apos;t take an assessment twice.</p>
            </div>
            <Button
              className="bg-app-pink p-4 rounded-md text-white flex items-center justify-center w-[240px] hover:bg-white hover:text-app-pink border-2 border-app-pink"
              onClick={closeAssessmentModal}
            >
              Close
            </Button>
          </div>
        ) : (
          <div />
        )}

        {assessmentRes ? (
          !hasStarted ? (
            <AssessmentIntro
              goBack={closeAssessmentModal}
              startAccessment={() => setHasStarted(true)}
            />
          ) : (
            <QuestionsAndAnswers
              isReview={action === 'review'}
              isAtLastPage={
                assessmentPageIndex ===
                Math.ceil(assessmentRes?.data.length / QUESTIONS_PER_PAGE) - 1
              }
              questions={assessmentRes.data.slice(
                assessmentPageIndex * QUESTIONS_PER_PAGE,
                assessmentPageIndex * QUESTIONS_PER_PAGE + QUESTIONS_PER_PAGE,
              )}
              reviewQuestions={assessmentResults.data.questions.slice(
                assessmentPageIndex * QUESTIONS_PER_PAGE,
                assessmentPageIndex * QUESTIONS_PER_PAGE + QUESTIONS_PER_PAGE,
              )}
              questionsPerPage={QUESTIONS_PER_PAGE}
              totalQuestions={assessmentRes.data.length}
              assessmentPageIndex={assessmentPageIndex}
              next={() => setAssessmentPageIndex(assessmentPageIndex + 1)}
              prev={() =>
                setAssessmentPageIndex(
                  clamp(
                    0,
                    Math.ceil(assessmentRes?.data.length / QUESTIONS_PER_PAGE) -
                      1,
                    assessmentPageIndex - 1,
                  ),
                )
              }
            />
          )
        ) : null}
      </div>
    </Modal>
  )
}

export default AssessmentDesktop
