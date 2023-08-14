import * as React from 'react'
import { useRerender } from 'app/hooks'
import { Button, ClickAndMatchPreview } from 'app/components'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ClickAndMatchFormValues } from 'app/types'

const ClickAndMatchInteractiveWithRef: React.ForwardRefRenderFunction<
  {
    submitClickAndMatchInteractive: () => void
    editClickAndMatchInteractive: () => void
  },
  {
    onSubmitCallback: (data: ClickAndMatchFormValues) => void
    onEditCallback: (data: ClickAndMatchFormValues) => void
    shouldPreview: boolean
    stopPreview: () => void
    initialValues?: ClickAndMatchFormValues
  }
> = (props, ref) => {
  const { register, getValues, handleSubmit, setValue } = useForm<
    ClickAndMatchFormValues
  >({
    defaultValues: props.initialValues
      ? props.initialValues
      : {
          statements: [
            {
              statement: 'An Apple',
              statementMatch: '🍏',
            },
            {
              statement: 'A Banana',
              statementMatch: '🍌',
            },
          ],
          title:
            'Click and match each statement to its most appropriate match/descriptor',
        },
  })

  React.useImperativeHandle(ref, () => ({
    submitClickAndMatchInteractive: handleSubmit(props.onSubmitCallback),
    editClickAndMatchInteractive: handleSubmit(props.onEditCallback),
  }))

  const [rerenderProxy, rerender] = useRerender()

  const getCurrentFormValues = React.useCallback(() => {
    return getValues()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rerenderProxy])

  const addStatement: SubmitHandler<ClickAndMatchFormValues> = (data) => {
    let newStatementIndex = data.statements.length
    setValue(`statements.${newStatementIndex}.statement`, '')
    setValue(`statements.${newStatementIndex}.statementMatch`, '')

    // force a rerender
    rerender()
  }

  const deleteStatement: (index: number) => void = (index) => {
    let matches = getValues().statements
    setValue(
      'statements',
      matches.filter((_, i) => i !== index),
    )

    rerender()
  }

  return (
    <div>
      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          {...register('title', { required: true })}
          id="question"
          placeholder="Question Text"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />
      </div>

      <div>
        {getCurrentFormValues().statements.map((statement, index) => (
          <div key={'Statement' + (index + 1)} className="my-6">
            <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center gap-y-2">
              <label htmlFor={`StatementText${index}`}>
                Statement {index + 1}:
              </label>
              <input
                type="text"
                {...register(`statements.${index}.statement`, {
                  required: true,
                })}
                id={'StatementText' + index}
                placeholder="Statement Text"
                className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
              />
              <label htmlFor={`StatementMatch${index}`}>
                Statement {index + 1} Match:
              </label>
              <div className="flex flex-col items-end">
                <input
                  type="text"
                  {...register(`statements.${index}.statementMatch`, {
                    required: true,
                  })}
                  id={'StatementMatch' + index}
                  placeholder="Statement Match"
                  className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
                />
                {!props.initialValues && (
                  <button
                    onClick={() => deleteStatement(index)}
                    type="button"
                    className="text-app-pink text-[12px] py-1"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {!props.initialValues && (
          <Button
            role="button"
            onClick={handleSubmit(addStatement)}
            className="text-app-pink flex gap-4 text-base mt-8"
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
            Add New Statement
          </Button>
        )}
      </div>

      {props.shouldPreview ? (
        <ClickAndMatchPreview
          shouldShow={props.shouldPreview}
          onClose={props.stopPreview}
          initialValues={getValues()}
        />
      ) : null}
    </div>
  )
}

const ClickAndMatchInteractive = React.forwardRef(
  ClickAndMatchInteractiveWithRef,
)

export default ClickAndMatchInteractive
