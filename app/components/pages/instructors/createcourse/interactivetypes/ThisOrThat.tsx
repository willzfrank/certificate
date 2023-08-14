import * as React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRerender } from 'app/hooks'
import Select from 'react-select'
import { ThisOrThatFormValues } from 'app/types'
import { ThisOrThatPreview } from 'app/components'
import { camelCase } from 'app/utils'
import Image from 'next/image'

const ThisOrThatInteractiveWithRef: React.ForwardRefRenderFunction<
  {
    submitThisOrThatInteractive: () => void
    editThisOrThatInteractive: () => void
  },
  {
    onSubmitCallback: (values: ThisOrThatFormValues) => void
    onEditCallback: (values: ThisOrThatFormValues) => void
    initialValues?: ThisOrThatFormValues
    shouldPreview: boolean
    stopPreview: () => void
  }
> = (props, ref) => {
  const [_, rerender] = useRerender()
  const { register, setValue, getValues, watch, handleSubmit } = useForm<
    ThisOrThatFormValues
  >({
    defaultValues: props.initialValues
      ? props.initialValues
      : {
          questions: [
            {
              title: '',
              optionOne: '',
              optionTwo: '',
              answer: 'None',
              cardType: 'none',
              cardContent: '',
            },
          ],
        },
  })

  React.useImperativeHandle(ref, () => ({
    submitThisOrThatInteractive: handleSubmit(props.onSubmitCallback),
    editThisOrThatInteractive: handleSubmit(props.onEditCallback),
  }))

  const addNewQuestion: SubmitHandler<ThisOrThatFormValues> = (data) => {
    setValue('questions', [
      ...data.questions,
      {
        title: '',
        optionOne: '',
        optionTwo: '',
        answer: 'None',
        cardType: 'none',
        cardContent: '',
      },
    ])

    rerender()
  }

  const deleteQuestion: (index: number) => void = (index) => {
    let questions = getValues().questions
    setValue(
      'questions',
      questions.filter((_, i) => i !== index),
    )

    rerender()
  }

  const defaultValues =
    props.initialValues?.questions.map(
      (q) =>
        camelCase(
          q?.answer,
        ) as keyof typeof props.initialValues.questions[number],
    ) || []
  const defaultLabels = defaultValues.map(
    (v, i) => props.initialValues?.questions[i][v],
  )

  return (
    <>
      {getValues('questions').map((question, index) => {
        const card = watch(`questions.${index}`)
        const isImage =
          card.cardContent instanceof FileList ||
          card.cardContent?.startsWith('http')

        return (
          <div key={index} className="my-4">
            <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                {...register(`questions.${index}.title`, { required: true })}
                id="title"
                placeholder="Title"
                className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
              />
            </div>

            <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center gap-y-4">
              <label htmlFor={'optionOne' + index}>Option 1</label>
              <input
                type="text"
                {...register(`questions.${index}.optionOne`, {
                  required: true,
                })}
                onBlur={rerender}
                id={'optionOne' + index}
                placeholder="Option 1"
                className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
              />

              <label htmlFor={'optionTwo' + index}>Option 2</label>
              <input
                type="text"
                {...register(`questions.${index}.optionTwo`, {
                  required: true,
                })}
                onBlur={rerender}
                id={'optionTwo' + index}
                placeholder="Option 2"
                className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
              />

              <label htmlFor="cardType">Card type</label>

              <Select<{ label: string; value: 'text' | 'image' }>
                onChange={(val) => {
                  if (val) {
                    setValue(`questions.${index}.cardType`, val?.value)

                    if (val.value === 'image')
                      setValue(`questions.${index}.cardContent`, '')
                  }
                  rerender()
                }}
                isDisabled={Boolean(props.initialValues)}
                options={[
                  { label: 'Text', value: 'text' },
                  { label: 'Image', value: 'image' },
                ]}
                defaultValue={{
                  label: camelCase(card.cardType),
                  value: card.cardType as 'image' | 'text',
                }}
              />

              <div />
              {question.cardType === 'image' ? (
                <div className="flex gap-4 items-center">
                  <p>Content</p>
                  <div className="w-full flex gap-4">
                    <input
                      type="file"
                      accept="image/*"
                      className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
                      {...register(`questions.${index}.cardContent`, {
                        required: true,
                      })}
                    />
                    {isImage ? (
                      <figure className="w-40 h-40 relative border border-app-gray">
                        <Image
                          src={
                            typeof card.cardContent === 'string'
                              ? card.cardContent
                              : URL.createObjectURL(card.cardContent[0])
                          }
                          objectFit="contain"
                          layout="fill"
                          alt={`image for ${card.title}`}
                        />
                      </figure>
                    ) : null}
                  </div>
                </div>
              ) : question.cardType === 'text' ? (
                <div className="w-full flex gap-4">
                  <p>Content</p>
                  <textarea
                    rows={4}
                    {...register(`questions.${index}.cardContent`, {
                      required: true,
                    })}
                    className="w-full p-4 border border-app-gray-100 rounded outline-none resize-none"
                    placeholder="Type  a statement e.g “A football match is played in a pitch”, “Preposition is a form of”"
                  />
                </div>
              ) : (
                <div />
              )}

              <label htmlFor="answer">Answer</label>
              <Select<{ label: string; value: 'optionOne' | 'optionTwo' }>
                // @ts-ignore
                options={(['optionOne', 'optionTwo'] as Array<
                  keyof ThisOrThatFormValues['questions'][number]
                >)
                  .filter((option) => question[option] !== '')
                  .map((option) => ({
                    // formating the label to have the Option and the vale capitalized
                    label:
                      'Option ' +
                      option.split('option')[1] +
                      ' - ' +
                      question[option],
                    value: option.charAt(0).toUpperCase() + option.slice(1),
                  }))}
                noOptionsMessage={() =>
                  'Fill in values for Option 1 and Option 2'
                }
                onChange={(val) =>
                  setValue(`questions.${index}.answer`, val?.value as any)
                }
                // @ts-ignore
                defaultValue={{
                  label: defaultLabels[index],
                  value: defaultValues[index],
                }}
              />
            </div>

            {!props.initialValues ? (
              <div className="flex items-center justify-end">
                <button
                  className="flex py-4 text-app-pink items-center gap-1"
                  onClick={() => deleteQuestion(index)}
                  role="button"
                >
                  <svg
                    className="scale-75"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 5V19"
                      stroke="#B61046"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 12H19"
                      stroke="#B61046"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p>Delete Card</p>
                </button>
              </div>
            ) : null}
          </div>
        )
      })}

      {!props.initialValues ? (
        <button
          onClick={handleSubmit(addNewQuestion)}
          className="text-app-pink text-base flex gap-2 items-center"
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
              stroke="#B61046"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 12H19"
              stroke="#B61046"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Add New Card
        </button>
      ) : null}

      {props.shouldPreview ? (
        <ThisOrThatPreview
          shouldShow={props.shouldPreview}
          onClose={props.stopPreview}
          initialValues={getValues()}
        />
      ) : null}
    </>
  )
}

const ThisOrThatInteractive = React.forwardRef(ThisOrThatInteractiveWithRef)

export default ThisOrThatInteractive
