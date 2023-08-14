import * as React from 'react'
import { useForm } from 'react-hook-form'
import {
  BoxWithAppropriateOptionFormvalues,
  QuestionOptionType,
} from 'app/types'
import { Button, MultiFunctionEditor } from 'app/components'
import { useNotify } from 'app/hooks'
import Select from 'react-select'
import { BoxWithAppropriateOptionPreview } from 'app/components'

const numberToQuestionTypeMap: Record<number, QuestionOptionType> = {
  0: 'OptionOne',
  1: 'OptionTwo',
  2: 'OptionThree',
  3: 'OptionFour',
}

const BoxWithAppropriateOption: React.ForwardRefRenderFunction<
  {
    editBoxWithAppropriateOptionInteractiveType: () => void
    submitBoxwithAppropriateOptionInteractiveType: () => void
  },
  {
    onSubmitCallback: (data: BoxWithAppropriateOptionFormvalues) => void
    onEditCallback: (data: BoxWithAppropriateOptionFormvalues) => void
    shouldPreview: boolean
    stopPreview: () => void
    initialValues?: BoxWithAppropriateOptionFormvalues
  }
> = (props, ref) => {
  console.log(props.initialValues)
  const notify = useNotify()
  const { register, handleSubmit, watch, setValue, getValues } = useForm<
    BoxWithAppropriateOptionFormvalues
  >({
    defaultValues: props.initialValues
      ? props.initialValues
      : {
          title: '',
          question: '',
          image: (null as unknown) as FileList,
          boxes: [{ value: '', isCorrect: false }],
        },
  })

  React.useImperativeHandle(ref, () => ({
    editBoxWithAppropriateOptionInteractiveType: handleSubmit(
      props.onEditCallback,
    ),
    submitBoxwithAppropriateOptionInteractiveType: handleSubmit(
      props.onSubmitCallback,
    ),
  }))

  const addBox = React.useCallback(() => {
    const boxes = getValues('boxes')

    if (boxes.length < 4)
      setValue('boxes', [...boxes, { value: '', isCorrect: false }])
    else
      notify({
        type: 'error',
        title: 'Not Allowed',
        description: 'You cannot have more than four boxes',
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const boxes = watch('boxes')
  const correctBoxIndex = boxes.findIndex((box) => box.isCorrect)

  return (
    <div>
      {props.shouldPreview ? (
        <BoxWithAppropriateOptionPreview
          shouldShow={props.shouldPreview}
          onClose={props.stopPreview}
          initialValues={getValues()}
        />
      ) : null}
      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          {...register('title', { required: true })}
          id="title"
          placeholder="Add a title to this interactive type... eg, Click each button to get more information"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />
      </div>

      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
        <label htmlFor="question">Question</label>
        <input
          type="text"
          {...register('question', { required: true })}
          id="question"
          placeholder="Type Question"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />
      </div>

      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
        <label htmlFor="image">Add Image</label>
        <input
          type="file"
          {...register('image', { required: true })}
          id="title"
          accept="image/*"
          placeholder="Upload image"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />
      </div>

      {boxes.map((_, index) => (
        <div
          className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4"
          key={index}
        >
          <label htmlFor="image">Box {index + 1}</label>
          <MultiFunctionEditor
            initValue={boxes[index].value || ''}
            onChange={(text) => setValue(`boxes.${index}.value`, text)}
          />
        </div>
      ))}

      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
        <label htmlFor="correctOption">Correct Option</label>
        <Select
        id = {'correctOption'}
          options={boxes.map((_, index) => ({
            label: numberToQuestionTypeMap[index].replace('Option', 'Option '),
            value: numberToQuestionTypeMap[index],
          }))}
          noOptionsMessage={() => 'Fill in the values'}
          onChange={(val) => {
            if (val) {
              const selectedBoxIndex = Object.values(
                numberToQuestionTypeMap,
                // @ts-ignore
              ).indexOf(val?.value)

              boxes.forEach((_, index) =>
                setValue(
                  `boxes.${index}.isCorrect`,
                  index === selectedBoxIndex ? true : false,
                ),
              )
            }
          }}
          defaultValue={
            correctBoxIndex >= 0 && {
              label: numberToQuestionTypeMap[correctBoxIndex].replace(
                'Option',
                'Option ',
              ),
              value: boxes[correctBoxIndex].value,
            }
          }
        />
      </div>

      <Button onClick={addBox} className="text-app-pink" type="button">
        Add Box
      </Button>
    </div>
  )
}

const BoxWithAppropriateOptionWithRef = React.forwardRef(
  BoxWithAppropriateOption,
)

export default BoxWithAppropriateOptionWithRef
