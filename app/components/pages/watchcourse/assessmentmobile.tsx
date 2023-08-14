import * as React from 'react'
import { useRouter } from 'next/router'
import { useAppSelector, useWatchSearchParams } from 'app/hooks'
import { useLazyGetAssessmentDetailsQuery } from 'app/api/courseApi'
import AssessmentIntro from './assessmentIntro'
import QuestionsAndAnswers from './QuestionsAndAnswers'
import { clamp } from 'app/utils'

const AssessmentMobile = ({ moduleId }: { moduleId: string }) => {
  const router = useRouter()

  const { id: studentId } = useAppSelector((store) => store.user)

  const [courseId, assessmentId] = useWatchSearchParams([
    'courseId',
    'assessmentId',
  ]) as [string, string]

  const [assessmentPageIndex, setAssessmentPageIndex] = React.useState(0)

  const [
    getAssessmentDetails,
    { data: assessmentRes, isLoading, isError, isSuccess },
  ] = useLazyGetAssessmentDetailsQuery()

  React.useEffect(() => {
    getAssessmentDetails({
      courseId,
      assessmentId,
      moduleId: moduleId as string,
      studentId: studentId as string,
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [hasStarted, setHasStarted] = React.useState(false)

  const QUESTIONS_PER_PAGE = 5

  return (
    <div>
      {assessmentRes ? (
        !hasStarted ? (
          <AssessmentIntro
            goBack={router.back}
            startAccessment={() => setHasStarted(true)}
          />
        ) : (
          <QuestionsAndAnswers
            isAtLastPage={
              assessmentPageIndex ===
              Math.ceil(assessmentRes?.data.length / QUESTIONS_PER_PAGE) - 1
            }
            questions={assessmentRes.data.slice(
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
  )
}

export default AssessmentMobile
