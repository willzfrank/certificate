import * as React from 'react'
import { InteractiveTypes, ThisOrThatFormValues, USERTYPES } from 'app/types'
import { clamp } from 'app/utils'
import InteractivePreviewContainer from './InteractivePreviewContainer'
import { Image } from 'app/components'
import { useAppSelector, useNotify } from 'app/hooks'
import { useSetInteractiveTypeAsTakenMutation } from 'app/api/subscriptionApi'

interface ThisOrThatInteractivePreviewProps {
  shouldShow: boolean
  onClose: (isCorrect?: boolean) => void
  initialValues: ThisOrThatFormValues
}

const ThisOrThatInteractivePreview = ({
  shouldShow,
  onClose,
  initialValues,
}: ThisOrThatInteractivePreviewProps) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = React.useState<number>(
    0,
  )

  const activeQuestion = initialValues.questions[activeQuestionIndex]
  const [currentAnswer, setCurrentAnswer] = React.useState<
    typeof activeQuestion['answer']
  >('None')

  const notify = useNotify()

  const goToNextCard = React.useCallback(() => {
    if (currentAnswer === activeQuestion.answer) {
      setActiveQuestionIndex(
        clamp(0, initialValues.questions.length - 1, activeQuestionIndex + 1),
      )
      setCurrentAnswer('None')
    } else {
      notify({ title: 'Fill in the required fields', type: 'warning' })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    activeQuestionIndex,
    initialValues.questions,
    activeQuestion,
    currentAnswer,
  ])

  const [setAsTaken] = useSetInteractiveTypeAsTakenMutation()
  const { roleName, id: studentId } = useAppSelector((store) => store.user)

  React.useEffect(() => {
    if (
      currentAnswer === activeQuestion.answer &&
      activeQuestionIndex === initialValues.questions.length - 1 &&
      roleName?.toLowerCase() === USERTYPES.STUDENT
    ) {
      setAsTaken({
        values: initialValues.questions.map((question) => ({
          interactiveType: InteractiveTypes.thisOrThat,
          studentId: studentId as string,
          interactiveTypeId: question.id as string,
        })),
        moduleId: initialValues.questions[0].moduleId as string,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleName, studentId, activeQuestionIndex, currentAnswer])

  return (
    <InteractivePreviewContainer
      isOpen={shouldShow}
      closeModal={() => onClose(currentAnswer === activeQuestion.answer)}
      isCompleted={currentAnswer !== 'None'}
      isIncorrect={currentAnswer !== activeQuestion.answer}
    >
      <div className="flex gap-8 flex-col">
        <div>
          <p className="text-center text-xl">This or That</p>
          <p className="text-muted text-center my-1">{activeQuestion.title}</p>
        </div>

        <div className="min-w-96 max-w-[85%] min-h-52 rounded border mx-auto flex items-center justify-center overflow-hidden p-4">
          {activeQuestion.cardType === 'image' ? (
            <Image
              src={
                typeof activeQuestion.cardContent === 'string'
                  ? activeQuestion.cardContent
                  : URL.createObjectURL(activeQuestion.cardContent[0])
              }
              className="min-w-40 min-h-40 w-[500px] h-52"
              objectFit="contain"
              alt={`Image for question ${activeQuestion.title}`}
            />
          ) : (
            <p className="text-center text-2xl leading-10">
              {activeQuestion.cardContent as string}
            </p>
          )}
        </div>
        <div className="flex gap-10 w-4/5 mx-auto mb-4">
          <button
            className={`py-4 ${
              currentAnswer === activeQuestion.answer
                ? currentAnswer === 'OptionOne'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-[#B3B1C9]'
            } flex-1`}
            onClick={() => setCurrentAnswer('OptionOne')}
          >
            {activeQuestion.optionOne}
          </button>
          <button
            className={`py-4 ${
              currentAnswer === activeQuestion.answer
                ? currentAnswer === 'OptionTwo'
                  ? 'bg-green-500 text-white'
                  : 'bg-red-500 text-white'
                : 'bg-[#B3B1C9]'
            } flex-1`}
            onClick={() => setCurrentAnswer('OptionTwo')}
          >
            {activeQuestion.optionTwo}
          </button>
        </div>

        <div className="flex gap-4 items-center justify-center -mt-6 mb-4">
          <button
            className="px-8 py-2 rounded bg-app-pink w-auto text-white"
            onClick={
              activeQuestionIndex === initialValues.questions.length - 1
                ? () => onClose(activeQuestion.answer === currentAnswer)
                : goToNextCard
            }
          >
            {activeQuestionIndex === initialValues.questions.length - 1
              ? 'Close'
              : 'Next'}
          </button>
        </div>
      </div>
    </InteractivePreviewContainer>
  )
}

export default ThisOrThatInteractivePreview
