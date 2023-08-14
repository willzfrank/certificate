import { SelectAnAnswerPreview } from 'app/components'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { SelectAnAnswerFormValues } from 'app/types'

const SelectAnAnswerInteractiveWithRef: React.ForwardRefRenderFunction<
  {
    submitSelectAnAnswerIterative: () => void
    editSelectAnAnserInteractive: () => void
  },
  {
    onSubmitCallback: (data: SelectAnAnswerFormValues) => void
    onEditCallback: (data: SelectAnAnswerFormValues) => void
    shouldPreview: boolean
    stopPreview: () => void
    initialValues?: SelectAnAnswerFormValues
  }
> = (props, ref) => {
  const { register, getValues, handleSubmit } = useForm<
    SelectAnAnswerFormValues
  >({
    defaultValues: props.initialValues,
  })

  React.useImperativeHandle(ref, () => ({
    submitSelectAnAnswerIterative: handleSubmit(props.onSubmitCallback),
    editSelectAnAnserInteractive: handleSubmit(props.onEditCallback),
  }))

  return (
    <div>
      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center">
        <label htmlFor="question">Question</label>
        <input
          {...register('question', { required: true })}
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
            <div className="flex items-center gap-2 mr-4">
              <input
                type="radio"
                {...register('correctOption', { required: true })}
                id="OptionOneRadio"
                value="OptionOne"
              />
              <label className="leading-10" htmlFor="OptionOneRadio">
                Option 1:{' '}
              </label>
            </div>
            <input
              type="text"
              {...register('optionOne', { required: true })}
              id="OptionOneText"
              placeholder="Option One"
              className="px-4 py-2 rounded border flex-1 text-[15px] text-muted focus:border-app-dark-500"
            />
          </div>
          <div className="option flex align-center">
            <div className="flex items-center gap-2 mr-4">
              <input
                type="radio"
                {...register('correctOption', { required: true })}
                id="OptionTwoRadio"
                value="OptionTwo"
              />
              <label className="leading-10" htmlFor="OptionTwoRadio">
                Option 2:{' '}
              </label>
            </div>
            <input
              type="text"
              {...register('optionTwo', { required: true })}
              id="OptionTwoText"
              placeholder="Option Two"
              className="px-4 py-2 rounded border flex-1 text-[15px] text-muted focus:border-app-dark-500"
            />
          </div>
          <div className="option flex align-center">
            <div className="flex items-center gap-2 mr-4">
              <input
                type="radio"
                {...register('correctOption', { required: true })}
                id="OptionThreeRadio"
                value="OptionThree"
              />
              <label className="leading-10" htmlFor="OptionThreeRadio">
                Option 3:{' '}
              </label>
            </div>
            <input
              type="text"
              {...register('optionThree', { required: true })}
              id="OptionThreeText"
              placeholder="Option Three"
              className="px-4 py-2 rounded border flex-1 text-[15px] text-muted focus:border-app-dark-500"
            />
          </div>
          <div className="option flex align-center">
            <div className="flex items-center gap-2 mr-4">
              <input
                type="radio"
                {...register('correctOption', { required: true })}
                id="OptionFourRadio"
                value={'OptionFour'}
              />
              <label className="leading-10" htmlFor="OptionFourRadio">
                Option 4:{' '}
              </label>
            </div>
            <input
              type="text"
              {...register('optionFour', { required: true })}
              id="OptionFourText"
              placeholder="Option Four"
              className="px-4 py-2 rounded border flex-1 text-[15px] text-muted focus:border-app-dark-500"
            />
          </div>
        </div>
      </div>

      {props.shouldPreview ? (
        <SelectAnAnswerPreview
          shouldShow={props.shouldPreview}
          onClose={props.stopPreview}
          initialValues={getValues()}
        />
      ) : null}
    </div>
  )
}

const SelectAnAnswerInteractive = React.forwardRef(
  SelectAnAnswerInteractiveWithRef,
)

export default SelectAnAnswerInteractive
