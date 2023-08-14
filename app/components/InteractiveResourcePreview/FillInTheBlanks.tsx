import * as React from 'react'
import { FillInTheBlankFormValues } from 'app/types'
import { useAppSelector, useNotify } from 'app/hooks'
import { Button } from '../elements'
import InteractivePreviewContainer from './InteractivePreviewContainer'

import { QuestionOptionType, USERTYPES, InteractiveTypes } from 'app/types'
import { useSetInteractiveTypeAsTakenMutation } from 'app/api/subscriptionApi'

interface FillInTheBlankInteractivePreviewProps {
  shouldShow: boolean
  onClose: (isCorrect?: boolean) => void
  initialValues: FillInTheBlankFormValues
}

const FillInTheBlankInteractivePreview = ({
  onClose,
  shouldShow,
  initialValues,
}: FillInTheBlankInteractivePreviewProps) => {
  const [submitted, setSubmitted] = React.useState<boolean>(false)
  const [selectedOption, setSelectedOption] = React.useState<string | null>('')

  const notify = useNotify()
  //@ts-ignore
  const handleChange = (e) => {
    const value = e.target.value
    //@ts-ignore
    setSelectedOption(initialValues[value])
  }

  const handleSubmit = () => {
    if (submitted) {
      setSubmitted(false)
      return
    }

    if (!selectedOption) {
      notify({
        title: 'Error 🚫',
        description: 'Please select an option',
        type: 'error',
      })
      return
    } else {
      setSubmitted(true)
    }
  }

  const [setAsTaken] = useSetInteractiveTypeAsTakenMutation()
  const { roleName, id: studentId } = useAppSelector((store) => store.user)

  React.useEffect(() => {
    if (
      selectedOption === initialValues.correctOption &&
      roleName?.toLowerCase() === USERTYPES.STUDENT &&
      submitted
    ) {
      setAsTaken({
        values: [
          {
            interactiveTypeId: initialValues?.id as string,
            studentId: studentId as string,
            interactiveType: InteractiveTypes.fillInTheBlank,
          },
        ],
        moduleId: initialValues.moduleId as string,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleName, studentId, submitted])

  return (
    <InteractivePreviewContainer
      isOpen={shouldShow}
      closeModal={() => onClose(selectedOption === initialValues.correctOption)}
      isCompleted={submitted}
      isIncorrect={selectedOption !== initialValues.correctOption}
    >
      <p className="text-center text-xl flex justify-center space-x-2">
        <span>{initialValues.beforeDash}</span>
        <span className=" bg-inherit border-b-2 basis-14 border-b-black w-[50px]"></span>
        <span>{initialValues.afterDash}</span>
      </p>

      <div className="my-4 space-y-3 md:my-2 md:mt-8 md:space-y-3 flex flex-col items-center">
        <div className="flex gap-2 p-2 px-4 border rounded md:w-[70%] items-center">
          <input
            type={'radio'}
            role={'radio'}
            id={'optionOne'}
            disabled={submitted}
            checked={selectedOption === initialValues.optionOne}
            className="h-4 w-4 rounded-full border border-app-gray-400"
            name={'OptionOne'}
            value={'optionOne'}
            onChange={handleChange}
          />
          <label
            htmlFor={'optionOne'}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {initialValues.optionOne}
          </label>
        </div>
        <div className="flex gap-2 p-2 px-4 border rounded md:w-[70%] items-center">
          <input
            type={'radio'}
            role={'radio'}
            disabled={submitted}
            checked={selectedOption === initialValues.optionTwo}
            id={'optionTwo'}
            className="h-4 w-4 rounded-full border border-app-gray-400"
            name={'OptionTwo'}
            value={'optionTwo'}
            onChange={handleChange}
          />
          <label
            htmlFor={'optionTwo'}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {initialValues.optionTwo}
          </label>
        </div>
        <div className="flex gap-2 p-2 px-4 border rounded md:w-[70%] items-center">
          <input
            type={'radio'}
            role={'radio'}
            disabled={submitted}
            checked={selectedOption === initialValues.optionThree}
            id={'optionThree'}
            className="h-4 w-4 rounded-full border border-app-gray-400"
            name={'OptionThree'}
            value={'optionThree'}
            onChange={handleChange}
          />
          <label
            htmlFor={'optionThree'}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {initialValues.optionThree}
          </label>
        </div>
        <div className="flex gap-2 p-2 px-4 border rounded md:w-[70%] items-center">
          <input
            type={'radio'}
            role={'radio'}
            disabled={submitted}
            checked={selectedOption === initialValues.optionFour}
            id={'optionFour'}
            className="h-4 w-4 rounded-full border border-app-gray-400"
            name={'OptionFour'}
            value={'optionFour'}
            onChange={handleChange}
          />
          <label
            htmlFor={'optionFour'}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {initialValues.optionFour}
          </label>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          disabled={submitted && selectedOption === initialValues.correctOption}
          className="text-white bg-app-pink p-4 items-center flex px-10 rounded my-8 disabled:bg-green-600"
          onClick={handleSubmit}
        >
          {!submitted
            ? 'Submit'
            : selectedOption === initialValues.correctOption
            ? 'Correct'
            : 'Incorrect, Click to Retry'}
        </Button>
        {submitted && selectedOption === initialValues.correctOption && (
          <Button
            className="text-app-pink text-sm"
            onClick={() =>
              onClose(selectedOption === initialValues.correctOption)
            }
          >
            Close Modal
          </Button>
        )}
      </div>
    </InteractivePreviewContainer>
  )
}

export default FillInTheBlankInteractivePreview
