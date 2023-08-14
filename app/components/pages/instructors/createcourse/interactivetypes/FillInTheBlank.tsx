import * as React from 'react'
import { useForm } from 'react-hook-form'

import { FillInTheBlankFormValues } from 'app/types'
import FillInTheBlankInteractivePreview from 'app/components/InteractiveResourcePreview/FillInTheBlanks'

const FillInTheBlankInteractiveWithRef: React.ForwardRefRenderFunction<
  {
    submitFillInTheBlankInteractive: () => void
    editFillInTheBlankInteractive: () => void
  },
  {
    onSubmitCallback: (data: FillInTheBlankFormValues) => void
    onEditCallback: (data: FillInTheBlankFormValues) => void
    shouldPreview: boolean
    stopPreview: () => void
    initialValues?: FillInTheBlankFormValues
  }
> = (props, ref) => {
  const { register, getValues, handleSubmit } = useForm<
    FillInTheBlankFormValues
  >({
    defaultValues: props.initialValues,
  })

  React.useImperativeHandle(ref, () => ({
    submitFillInTheBlankInteractive: handleSubmit(props.onSubmitCallback),
    editFillInTheBlankInteractive: handleSubmit(props.onEditCallback),
  }))

  return (
    <div>
      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          {...register('title', { required: true })}
          id="title"
          placeholder="FIll in the blank space with the word that completes the sentence"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />
      </div>

      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
        <label htmlFor="beforeDash">Question</label>
        <div className="flex items-center space-x-1 w-full">
          <div className="flex-1">
            <input
              type="text"
              {...register('beforeDash', { required: true })}
              id="beforeDash"
              placeholder="Beginning of sentence"
              className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
            />
          </div>
          <div className="px-4 py-2 text-muted bg-[#EAEAEA] basis-[20%]">
            Blank
          </div>
          <div className="flex-1">
            <label className="sr-only" htmlFor="afterDash">
              Question
            </label>
            <input
              type="text"
              {...register('afterDash', { required: true })}
              id="afterDash"
              placeholder="End of sentence"
              className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
            />
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center gap-y-4">
        <label htmlFor="correctOption">Correct option</label>
        <input
          type="text"
          {...register(`correctOption`, { required: true })}
          id="correctOption"
          placeholder="Type answer"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />

        <label htmlFor="optionOne">Option 1</label>
        <input
          type="text"
          {...register(`optionOne`, { required: true })}
          id="optionOne"
          placeholder="Option 1"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />

        <label htmlFor="optionTwo">Option 2</label>
        <input
          type="text"
          {...register(`optionTwo`, { required: true })}
          id="optionTwo"
          placeholder="Option 2"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />
        <label htmlFor="optionThree">Option 3</label>
        <input
          type="text"
          {...register(`optionThree`, { required: true })}
          id="optionThree"
          placeholder="Option 3"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />

        <label htmlFor="optionFour">Option 4</label>
        <input
          type="text"
          {...register(`optionFour`, { required: true })}
          id="optionFour"
          placeholder="Option 4"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />
      </div>

      {props.shouldPreview ? (
        <FillInTheBlankInteractivePreview
          shouldShow={props.shouldPreview}
          onClose={props.stopPreview}
          initialValues={getValues()}
        />
      ) : null}
    </div>
  )
}

const FillInTheBlankInteractive = React.forwardRef(
  FillInTheBlankInteractiveWithRef,
)

export default FillInTheBlankInteractive
