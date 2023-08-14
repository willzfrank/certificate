import * as React from 'react'
import { QuestionOptionType, SelectAllThatApplyFormValues, USERTYPES, InteractiveTypes } from 'app/types'
import { useAppSelector, useNotify, useRerender } from 'app/hooks'
import { Button } from '../elements'
import classNames from 'classnames'
import InteractivePreviewContainer from './InteractivePreviewContainer'
import { useSetInteractiveTypeAsTakenMutation } from 'app/api/subscriptionApi'

interface SelectAllThatApplyInteractivePreviewProps {
  shouldShow: boolean
  onClose: (isCorrect?: boolean) => void
  initialValues: SelectAllThatApplyFormValues
}

type Selected = Record<QuestionOptionType, boolean>

const SelectAllThatApplyInteractivePreview = ({
  onClose,
  shouldShow,
  initialValues,
}: SelectAllThatApplyInteractivePreviewProps) => {
  const [submitted, setSubmitted] = React.useState<boolean>(false)
  const [incorrect, setIncorrect] = React.useState<boolean>(false)
  const [_, rerender] = useRerender()

  const [selectedOption, setSelectedOption] = React.useState<Selected>({
    OptionFour: false,
    OptionOne: false,
    OptionThree: false,
    OptionTwo: false,
  })

  const notify = useNotify()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption((sel) => ({
      ...sel,
      [e.target.value]: e.target.checked,
    }))
  }

  const handleSubmit = () => {
    if (submitted) {
      setSelectedOption({
        OptionFour: false,
        OptionOne: false,
        OptionThree: false,
        OptionTwo: false,
      })

      setSubmitted(false)

      return
    }

    const selAns = []

    for (const key of Object.keys(selectedOption) as (keyof Selected)[]) {
      if (selectedOption[key]) {
        selAns.push(key)
      }
    }

    const sortedAns = [...initialValues?.answers]?.sort().join('') ?? ''
    const sortedSel = [...selAns]?.sort().join('') ?? ''

    setSubmitted(true)

    if (sortedAns === sortedSel) {
      // notify({
      //   title: "Success",
      //   description: `correct answer: ${initialValues?.answers},
      //    selected answer: ${selAns}`,
      //   type: "info",
      // });
      setIncorrect(false)
    } else {
      notify({
        title: 'Error 🚫',
        description: 'Please select the correct options only',
        type: 'error',
      })
      setIncorrect(true)
    }

    rerender()
  }

  const [setAsTaken] = useSetInteractiveTypeAsTakenMutation()
  const { roleName, id: studentId } = useAppSelector((store) => store.user)

  React.useEffect(() => {
    if (
      !incorrect &&
      roleName?.toLowerCase() === USERTYPES.STUDENT &&
      submitted
    ) {
      setAsTaken({
        values: [
          {
            interactiveTypeId: initialValues?.id as string,
            studentId: studentId as string,
            interactiveType: InteractiveTypes.selectAllThatApply,
          },
        ],
        moduleId: initialValues.moduleId as string,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleName, studentId, submitted, incorrect])

  return (
    <InteractivePreviewContainer
      isOpen={shouldShow}
      closeModal={() => onClose(!incorrect)}
      isCompleted={submitted}
      isIncorrect={incorrect}
    >
      {initialValues ? (
        <>
          <p className="text-center text-xl flex justify-center space-x-2">
            {initialValues?.question}
          </p>

          <div className="my-4 space-y-3 md:my-2 md:mt-8 md:space-y-3 flex flex-col items-center">
            <div
              className={classNames(
                'flex gap-2 p-2 px-4 border rounded md:w-[70%] items-center',
                {
                  'bg-red-400':
                    submitted && incorrect && selectedOption.OptionOne,
                  'bg-green-400':
                    submitted && !incorrect && selectedOption.OptionOne,
                  'bg-transparent': !selectedOption.OptionOne,
                },
              )}
            >
              <input
                type="checkbox"
                id={'optionOne'}
                disabled={submitted}
                className={classNames(
                  `h-4 w-4 rounded-full border border-app-gray-400 `,
                )}
                name={'OptionOne'}
                value={'OptionOne'}
                checked={selectedOption.OptionOne}
                onChange={handleChange}
              />
              <label
                htmlFor={'optionOne'}
                className={classNames(
                  'md:text-base md:ml-4 ml-1 text-black w-full',
                  {
                    'text-black':
                      submitted && !incorrect && selectedOption.OptionOne,
                  },
                )}
              >
                {initialValues.optionOne}
              </label>
            </div>
            <div
              className={classNames(
                'flex gap-2 p-2 px-4 border rounded md:w-[70%] items-center',
                {
                  'bg-red-400':
                    submitted && incorrect && selectedOption.OptionTwo,
                  'bg-green-400':
                    submitted && !incorrect && selectedOption.OptionTwo,
                  'bg-transparent': !selectedOption.OptionTwo,
                },
              )}
            >
              <input
                type="checkbox"
                disabled={submitted}
                id={'optionTwo'}
                checked={selectedOption.OptionTwo}
                className={classNames(
                  `h-4 w-4 rounded-full border border-app-gray-400 `,
                )}
                name={'OptionTwo'}
                value={'OptionTwo'}
                onChange={handleChange}
              />
              <label
                htmlFor={'optionTwo'}
                className={classNames(
                  'md:text-base md:ml-4 ml-1 text-black w-full',
                  {
                    'text-black':
                      submitted && !incorrect && selectedOption.OptionTwo,
                  },
                )}
              >
                {initialValues.optionTwo}
              </label>
            </div>
            <div
              className={classNames(
                'flex gap-2 p-2 px-4 border rounded md:w-[70%] items-center',
                {
                  'bg-red-400':
                    submitted && incorrect && selectedOption.OptionThree,
                  'bg-green-400':
                    submitted && !incorrect && selectedOption.OptionThree,
                  'bg-transparent': !selectedOption.OptionThree,
                },
              )}
            >
              <input
                type="checkbox"
                checked={selectedOption.OptionThree}
                disabled={submitted}
                id={'optionThree'}
                className={classNames(
                  `h-4 w-4 rounded-full border border-app-gray-400 `,
                )}
                name={'OptionThree'}
                value={'OptionThree'}
                onChange={handleChange}
              />
              <label
                htmlFor={'optionThree'}
                className={classNames(
                  'md:text-base md:ml-4 ml-1 text-black w-full',
                  {
                    'text-black':
                      submitted && !incorrect && selectedOption.OptionThree,
                  },
                )}
              >
                {initialValues.optionThree}
              </label>
            </div>
            <div
              className={classNames(
                'flex gap-2 p-2 px-4 border rounded md:w-[70%] items-center',
                {
                  'bg-red-400':
                    submitted && incorrect && selectedOption.OptionFour,
                  'bg-green-400':
                    submitted && !incorrect && selectedOption.OptionFour,
                  'bg-transparent': !selectedOption.OptionFour,
                },
              )}
            >
              <input
                type="checkbox"
                checked={selectedOption.OptionFour}
                disabled={submitted}
                id={'optionFour'}
                className={classNames(
                  `h-4 w-4 rounded-full border border-app-gray-400 `,
                )}
                name={'OptionFour'}
                value={'OptionFour'}
                onChange={handleChange}
              />
              <label
                htmlFor={'optionFour'}
                className={classNames(
                  'md:text-base md:ml-4 ml-1 text-black w-full',
                  {
                    'text-black':
                      submitted && !incorrect && selectedOption.OptionFour,
                  },
                )}
              >
                {initialValues.optionFour}
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              disabled={submitted && !incorrect}
              className="text-white bg-app-pink p-4 items-center flex px-10 rounded my-8 disabled:bg-green-600"
              onClick={handleSubmit}
            >
              {!submitted
                ? 'Submit'
                : !incorrect
                ? 'Correct'
                : 'Incorrect, Click to Retry'}
            </Button>
            {submitted && !incorrect && (
              <Button
                className="text-app-pink text-sm"
                onClick={() => onClose(!incorrect)}
              >
                Close Modal
              </Button>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </InteractivePreviewContainer>
  )
}

export default SelectAllThatApplyInteractivePreview
