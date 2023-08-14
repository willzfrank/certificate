import * as React from 'react'
import { useAppSelector, useNotify } from 'app/hooks'
import { useGradeAssessmentMutation } from 'app/api/subscriptionApi'
import { Button } from 'app/components'
import { WatchCourseContext } from 'app/contexts'
import {
  AssessmentResultQuestion,
  AssessmentType,
  ModuleContentResponse,
} from 'app/types'
import type { QuestionOptionType, ExcludePositionAndType } from 'app/types'
import { useRouter } from 'next/router'
import * as resourceguards from 'app/types/guards'

const QuestionsAndAnswersPage = ({
  questions,
  totalQuestions,
  isAtLastPage,
  next,
  questionsPerPage,
  assessmentPageIndex,
  prev,
  isReview,
  reviewQuestions,
}: {
  questions: Array<AssessmentType>
  totalQuestions: number
  next?: () => void
  prev?: () => void
  isAtLastPage: boolean
  questionsPerPage: number
  assessmentPageIndex: number
  isReview?: boolean
  reviewQuestions?: Array<AssessmentResultQuestion>
}) => {
  type ModuleAssessments = ExcludePositionAndType<
    ModuleContentResponse['data']['assessments'][number]
  >

  const questionContainerRef = React.useRef<HTMLDivElement>(null)
  const router = useRouter()
  const urlParams = new URLSearchParams('?' + router.asPath.split('?')[1])

  const notify = useNotify()

  const [
    currentAssessmentDetails,
    setCurrentAssessmentDetails,
  ] = React.useState<NonNullable<ModuleAssessments>>({
    id: '',
    name: '',
    totalNumberOfQuestions: 0,
    isCompleted: false,
  })

  const { id: studentId, firstName } = useAppSelector((store) => store.user)

  React.useEffect(() => {
    questionContainerRef.current?.scrollTo(0, 0)
  }, [assessmentPageIndex])

  const { activeResourceIndex, allResourses, courseDetails } = React.useContext(
    WatchCourseContext,
  )

  const [
    gradeAnswers,
    {
      isLoading: isGradingAnswers,
      isError: isGradingError,
      isSuccess: isGradingSuccess,
      data,
    },
  ] = useGradeAssessmentMutation()

  const currentResource = allResourses[activeResourceIndex]

  React.useEffect(() => {
    if (resourceguards.isAssessment(currentResource)) {
      setCurrentAssessmentDetails(currentResource)
    }
  }, [currentResource])

  React.useEffect(() => {
    questionContainerRef.current?.scrollIntoView()
  }, [questions])

  const [answers, setAnswers] = React.useState<
    Array<{ questionId: string; chosenOption: QuestionOptionType }>
  >([])

  const navigateToReviewSection = () => {
    urlParams.set('action', 'review')

    const toRedirect = `/course/${
      router.query.courseId
    }/?${urlParams.toString()}`

    router.push(toRedirect)
  }

  const onAnswer = (questionId: string, optionChosen: QuestionOptionType) => {
    const answerIndex = answers.findIndex(
      (question) => question.questionId === questionId,
    )

    if (answerIndex >= 0) {
      setAnswers((answers) =>
        answers.map((answer, index) => {
          if (index === answerIndex) {
            return {
              questionId,
              chosenOption: optionChosen,
            }
          } else {
            return answer
          }
        }),
      )
    } else {
      setAnswers([...answers, { questionId, chosenOption: optionChosen }])
    }
  }

  const handleAssessmentSubmit = async () => {
    if (answers.length !== totalQuestions) {
      notify({
        title: 'Not allowed',
        description: "You haven't answered all the questions",
        type: 'error',
      })
    } else {
      await gradeAnswers({
        studentId: studentId as string,
        answers: answers.map((answer) => ({
          id: answer.questionId,
          chosenOption: answer.chosenOption as
            | 'OptionOne'
            | 'OptionTwo'
            | 'OptionThree'
            | 'OptionFour',
        })),
        assessmentGradeId: questions[0].assessmentGradeId,
        moduleId: questions[0].moduleId,
        courseId: courseDetails?.id as string,
      })
    }
  }

  const closeAssessmentModal = () => {
    urlParams.delete('page')
    urlParams.delete('assessmentId')
    urlParams.delete('action')

    const toRedirect = `/course/${
      router.query.courseId
    }/${urlParams.toString()}`

    router.push(toRedirect)
  }

  return (
    <div className="flex flex-col items-stretch justify-between h-full w-full">
      <div className="header md:p-6 text-center border-b py-3 sticky top-0 md:static bg-white">
        <h1 className="md:text-2xl font-medium">
          {courseDetails?.name} ({currentAssessmentDetails?.name})
        </h1>
        <p className="text-sm text-muted md:mt-2 mt-1">
          {totalQuestions} multiple choice questions
        </p>
      </div>

      <div
        className="questionsContainer p-6 md:px-10 flex-1 overflow-y-scroll"
        ref={questionContainerRef}
      >
        {isGradingError ? (
          <div className="h-full w-full flex items-center justify-center flex-col space-y-4">
            <h1 className="text-2xl">An Error Occurred</h1>
            <p>Assessment could not be submitted as a result of an error.</p>
          </div>
        ) : isGradingSuccess && !isReview ? (
          <div className="h-full w-full flex items-center justify-center flex-col space-y-4">
            <h1 className="text-2xl">
              Hi {firstName}, you scored{' '}
              {((data?.data || 0) / totalQuestions) * 100}%
            </h1>

            <div>
              <Button
                className="p-4 text-app-pink rounded-md flex items-center justify-center uppercase"
                onClick={() => router.back()}
              >
                Go back to course
              </Button>

              <Button
                className="p-4 text-app-pink rounded-md flex items-center justify-center uppercase"
                onClick={navigateToReviewSection}
              >
                Review Assessment
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {isReview
              ? reviewQuestions?.map((question, index) => (
                  <ReviewQuestion
                    key={index}
                    {...{
                      ...question,
                      index: assessmentPageIndex * questionsPerPage + index + 1,
                    }}
                  />
                ))
              : questions.map((question, index) => (
                  <Question
                    selectedOption={
                      answers.find(
                        (answer) => answer.questionId === question.id,
                      )?.chosenOption
                    }
                    key={question.id}
                    {...{
                      ...question,
                      index: assessmentPageIndex * questionsPerPage + index + 1,
                      onAnswer,
                    }}
                  />
                ))}
          </div>
        )}
      </div>
      <div className="footer md:p-6 md:py-4 text-center border-t flex items-center justify-between sticky bottom-0 bg-white md:static">
        <div className="flex items-center gap-8">
          {assessmentPageIndex !== 0 && (
            <Button
              className="px-9 py-2 border-2 bg-app-pink border-app-pink rounded text-white"
              onClick={prev}
            >
              Prev
            </Button>
          )}
          <p className="text-muted text-sm">
            {answers.length} of {totalQuestions} answered questions
          </p>
        </div>
        <Button
          loading={isGradingAnswers}
          onClick={
            isAtLastPage
              ? isReview
                ? closeAssessmentModal
                : handleAssessmentSubmit
              : next
          }
          className="px-9 py-2 border-2 bg-app-pink border-app-pink rounded text-white"
        >
          {isAtLastPage ? (isReview ? 'Close Assessment' : 'Submit') : 'Next'}
        </Button>
      </div>
    </div>
  )
}

