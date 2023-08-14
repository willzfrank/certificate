import * as React from 'react'
import InteractivePreviewContainer from './InteractivePreviewContainer'
import { useAppSelector, useNotify } from 'app/hooks'
import {
  InteractiveTypes,
  SelectAnAnswerFormValues,
  USERTYPES,
} from 'app/types'
import { Button } from '../elements'

import type { QuestionOptionType } from 'app/types'
import { useSetInteractiveTypeAsTakenMutation } from 'app/api/subscriptionApi'

interface SelectAnAnswerPreviewProps {
  shouldShow: boolean
  onClose: (isCorrect?: boolean) => void
  initialValues: SelectAnAnswerFormValues
}

const SelectAnAnswerPreview = ({
  onClose,
  shouldShow,
  initialValues,
}: SelectAnAnswerPreviewProps) => {
  const [submitted, setSubmitted] = React.useState<boolean>(false)
  const { roleName, id: studentId } = useAppSelector((store) => store.user)

  const [
    selectedOption,
    setSelectedOption,
  ] = React.useState<QuestionOptionType | null>(null)

  const notify = useNotify()


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
      // notify({
      //   title: "Something",
      //   description: `correct answer: ${initialValues?.correctOption}, selected answer: ${selectedOption}`,
      //   type: "info",
      // });
      setSubmitted(true)
    }
  }

  const [ setAsTaken ] = useSetInteractiveTypeAsTakenMutation()

  React.useEffect(() => {
    if (
      selectedOption === initialValues?.correctOption &&
      roleName?.toLowerCase() === USERTYPES.STUDENT &&
      submitted
    ) {
      setAsTaken({
        values: [
          {
            interactiveTypeId: initialValues?.id as string,
            studentId: studentId as string,
            interactiveType: InteractiveTypes.selectAnAnswer,
          },
        ],
        moduleId: initialValues.moduleId as string,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption, roleName, studentId, submitted])

  return (
    <InteractivePreviewContainer
      isOpen={shouldShow}
      closeModal={() =>
        onClose(selectedOption === initialValues?.correctOption)
      }
      isCompleted={submitted}
      isIncorrect={selectedOption !== initialValues?.correctOption}
    >
      {/* <pre>{JSON.stringify(initialValues, null, 3)}</pre> */}
      <p className="text-center text-xl">{initialValues?.question}</p>

      <div className="my-4 space-y-3 md:my-2 md:mt-8 md:space-y-3 flex flex-col items-center">
        <div className="flex gap-2 p-2 px-4 border rounded md:w-[70%] items-center">
          <input
            type={'radio'}
            role={'radio'}
            id={'optionOne'}
            disabled={submitted}
            checked={selectedOption === 'OptionOne'}
            className="h-4 w-4 rounded-full border border-app-gray-400"
            name={initialValues?.question}
            value={'OptionOne'}
            onChange={() => setSelectedOption('OptionOne')}
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
            checked={selectedOption === 'OptionTwo'}
            id={'optionTwo'}
            className="h-4 w-4 rounded-full border border-app-gray-400"
            name={initialValues?.question}
            value={'OptionTwo'}
            onChange={() => setSelectedOption('OptionTwo')}
          />
          <label
            htmlFor={'optionTwo'}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {initialValues?.optionTwo}
          </label>
        </div>
        <div className="flex gap-2 p-2 px-4 border rounded md:w-[70%] items-center">
          <input
            type={'radio'}
            role={'radio'}
            disabled={submitted}
            checked={selectedOption === 'OptionThree'}
            id={'optionThree'}
            className="h-4 w-4 rounded-full border border-app-gray-400"
            name={initialValues?.question}
            value={'OptionThree'}
            onChange={() => setSelectedOption('OptionThree')}
          />
          <label
            htmlFor={'optionThree'}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {initialValues?.optionThree}
          </label>
        </div>
        <div className="flex gap-2 p-2 px-4 border rounded md:w-[70%] items-center">
          <input
            type={'radio'}
            role={'radio'}
            disabled={submitted}
            checked={selectedOption === 'OptionFour'}
            id={'optionFour'}
            className="h-4 w-4 rounded-full border border-app-gray-400"
            name={initialValues?.question}
            value={'OptionFour'}
            onChange={() => setSelectedOption('OptionFour')}
          />
          <label
            htmlFor={'optionFour'}
            className="md:text-base md:ml-4 ml-1 text-muted w-full"
          >
            {initialValues?.optionFour}
          </label>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          disabled={
            submitted && selectedOption === initialValues?.correctOption
          }
          className="text-white bg-app-pink p-4 items-center flex px-10 rounded my-8 disabled:bg-green-600"
          onClick={handleSubmit}
        >
          {!submitted
            ? 'Submit'
            : selectedOption === initialValues?.correctOption
            ? 'Correct'
            : 'Incorrect, Click to Retry'}
        </Button>
        {submitted && selectedOption === initialValues?.correctOption && (
          <Button
            className="text-app-pink text-sm"
            onClick={() =>
              onClose(selectedOption === initialValues?.correctOption)
            }
          >
            Close Modal
          </Button>
        )}
      </div>
    </InteractivePreviewContainer>
  )
}

export default SelectAnAnswerPreview
