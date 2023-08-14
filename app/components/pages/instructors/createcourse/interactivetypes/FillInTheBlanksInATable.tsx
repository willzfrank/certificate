import * as React from 'react'
import { FillInTheBlanksInATablePreview } from 'app/components/InteractiveResourcePreview'
import { FillInTheBlanksInATableFormValues } from 'app/types/interactivetypes'
import {
  useForm,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { camelCase, titleCase } from 'app/utils'
import { isFillInTheBlank } from 'app/types/guards'
import { Modal } from 'app/components/elements'
import Select from 'react-select'
import { QuestionOptionType } from 'app/types'

const FillInTheBlanksInATableInteractiveWithRef: React.ForwardRefRenderFunction<
  {
    submitFillInTheBlankInteractive: () => void
    editFillInTheBlankInteractive: () => void
  },
  {
    onSubmitCallback: (data: FillInTheBlanksInATableFormValues) => void
    onEditCallback: (data: FillInTheBlanksInATableFormValues) => void
    shouldPreview: boolean
    stopPreview: () => void
    initialValues?: FillInTheBlanksInATableFormValues
  }
> = (props, ref) => {
  const { register, watch, handleSubmit, setValue, getValues } = useForm<
    FillInTheBlanksInATableFormValues
  >({
    defaultValues: props.initialValues
      ? props.initialValues
      : {
          title: 'This is the title',
          question: 'This is the question',
          rowCount: 3,
          columnCount: 3,
          columnTitles: ['Country', 'Capital', 'Official Language'],
          rows: [
            {
              columns: ['Nigeria', 'Abuja', '#'],
              blankColumnIndex: 2,
              blankColumnOptions: {
                OptionOne: '20,000,000',
                OptionTwo: '20,000,000',
                OptionThree: '20,000,000',
                OptionFour: '20,000,000',
                correctOption: 'OptionOne',
              },
            },
            {
              columns: ['France', '#', 'French'],
              blankColumnIndex: 1,
              blankColumnOptions: {
                OptionOne: 'Prague',
                OptionTwo: 'Paris',
                OptionThree: 'Rome',
                OptionFour: 'Athens',
                correctOption: 'OptionTwo',
              },
            },
          ],
        },
  })

  const [rowCount, columnCount, tableTitle, columnTitles] = watch([
    'rowCount',
    'columnCount',
    'title',
    'columnTitles',
  ])

  const [isValidTable, setIsValidTable] = React.useState<boolean>(false)

  const validateTable = React.useCallback(() => {
    setIsValidTable(
      rowCount > 0 && columnCount > 0 && rowCount <= 10 && columnCount <= 3,
    )

    // setValue(
    //   'columnTitles',
    //   Array.from({ length: columnCount }).map(
    //     (_, index) => `Column ${index + 1} title`,
    //   ),
    // )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowCount, columnCount])

  const [editRowModalDetails, setEditRowModalDetails] = React.useState<{
    isOpened: boolean
    rowIndex: number
  }>({ isOpened: false, rowIndex: -1 })

  return (
    <div>
      <FillInTheBlanksInATableModal
        rowModalDetails={editRowModalDetails}
        setRowModalDetails={setEditRowModalDetails}
        getValues={getValues}
        setValue={setValue}
        register={register}
      />
      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          {...register('title', { required: true })}
          id="title"
          placeholder="Enter Title"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />
      </div>

      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
        <label htmlFor="question">Question</label>
        <input
          type="text"
          {...register('question', { required: true })}
          id="question"
          placeholder="Enter Question"
          className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
        />
      </div>

      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-start mb-4 mt-6">
        <label htmlFor="question">Create Table</label>
        <div className="flex flex-col gap-3">
          <p>Specify the number of columns and rows in the table</p>
          <div className="flex gap-4 items-end">
            <div className="space-y-2 flex-1">
              <label className="text-muted" htmlFor="rowCount">
                Rows
              </label>
              <input
                type="number"
                {...register('rowCount', { required: true })}
                id="rowCount"
                placeholder="0"
                className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
                min={1}
                max={10}
              />
            </div>

            <div className="space-y-2 flex-1">
              <label className="text-muted" htmlFor="columnCount">
                Columns (max number of columns is 3)
              </label>
              <input
                type="number"
                {...register('columnCount', { required: true })}
                id="columnCount"
                placeholder="0"
                className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
                min={1}
                max={3}
              />
            </div>

            <div>
              <button
                onClick={validateTable}
                className="border border-app-pink rounded text-app-pink px-6 py-2"
                role="button"
              >
                Create Table
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isValidTable ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-start mb-4"
            >
              <label htmlFor="question">Table Details</label>
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: Math.min(columnCount, 10) }).map(
                  (_, indx) => (
                    <div className="space-y-2 flex-1" key={indx}>
                      <label htmlFor={`column-${indx}-title`}>
                        Column {indx + 1} Title
                      </label>
                      <input
                        type="text"
                        {...register(`columnTitles.${indx}`, {
                          required: true,
                        })}
                        id={`column-${indx + 1}-title`}
                        placeholder="Enter Question"
                        className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
                      />
                    </div>
                  ),
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-start mb-4"
            >
              <div />
              <div className="p-2 border flex-1">
                <p className="my-2">{tableTitle || 'Table Title'}</p>

                <div className="flex items-center">
                  <div
                    className={`p-4 bg-[#F9E6DA] grid grid-cols-3 gap-2 flex-1`}
                  >
                    {columnTitles.map((title, index) => (
                      <p key={`columnTitle-${index}`}>{titleCase(title)}</p>
                    ))}
                  </div>

                  <div className="ml-2 sr-only hidden">
                    <button className="border-app-pink border-2 rounded p-2 py-1 text-app-pink text-xs">
                      Add Options
                    </button>
                  </div>
                </div>

                <div className="px-4 py-2">
                  {Array.from({ length: rowCount }).map((_, rowIndex) => (
                    <FillInTheBlanksInATableRow
                      key={`row-${rowIndex}`}
                      columnCount={columnCount}
                      rowIndex={rowIndex}
                      register={register}
                      setValue={setValue}
                      watch={watch}
                      openModal={(index) =>
                        setEditRowModalDetails({
                          isOpened: true,
                          rowIndex: index,
                        })
                      }
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

const FillInTheBlanksInATableRow = ({
  columnCount,
  rowIndex,
  register,
  setValue,
  watch,
  openModal,
}: {
  columnCount: number
  rowIndex: number
  register: UseFormRegister<FillInTheBlanksInATableFormValues>
  setValue: UseFormSetValue<FillInTheBlanksInATableFormValues>
  watch: UseFormWatch<FillInTheBlanksInATableFormValues>
  openModal: (index: number) => void
}) => {
  const columnValues = watch(`rows.${rowIndex}.columns`)

  const [hasBlankField, setHasBlankField] = React.useState<boolean>(false)
  const [blankFieldIndex, setBlankFieldIndex] = React.useState<number>(-1)

  React.useEffect(() => {
    let blankValueIndex = columnValues.findIndex((val) => val === '#')

    setHasBlankField(blankValueIndex !== -1)
    setBlankFieldIndex(blankValueIndex)
  }, [columnValues])

  return (
    <div className="flex items-center">
      <div className="grid grid-cols-3 gap-4 my-3 flex-1">
        {Array.from({ length: columnCount }).map((_, colIndex) => (
          <div
            key={colIndex}
            className={`border relative rounded p-2 flex items-center gap-2 ${
              hasBlankField && blankFieldIndex === colIndex
                ? 'bg-app-stroke'
                : ''
            }`}
          >
            <input
              className="w-full text-muted bg-transparent"
              disabled={hasBlankField && blankFieldIndex === colIndex}
              placeholder={
                hasBlankField && blankFieldIndex === colIndex
                  ? 'Blank field'
                  : 'Enter text'
              }
              {...register(`rows.${rowIndex}.columns.${colIndex}`)}
            />
            <button
              className={`h-4 w-4 rounded-full transition-transform duration-300 ${
                hasBlankField && blankFieldIndex === colIndex
                  ? 'rotate-180'
                  : 'rotate-0'
              }`}
              onClick={() => {
                if (hasBlankField) {
                  if (blankFieldIndex === colIndex) {
                    setHasBlankField(false)
                    setBlankFieldIndex(-1)
                    setValue(`rows.${rowIndex}.columns.${colIndex}`, '#')
                  } else {
                    setBlankFieldIndex(colIndex)
                  }
                } else {
                  setHasBlankField(true)
                  setBlankFieldIndex(colIndex)
                }
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.6654 5.66699L7.9987 10.3337L3.33203 5.66699"
                  stroke="#898989"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="ml-2">
        <button
          className="border-app-pink border rounded p-2 py-1 text-app-pink text-xs"
          onClick={() => openModal(rowIndex)}
        >
          Add Options
        </button>
      </div>
    </div>
  )
}

const FillInTheBlanksInATableModal = ({
  rowModalDetails,
  setRowModalDetails,
  getValues,
  register,
  setValue,
}: {
  rowModalDetails: { isOpened: boolean; rowIndex: number }
  setRowModalDetails: React.Dispatch<
    React.SetStateAction<typeof rowModalDetails>
  >
  getValues: UseFormGetValues<FillInTheBlanksInATableFormValues>
  setValue: UseFormSetValue<FillInTheBlanksInATableFormValues>
  register: UseFormRegister<FillInTheBlanksInATableFormValues>
}) => {
  return (
    <Modal
      isOpen={rowModalDetails.isOpened}
      closeModal={() =>
        setRowModalDetails({ ...rowModalDetails, isOpened: false })
      }
    >
      <div className="bg-white w-[600px] min-h-[500px] rounded-lg p-10">
        <div className="header flex items-center justify-between">
          <h2 className="text-lg font-bold">
            Add options for Row {rowModalDetails.rowIndex + 1}
          </h2>
          <button
            onClick={() =>
              setRowModalDetails({
                ...rowModalDetails,
                isOpened: false,
              })
            }
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.9978 6.00586L6.00781 17.9959"
                stroke="#2F2D37"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18 18.0025L6 6"
                stroke="#2F2D37"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="content space-y-4 my-8">
          <div className="flex items-center justify-between">
            <p className="w-1/4">
              <label htmlFor="OptionOne">Option 1</label>
            </p>
            <input
              className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
              id="OptionOne"
              {...register(
                `rows.${rowModalDetails.rowIndex}.blankColumnOptions.OptionOne`,
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="w-1/4">
              <label htmlFor="OptionTwo">Option 2</label>
            </p>
            <input
              className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
              id="OptionTwo"
              {...register(
                `rows.${rowModalDetails.rowIndex}.blankColumnOptions.OptionTwo`,
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="w-1/4">
              <label htmlFor="OptionThree">Option 3</label>
            </p>
            <input
              className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
              id="OptionThree"
              {...register(
                `rows.${rowModalDetails.rowIndex}.blankColumnOptions.OptionThree`,
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="w-1/4">
              <label htmlFor="OptionFour">Option 4</label>
            </p>
            <input
              className="px-4 py-2 rounded border w-full md:flex-1 text-[15px] text-muted focus:border-app-dark-500"
              id="OptionFour"
              {...register(
                `rows.${rowModalDetails.rowIndex}.blankColumnOptions.OptionFour`,
              )}
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="w-1/4">
              <label htmlFor="correctOption">Correct Option</label>
            </p>
            <Select<{ label: string; value: QuestionOptionType }>
              id={'correctOption'}
              options={[
                {
                  label:
                    'Option One - ' +
                    getValues(
                      `rows.${rowModalDetails.rowIndex}.blankColumnOptions.OptionOne`,
                    ),
                  value: 'OptionOne',
                },
                {
                  label:
                    'Option Two - ' +
                    getValues(
                      `rows.${rowModalDetails.rowIndex}.blankColumnOptions.OptionTwo`,
                    ),
                  value: 'OptionTwo',
                },
                {
                  label:
                    'Option Three - ' +
                    getValues(
                      `rows.${rowModalDetails.rowIndex}.blankColumnOptions.OptionThree`,
                    ),
                  value: 'OptionThree',
                },
                {
                  label:
                    'Option Four - ' +
                    getValues(
                      `rows.${rowModalDetails.rowIndex}.blankColumnOptions.OptionFour`,
                    ),
                  value: 'OptionFour',
                },
              ]}
              className="flex-1"
              noOptionsMessage={() => 'Fill in the values'}
              onChange={(val) => {
                if (val) {
                  setValue(
                    `rows.${rowModalDetails.rowIndex}.blankColumnOptions.correctOption`,
                    val.value,
                  )
                }
              }}
              defaultValue={(() => {
                const stuff = getValues(
                  `rows.${rowModalDetails.rowIndex}.blankColumnOptions`,
                )
                return {
                  label:
                    'Option ' +
                    stuff.correctOption.split('Option')[1] +
                    ' - ' +
                    stuff[stuff.correctOption],
                  value: stuff.correctOption,
                }
              })()}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

const FillInTheBlanksInATable = React.forwardRef(
  FillInTheBlanksInATableInteractiveWithRef,
)

export default FillInTheBlanksInATable