const ReviewQuestion = (
  props: AssessmentResultQuestion & { index: number },
) => {
  return (
    <div className="mb-6">
      <p className="text-sm text-muted my-1">Question {props.index}</p>
      <p className="md:text-lg mb-3 capitalize">{props.question}</p>
      <div className="my-4 space-y-3 md:my-2 md:space-y-2">
        <div
          className={`flex gap-2 p-2 px-4 border rounded md:w-[50%] items-center ${
            props.chosenOption === 0
              ? props.chosenOption === props.correctOption
                ? 'bg-green-100'
                : 'bg-red-100'
              : props.correctOption === 0
              ? 'bg-green-100'
              : ''
          }`}
        >
          <input
            type={'radio'}
            role={'radio'}
            id={'optionOne' + props.index}
            className="h-4 w-4 rounded-full border border-app-gray-400 checked:bg-black"
            name={props.question + props.index}
            value={'OptionOne'}
          />
          <label
            htmlFor={'optionOne' + props.index}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {props.optionOne}
          </label>
        </div>
        <div
          className={`flex gap-2 p-2 px-4 border rounded md:w-[50%] items-center ${
            props.chosenOption === 1
              ? props.chosenOption === props.correctOption
                ? 'bg-green-100'
                : 'bg-red-100'
              : props.correctOption === 1
              ? 'bg-green-100'
              : ''
          }`}
        >
          <input
            type={'radio'}
            role={'radio'}
            id={'optionTwo' + props.index}
            className="h-4 w-4 rounded-full border border-app-gray-400 checked:bg-black"
            name={props.question + props.index}
            value={'OptionTwo'}
          />
          <label
            htmlFor={'optionTwo' + props.index}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {props.optionTwo}
          </label>
        </div>
        <div
          className={`flex gap-2 p-2 px-4 border rounded md:w-[50%] items-center ${
            props.chosenOption === 2
              ? props.chosenOption === props.correctOption
                ? 'bg-green-100'
                : 'bg-red-100'
              : props.correctOption === 2
              ? 'bg-green-100'
              : ''
          }`}
        >
          <input
            type={'radio'}
            role={'radio'}
            id={'optionThree' + props.index}
            className="h-4 w-4 rounded-full border border-app-gray-400 checked:bg-black"
            name={props.question + props.index}
            value={'OptionThree'}
          />
          <label
            htmlFor={'optionThree' + props.index}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {props.optionThree}
          </label>
        </div>
        <div
          className={`flex gap-2 p-2 px-4 border rounded md:w-[50%] items-center ${
            props.chosenOption === 3
              ? props.chosenOption === props.correctOption
                ? 'bg-green-100'
                : 'bg-red-100'
              : props.correctOption === 3
              ? 'bg-green-100'
              : ''
          }`}
        >
          <input
            type={'radio'}
            role={'radio'}
            id={'optionFour' + props.index}
            className="h-4 w-4 rounded-full border border-app-gray-400 checked:bg-black"
            name={props.question + props.index}
            value={'OptionFour'}
          />
          <label
            htmlFor={'optionFour' + props.index}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {props.optionFour}
          </label>
        </div>
      </div>
    </div>
  )
}

