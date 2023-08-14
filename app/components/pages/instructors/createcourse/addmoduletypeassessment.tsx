import { useRerender } from 'app/hooks'
import {
  AssessmentDetailsType,
  QuestionFormValues,
  QuestionOptionType,
} from 'app/types'
import * as React from 'react'
import {
  SubmitHandler,
  useForm,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form'

const AddModuleTypeAssessmentWithRef: React.ForwardRefRenderFunction<
  {
    submitAssessmentValues: () => Promise<AssessmentDetailsType & { isValid: boolean }>
  },
  { moduleId: string }
> = ({ moduleId }, ref) => {
  const { register, getValues, setValue, handleSubmit, formState } = useForm<{
    assessmentName: string
    questions: Omit<QuestionFormValues, 'moduleId'>[]
  }>({
    defaultValues: {
      assessmentName: '',
      questions: [
        {
          question: '',
          optionOne: '',
          optionTwo: '',
          optionThree: '',
          optionFour: '',
          correctOption: null,
        },
      ],
    },
  })

  const [_, rerender] = useRerender()

  const QUESTION_INIT_VALUES = React.useMemo<QuestionFormValues>(() => {
    return {
      question: '',
      optionOne: '',
      optionTwo: '',
      optionThree: '',
      optionFour: '',
      correctOption: null,
      index: getValues('questions').length,
      moduleId,
    }
  }, [getValues, moduleId])

  const editQuestionField = React.useCallback(
    function <T extends keyof QuestionFormValues>(
      questionIndex: number,
      field: T,
      value: typeof QUESTION_INIT_VALUES[T],
    ) {
      const prevQuestions = getValues().questions

      setValue(
        'questions',
        prevQuestions.map((question, index) => {
          if (index === questionIndex) {
            return {
              ...question,
              [field]: value,
            }
          }

          return question
        }),
      )
    },
    [getValues, setValue],
  )

  const deleteQuestion = React.useCallback(
    (index: number) => {
      const prevQuestions = getValues('questions')

      setValue(
        'questions',
        prevQuestions.filter((_, questionIndex) => questionIndex !== index),
      )

      rerender()
    },

    [getValues, setValue, rerender],
  )

  // exposes the assessment details to the parent.... upon submission
  React.useImperativeHandle(
    ref,
    () => ({
      submitAssessmentValues: async () => {
        let isValid = false;

        await handleSubmit(
          () => (isValid = true),
          () => (isValid = false),
        )()

        return {
          name: getValues('assessmentName'),
          questions: getValues('questions').map((q) => ({ ...q, moduleId })),
          isValid: isValid,
        }
      },
    }),
    [handleSubmit, getValues, moduleId],
  )

  return (
    <div>
      <div className="py-2 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
        <label htmlFor="assessmentName">Assessment Name</label>
        <input
          autoFocus
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
          id="assessmentName"
          placeholder="Assessment Name"
          type="text"
          {...register('assessmentName', { required: true })}
        />
      </div>

      {getValues('questions').map((_, index) => (
        <AddModuleTypeAssessmentQuestion
          getValues={getValues}
          onDelete={deleteQuestion}
          handleSubmit={handleSubmit}
          key={index}
          index={index}
          register={register}
        />
      ))}

      <button
        className="text-app-pink py-2 rounded"
        onClick={() => {
          setValue('questions', [
            ...getValues('questions'),
            QUESTION_INIT_VALUES,
          ])
          rerender()
        }}
        type="button"
      >
        Add Question
      </button>
    </div>
  )
}

const AddModuleTypeAssessment = React.forwardRef(AddModuleTypeAssessmentWithRef)

const AddModuleTypeAssessmentQuestion = React.memo(function AssessmentQuestion({
  getValues,
  onDelete,
  index,
  register,
  handleSubmit,
}: {
  getValues: UseFormGetValues<{
    assessmentName: string
    questions: Omit<QuestionFormValues, 'moduleId'>[]
  }>
  onDelete: (index: number) => void
  register: UseFormRegister<{
    questions: Omit<QuestionFormValues, 'moduleId'>[]
    assessmentName: string
  }>
  index: number
  handleSubmit: Function
}) {
  const [isEditing, setEditing] = React.useState<boolean>(true)
  const [_, rerender] = useRerender()

  const onSave: SubmitHandler<QuestionFormValues> = (data) => {
    setEditing(false)
    rerender()
  }

  const correctOptionValue = React.useMemo(() => {
    const values = getValues(`questions.${index}`)

    const {
      correctOption,

      optionOne,
      optionTwo,
      optionThree,
      optionFour,
    } = values

    switch (correctOption) {
      case 'OptionOne':
        return optionOne
      case 'OptionTwo':
        return optionTwo
      case 'OptionThree':
        return optionThree
      default:
        return optionFour
    }
  }, [getValues, index])

  if (!isEditing) {
    return (
      <div className="py-3 flex items-center justify-between">
        <p>
          <strong>Question {index + 1} :</strong> <em>{}</em>
        </p>

        <p>Answer: {correctOptionValue}</p>

        <div className="flex items-center gap-8">
          <button type="button" onClick={() => setEditing(true)}>
            Edit
          </button>
          <button type="button" onClick={() => onDelete(index)}>
            Delete
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="py-2 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center">
        <label htmlFor="question">Question {index + 1}</label>
        <input
          {...register(`questions.${index}.question`, { required: true })}
          type="text"
          id="question"
          placeholder="Question Text"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />
      </div>

      <div className="py-2 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-start">
        <label htmlFor="correctOption">Correct option</label>
        <div className="flex flex-col gap-2">
          <div className="option flex align-center">
            <input
              type="text"
              {...register(`questions.${index}.optionOne`, { required: true })}
              id="OptionOneText"
              placeholder="Option One"
              className="px-4 py-2 rounded border flex-1 text-[15px] text-muted focus:border-app-dark-500 order-2"
            />
            <div className="flex items-center gap-2 mr-4 order-1">
              <input
                type="radio"
                {...register(`questions.${index}.correctOption`, {
                  required: true,
                })}
                id={'OptionOneRadio' + index}
                value="OptionOne"
              />
              <label className="leading-10" htmlFor={'OptionOneRadio' + index}>
                Option 1:{' '}
              </label>
            </div>
          </div>
          <div className="option flex align-center">
            <input
              type="text"
              {...register(`questions.${index}.optionTwo`, { required: true })}
              id="OptionTwoText"
              placeholder="Option Two"
              className="px-4 py-2 rounded border flex-1 text-[15px] text-muted focus:border-app-dark-500 order-2"
            />
            <div className="flex items-center gap-2 mr-4 order-1">
              <input
                type="radio"
                {...register(`questions.${index}.correctOption`, {
                  required: true,
                })}
                id={'OptionTwoRadio' + index}
                value="OptionTwo"
              />
              <label className="leading-10" htmlFor={'OptionTwoRadio' + index}>
                Option 2:{' '}
              </label>
            </div>
          </div>
          <div className="option flex align-center">
            <input
              type="text"
              {...register(`questions.${index}.optionThree`, {
                required: true,
              })}
              id="OptionThreeText"
              placeholder="Option Three"
              className="px-4 py-2 rounded border flex-1 text-[15px] text-muted focus:border-app-dark-500 order-2"
            />
            <div className="flex items-center gap-2 mr-4 order-1">
              <input
                type="radio"
                {...register(`questions.${index}.correctOption`, {
                  required: true,
                })}
                id={'OptionThreeRadio' + index}
                value="OptionThree"
              />
              <label
                className="leading-10"
                htmlFor={'OptionThreeRadio' + index}
              >
                Option 3:{' '}
              </label>
            </div>
          </div>
          <div className="option flex align-center">
            <input
              type="text"
              {...register(`questions.${index}.optionFour`, { required: true })}
              id="OptionFourText"
              placeholder="Option Four"
              className="px-4 py-2 rounded border flex-1 text-[15px] text-muted focus:border-app-dark-500 order-2"
            />
            <div className="flex items-center gap-2 mr-4 order-1">
              <input
                type="radio"
                {...register(`questions.${index}.correctOption`, {
                  required: true,
                })}
                id={'OptionFourRadio' + index}
                value={'OptionFour'}
              />
              <label className="leading-10" htmlFor={'OptionFourRadio' + index}>
                Option 4:{' '}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={handleSubmit(onSave)}>
          Save
        </button>
        <button
          type="button"
          onClick={() => onDelete(index)}
          className="text-app-pink"
        >
          Delete
        </button>
      </div>
    </div>
  )
})

export default AddModuleTypeAssessment
