import * as React from 'react'
import {
  useForm,
  // SubmitHandler,
  useFieldArray,
  // Controller,
} from 'react-hook-form'
import { QuestionOptionType, SelectAllThatApplyFormValues } from 'app/types'
// import Select from 'react-select'
import { SelectAllThatApplyPreview as SelectAllThatApplyInteractivePreview } from 'app/components'
import { useRerender } from 'app/hooks'

const SelectAllThatApplyWithRef: React.ForwardRefRenderFunction<
  {
    submitSelectAllThatApplyInteractive: () => void
    editSelectAllThatApplyInteractive: () => void
  },
  {
    initialValues?: SelectAllThatApplyFormValues
    onSubmitCallback: (values: SelectAllThatApplyFormValues) => void
    onEditCallback: (values: SelectAllThatApplyFormValues) => void
    shouldPreview: boolean
    stopPreview: () => void
  }
> = (props, ref) => {
  const { register, getValues, setValue, handleSubmit } = useForm<
    SelectAllThatApplyFormValues
  >({
    defaultValues: props.initialValues
      ? props.initialValues
      : {
          title: '',
          question: '',
          optionOne: '',
          optionTwo: '',
          optionThree: '',
          optionFour: '',
          answers: [],
        },
  })

  const [_, rerender] = useRerender()

  React.useImperativeHandle(ref, () => ({
    submitSelectAllThatApplyInteractive: handleSubmit(props.onSubmitCallback),
    editSelectAllThatApplyInteractive: handleSubmit(props.onEditCallback),
  }))

  // const numOfCorrect = watch("numOfCorrect");

  // console.log(numOfCorrect);

  // const { fields } = useFieldArray({
  //   control,
  //   name: 'answers' as never,
  // })

  // React.useEffect(() => {
  //   const values = getValues();

  //   reset({
  //     ...values,
  //     answers: Array.from({ length: +numOfCorrect || 1 }, (v, i) => ""),
  //   });
  // }, [numOfCorrect, reset, getValues]);

  const handleCheckboxChange = React.useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      optionValue: QuestionOptionType,
    ) => {
      const currentAnswers = getValues().answers

      if (!currentAnswers.includes(optionValue)) {
        setValue('answers', [...currentAnswers, optionValue])
      } else {
        setValue(
          'answers',
          currentAnswers.filter((answer) => answer !== optionValue),
        )
      }

      rerender()
    },

    [getValues, setValue, rerender],
  )

  return (
    <div>
      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          {...register('title', { required: true })}
          id="title"
          placeholder="Select all answers ----"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />
      </div>

      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
        <label htmlFor="question">Question</label>
        <input
          {...register('question', { required: true })}
          type="text"
          id="question"
          placeholder="Type a question"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />
      </div>
      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center gap-y-4">
        {/* <label htmlFor="numOfCorrect">Number of answers</label>

        <Controller
          name={`numOfCorrect`}
          control={control}
          render={({ field: { value, ref } }) => (
            <Select<{ label: string; value: "1" | "2" | "3" | "4" }>
              options={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
              ]}
              ref={ref}
              onChange={(val) => {
                if (val?.value) {
                  setValue("numOfCorrect", val?.value);
                  return;
                }
                setValue("numOfCorrect", "1");
              }}
            />
          )}
        /> */}

        {/* {fields.map((item, index) => (
          <React.Fragment key={index}>
            <label htmlFor={`answers.${index}`}>Correct option</label>
            <input
              type="text"
              {...register(`answers.${index}`)}
              id={`answers.${index}`}
              placeholder="Type answer"
              className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
            />
          </React.Fragment>
        ))} */}

        <label htmlFor="optionOne">Option 1</label>

        <div className="flex gap-4">
          <input
            type="checkbox"
            onChange={(e) => handleCheckboxChange(e, 'OptionOne')}
            checked={getValues().answers.includes('OptionOne')}
          />
          {console.log(getValues().answers) as React.ReactNode}
          <input
            type="text"
            {...register(`optionOne`, { required: true })}
            id="optionOne"
            placeholder="Option 1"
            className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
          />
        </div>

        <label htmlFor="optionTwo">Option 2</label>
        <div className="flex gap-4">
          <input
            type="checkbox"
            onChange={(e) => handleCheckboxChange(e, 'OptionTwo')}
            checked={getValues().answers.includes('OptionTwo')}
          />
          <input
            type="text"
            {...register(`optionTwo`, { required: true })}
            id="optionTwo"
            placeholder="Option 2"
            className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
          />
        </div>

        <label htmlFor="optionThree">Option 3</label>
        <div className="flex gap-4">
          <input
            type="checkbox"
            onChange={(e) => handleCheckboxChange(e, 'OptionThree')}
            checked={getValues().answers.includes('OptionThree')}
          />
          <input
            type="text"
            {...register(`optionThree`, { required: true })}
            id="optionThree"
            placeholder="Option 3"
            className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
          />
        </div>

        <label htmlFor="optionFour">Option 4</label>
        <div className="flex gap-4">
          <input
            type="checkbox"
            onChange={(e) => handleCheckboxChange(e, 'OptionFour')}
            checked={getValues().answers.includes('OptionFour')}
          />
          <input
            type="text"
            {...register(`optionFour`, { required: true })}
            id="optionFour"
            placeholder="Option 4"
            className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
          />
        </div>
      </div>

      {props.shouldPreview ? (
        <SelectAllThatApplyInteractivePreview
          shouldShow={props.shouldPreview}
          onClose={props.stopPreview}
          initialValues={getValues()}
        />
      ) : null}
    </div>
  )
}

const SelectAllThatApply = React.forwardRef(SelectAllThatApplyWithRef)

export default SelectAllThatApply