const Question = (
  props: AssessmentType & {
    index: number
    selectedOption?: QuestionOptionType
    onAnswer: (questionId: string, optionChosen: QuestionOptionType) => void
  },
) => {
  // const allOptions = [
  //   'Javascript',
  //   'Python',
  //   'C++',
  //   'C#',
  //   'Objective C',
  //   'Pascal',
  //   'Java',
  //   'COBOL',
  //   'Scala',
  //   'Elixir',
  // ]

  // const questionOptions = Array(4)
  // // index to place correct answer
  // const answerIndex = Math.floor(Math.random() * 4)

  // // the index of the correct answer in the allOptions array
  // const answerIndexInAllAnswersArray = allOptions.indexOf(props.answer)

  // const allOptionsCopy = Object.assign([], allOptions)

  // // remove the correct answer from the list of options
  // allOptionsCopy.splice(answerIndexInAllAnswersArray, 1)

  // for (let i = 0; i < 4; i++) {
  //   if (i === answerIndex) {
  //     questionOptions[i] = props.answer
  //   } else {
  //     const nextOptionIndex = Math.floor(Math.random() * allOptionsCopy.length)

  //     questionOptions[i] = allOptionsCopy[nextOptionIndex]

  //     // remove the added option from the optionsCopy array to prevent duplication of options
  //     allOptionsCopy.splice(nextOptionIndex, 1)
  //   }
  // }

  return (
    <div className="mb-6">
      <p className="text-sm text-muted my-1">Question {props.index}</p>
      <p className="md:text-lg mb-3 capitalize">{props.question}</p>
      <div className="my-4 space-y-3 md:my-2 md:space-y-2">
        <div className="flex gap-2 p-2 px-4 border rounded md:w-[50%] items-center">
          <input
            type={'radio'}
            role={'radio'}
            id={'optionOne' + props.index}
            checked={props.selectedOption === 'OptionOne'}
            className="h-4 w-4 rounded-full border border-app-gray-400 checked:bg-black"
            name={props.question + props.index}
            value={'OptionOne'}
            onChange={(e) =>
              props.onAnswer(
                props.id,
                e.currentTarget.value as
                  | 'OptionOne'
                  | 'OptionTwo'
                  | 'OptionThree'
                  | 'OptionFour',
              )
            }
          />
          <label
            htmlFor={'optionOne' + props.index}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {props.optionOne}
          </label>
        </div>
        <div className="flex gap-2 p-2 px-4 border rounded md:w-[50%] items-center">
          <input
            type={'radio'}
            role={'radio'}
            checked={props.selectedOption === 'OptionTwo'}
            id={'optionTwo' + props.index}
            className="h-4 w-4 rounded-full border border-app-gray-400 checked:bg-black"
            name={props.question + props.index}
            value={'OptionTwo'}
            onChange={(e) =>
              props.onAnswer(
                props.id,
                e.currentTarget.value as
                  | 'OptionOne'
                  | 'OptionTwo'
                  | 'OptionThree'
                  | 'OptionFour',
              )
            }
          />
          <label
            htmlFor={'optionTwo' + props.index}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {props.optionTwo}
          </label>
        </div>
        <div className="flex gap-2 p-2 px-4 border rounded md:w-[50%] items-center">
          <input
            type={'radio'}
            role={'radio'}
            checked={props.selectedOption === 'OptionThree'}
            id={'optionThree' + props.index}
            className="h-4 w-4 rounded-full border border-app-gray-400 checked:bg-black"
            name={props.question + props.index}
            value={'OptionThree'}
            onChange={(e) =>
              props.onAnswer(
                props.id,
                e.currentTarget.value as
                  | 'OptionOne'
                  | 'OptionTwo'
                  | 'OptionThree'
                  | 'OptionFour',
              )
            }
          />
          <label
            htmlFor={'optionThree' + props.index}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {props.optionThree}
          </label>
        </div>
        <div className="flex gap-2 p-2 px-4 border rounded md:w-[50%] items-center">
          <input
            type={'radio'}
            role={'radio'}
            checked={props.selectedOption === 'OptionFour'}
            id={'optionFour' + props.index}
            className="h-4 w-4 rounded-full border border-app-gray-400 checked:bg-black"
            name={props.question + props.index}
            value={'OptionFour'}
            onChange={(e) =>
              props.onAnswer(
                props.id,
                e.currentTarget.value as
                  | 'OptionOne'
                  | 'OptionTwo'
                  | 'OptionThree'
                  | 'OptionFour',
              )
            }
          />
          <label
            htmlFor={'optionFour' + props.index}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {props.optionFour}
          </label>
        </div>
      </div>
    </div>
  )
}

export default QuestionsAndAnswersPage
