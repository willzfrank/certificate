import * as React from 'react'
import { ClickForMoreExplanationFormValues } from 'app/types'
import { useForm } from 'react-hook-form'
import { Button } from 'app/components/elements'
import { useNotify } from 'app/hooks'
import { ClickForMoreExplanationPreview } from 'app/components/InteractiveResourcePreview'

const ClickForMoreExplanation: React.ForwardRefRenderFunction<
  {
    submitClickForMoreExplanationInteractive: () => void
    editClickForMoreExplanationInteractive: () => void
  },
  {
    onSubmitCallback: (data: ClickForMoreExplanationFormValues) => void
    onEditCallback: (data: ClickForMoreExplanationFormValues) => void
    shouldPreview: boolean
    stopPreview: () => void
    initialValues?: ClickForMoreExplanationFormValues
  }
> = (props, ref) => {
  const notify = useNotify()

  const { register, watch, handleSubmit, setValue, getValues } = useForm<
    ClickForMoreExplanationFormValues
  >({
    defaultValues: props.initialValues
      ? props.initialValues
      : {
          title: '',
          content: '',
          image: (null as unknown) as FileList,
          buttons: [
            {
              label: '',
              content: '',
            },
            {
              label: '',
              content: '',
            },
          ],
        },
  })

  React.useImperativeHandle(ref, () => ({
    submitClickForMoreExplanationInteractive: handleSubmit(
      props.onSubmitCallback,
      (error) => console.log(error),
    ),
    editClickForMoreExplanationInteractive: handleSubmit(props.onEditCallback),
  }))

  const clickForMoreExplanationButtons = watch('buttons')

  const addNewButton = React.useCallback(() => {
    handleSubmit(
      (currValues) => {
        console.log('valid', currValues)
        setValue('buttons', [
          ...currValues.buttons,
          {
            label: '',
            content: '',
          },
        ])
      },
      (errors) => {
        console.log('invalid', errors)
      },
    )()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteButton = React.useCallback(
    (indexToDelete: number) => {
      const newButtons: typeof clickForMoreExplanationButtons = []

      if (clickForMoreExplanationButtons.length <= 2) {
        notify({
          type: 'warning',
          title: 'Warning',
          description: 'You cannot have less than two buttons',
        })

        return
      }

      clickForMoreExplanationButtons.forEach((button, buttonIndex) => {
        if (buttonIndex !== indexToDelete) {
          newButtons.push(button)
        }
      })

      setValue('buttons', newButtons)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [clickForMoreExplanationButtons],
  )

  return (
    <div>
      {props.shouldPreview ? (
        <ClickForMoreExplanationPreview
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
        <label htmlFor="content">Content</label>
        <input
          type="text"
          {...register('content', { required: true })}
          id="content"
          placeholder="Type statement"
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

      {clickForMoreExplanationButtons.map((button, index) => (
        <div key={index} className="my-4">
          <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
            <label htmlFor={`buttons.${index}.label`}>Button Label</label>
            <input
              type="text"
              {...register(`buttons.${index}.label`, { required: true })}
              id={`buttons.${index}.label`}
              placeholder="Type button label"
              className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
            />
          </div>

          <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-start mb-4">
            <label htmlFor={`buttons.${index}.content`}>Button Content</label>
            <textarea
              rows={3}
              {...register(`buttons.${index}.content`, { required: true })}
              id={`buttons.${index}.content`}
              placeholder="Type button content"
              className="w-full p-4 border border-app-gray-100 rounded outline-none resize-none"
            />
          </div>

          <div className="-mt-6 flex items-center justify-end">
            <Button
              className="text-app-pink"
              onClick={() => deleteButton(index)}
            >
              Delete Button
            </Button>
          </div>
        </div>
      ))}

      <Button
        onClick={addNewButton}
        className="text-app-pink text-sm font-medium flex gap-2 items-center"
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
        Add New Button
      </Button>
    </div>
  )
}

const ClickForMoreExplanationWithRef = React.forwardRef(ClickForMoreExplanation)

export default ClickForMoreExplanationWithRef
