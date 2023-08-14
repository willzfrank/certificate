import * as React from 'react'
import { Button } from 'app/components'

import {
  BoxWithAppropriateOption,
  ClickAndMatch,
  ClickForMoreExplanation,
  FillInTheBlank,
  FillInTheBlanksInATable,
  SelectAllThatApply,
  SelectAnAnswer,
  ThisOrThat,
} from './interactivetypes'

import {
  useAddInteractiveType__BoxWithAppropriateOptionsMutation,
  useAddInteractiveType__ClickAndMatchMutation,
  useAddInteractiveType__ClickForMoreExplanationMutation,
  useAddInteractiveType__FillInTheBlanksMutation,
  useAddInteractiveType__SelectAllThatApplyMutation,
  useAddInteractiveType__SelectAnAnswerMutation,
  useAddInteractiveType__ThisOrThatMutation,
  useEditAllThatApplyInteractiveTypeMutation,
  useEditClickAndMatchInteractiveTypeMutation,
  useEditFillInTheBlanksInteractiveTypeMutation,
  useEditSelectAnAnswerInteractiveTypeMutation,
  useEditThisOrThatInteractiveTypeMutation,
} from 'app/api/courseCreationApi'

import {
  ClickAndMatchFormValues,
  InteractiveTypes,
  SelectAnAnswerFormValues,
  ThisOrThatFormValues,
  FillInTheBlankFormValues,
  SelectAllThatApplyFormValues,
  QuestionOptionType,
  AllInteractiveResourceTypes,
  ThisOrThatInteractives,
  ModuleContentTypes,
  ClickForMoreExplanationFormValues,
  BoxWithAppropriateOptionFormvalues,
} from 'app/types'

import * as resourceguards from 'app/types/guards'
import { camelCase } from 'app/utils'

const AddInteractive = ({
  discard,
  moduleId,
  isEditing,
  interactiveType,
  initialValues,
}: {
  discard: () => void
  moduleId: string
  isEditing: boolean
  initialValues?: AllInteractiveResourceTypes
  interactiveType?: InteractiveTypes
}) => {
  const [selectedInteractiveType, setSelectedInteractiveType] = React.useState<
    InteractiveTypes
  >(interactiveType || InteractiveTypes.selectAnAnswer)

  type SelectAnswerRefType = React.ComponentRef<typeof SelectAnAnswer>
  type ClickAndMatchRefType = React.ComponentRef<typeof ClickAndMatch>
  type ThisOrThatRefType = React.ComponentRef<typeof ThisOrThat>
  type FillInTheBlankRefType = React.ComponentRef<typeof FillInTheBlank>
  type SelectAllThatApplyRefType = React.ComponentRef<typeof SelectAllThatApply>
  type ClickForMoreExplanationRefType = React.ComponentRef<
    typeof ClickForMoreExplanation
  >
  type BoxWithAppropriateOptionsRefType = React.ComponentRef<
    typeof BoxWithAppropriateOption
  >
  type FillInTheBlanksInATableRefType = React.ComponentRef<
    typeof FillInTheBlanksInATable
  >

  const selectAnswerRef = React.useRef<SelectAnswerRefType>()
  const clickAndMatchRef = React.useRef<ClickAndMatchRefType>()
  const thisOrThatRef = React.useRef<ThisOrThatRefType>()
  const selectAllThatApplyRef = React.useRef<SelectAllThatApplyRefType>()
  const fillInTheBlankRef = React.useRef<FillInTheBlankRefType>()
  const clickForMoreExplanationRef = React.useRef<
    ClickForMoreExplanationRefType
  >()
  const boxWithApproprateOptionRef = React.useRef<
    BoxWithAppropriateOptionsRefType
  >()
  const fillInTheBlanksInATableRef = React.useRef<
    FillInTheBlanksInATableRefType
  >()

  const numberToQuestionTypeMap: Record<number, QuestionOptionType> = {
    0: 'OptionOne',
    1: 'OptionTwo',
    2: 'OptionThree',
    3: 'OptionFour',
  }

  const [
    submitSelectAnAnswerInteractive,
    {
      isLoading: isAddingSelectAnAnswerInteractive,
      isError: addSelectAnAnswerInteractiveError,
    },
  ] = useAddInteractiveType__SelectAnAnswerMutation()

  const [
    editSelectAnAnswerInteractive,
    {
      isLoading: isEditingSelectAnAnswerInteractive,
      isError: editSelectAnAnserInteractiveError,
    },
  ] = useEditSelectAnAnswerInteractiveTypeMutation()

  const [
    submitClickAndMatchInteractive,
    {
      isLoading: isAddingClickAndMatchInteractive,
      isError: addClickAndMatchInteractiveError,
    },
  ] = useAddInteractiveType__ClickAndMatchMutation()

  const [
    editClickAndMatchInteractive,
    {
      isLoading: isEditingClickAndMatchInteractive,
      isError: editClickAndMatchInteractiveError,
    },
  ] = useEditClickAndMatchInteractiveTypeMutation()

  const [
    submitThisOrThatInteractive,
    {
      isLoading: isAddingThisOrThatInteractitve,
      isError: addThisOrThatInteractiveError,
    },
  ] = useAddInteractiveType__ThisOrThatMutation()

  const [
    submitFillInTheBlankInteractive,
    {
      isLoading: isAddingFillInTheBlankInteractive,
      isError: addFillInTheBlankError,
    },
  ] = useAddInteractiveType__FillInTheBlanksMutation()

  const [
    editFillInTheBlankInteractive,
    {
      isLoading: isEditingFillInTheBlankInteractive,
      isError: editFillInTheBlankInteractiveError,
    },
  ] = useEditFillInTheBlanksInteractiveTypeMutation()

  const [
    submitSelectAllThatApplyInteractive,
    {
      isLoading: isAddingSelectAllThatApplyInteractive,
      isError: addSelectAllThatApplyError,
    },
  ] = useAddInteractiveType__SelectAllThatApplyMutation()

  const [
    submitClickForMoreExplanationInteractive,
    {
      isLoading: isAddingClickForMoreExplanationInteractive,
      isError: addClickForMoreInteractiveError,
    },
  ] = useAddInteractiveType__ClickForMoreExplanationMutation()

  const [
    submitBoxwithAppropriateOptionInteractive,
    {
      isLoading: isAddingBoxWithAppropriateOptionsInteractive,
      isError: addBoxWithAppropriateOptionsError,
    },
  ] = useAddInteractiveType__BoxWithAppropriateOptionsMutation()

  const [
    editAllThatApplyInteractive,
    {
      isLoading: isEditingAllThatApplyInteractive,
      isError: editAllThatApplyError,
    },
  ] = useEditAllThatApplyInteractiveTypeMutation()

  const [
    editThisOrThatInteractive,
    {
      isLoading: isEditingThisOrThatInteractive,
      isError: editThisOrThatInteractiveError,
    },
  ] = useEditThisOrThatInteractiveTypeMutation()

  const interactivesCallbackMap = {
    [InteractiveTypes.selectAnAnswer]: {
      edit: editSelectAnAnswerInteractive,
      submit: submitSelectAnAnswerInteractive,
    },
    [InteractiveTypes.clickAndMatch]: {
      edit: editClickAndMatchInteractive,
      submit: submitClickAndMatchInteractive,
    },
    [InteractiveTypes.fillInTheBlank]: {
      edit: editFillInTheBlankInteractive,
      submit: submitClickAndMatchInteractive,
    },
    [InteractiveTypes.selectAllThatApply]: {
      edit: editAllThatApplyInteractive,
      submit: submitSelectAllThatApplyInteractive,
    },
  }

  const handleSubmitInteractive: React.FormEventHandler<HTMLFormElement> = async (
    e,
  ) => {
    e.preventDefault()

    switch (selectedInteractiveType) {
      case InteractiveTypes.selectAnAnswer:
        if (isEditing) selectAnswerRef.current?.editSelectAnAnserInteractive()
        else selectAnswerRef.current?.submitSelectAnAnswerIterative()
        break

      case InteractiveTypes.clickAndMatch:
        if (isEditing) clickAndMatchRef.current?.editClickAndMatchInteractive()
        else clickAndMatchRef.current?.submitClickAndMatchInteractive()
        break

      case InteractiveTypes.thisOrThat:
        if (isEditing) thisOrThatRef.current?.editThisOrThatInteractive()
        else thisOrThatRef.current?.submitThisOrThatInteractive()
        break

      case InteractiveTypes.selectAllThatApply:
        if (isEditing)
          selectAllThatApplyRef.current?.editSelectAllThatApplyInteractive()
        else
          selectAllThatApplyRef.current?.submitSelectAllThatApplyInteractive()
        break

      case InteractiveTypes.fillInTheBlank:
        if (isEditing)
          fillInTheBlankRef.current?.editFillInTheBlankInteractive()
        else fillInTheBlankRef.current?.submitFillInTheBlankInteractive()
        break

      case InteractiveTypes.clickForMoreExplanation:
        if (isEditing)
          clickForMoreExplanationRef.current?.editClickForMoreExplanationInteractive()
        else
          clickForMoreExplanationRef.current?.submitClickForMoreExplanationInteractive()
        break

      case InteractiveTypes.boxWithAppropriateOption:
        if (isEditing)
          boxWithApproprateOptionRef.current?.editBoxWithAppropriateOptionInteractiveType()
        else
          boxWithApproprateOptionRef.current?.submitBoxwithAppropriateOptionInteractiveType()
        break
    }
  }

  type AllFormValues =
    | SelectAnAnswerFormValues
    | ClickAndMatchFormValues
    | FillInTheBlankFormValues
    | SelectAllThatApplyFormValues

  const callback = async (
    values: AllFormValues & { typeId?: string },
    type: 'edit' | 'submit',
  ) => {
    try {
      // @ts-ignore
      await interactivesCallbackMap[selectedInteractiveType][type]({
        ...values,
        typeId: values.id as string,
        moduleId,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const fillInTheBlankCallback = async (
    fillInTheBlankInteractiveValues: FillInTheBlankFormValues,
    type: 'edit' | 'submit',
  ) => {
    // @ts-ignore
    let correctOption = ''
    for (const key in fillInTheBlankInteractiveValues) {
      if (
        key !== 'correctOption' &&
        //@ts-ignore
        fillInTheBlankInteractiveValues[key] ===
          fillInTheBlankInteractiveValues.correctOption
      ) {
        correctOption = key
        break
      }
    }
    const body = {
      ...fillInTheBlankInteractiveValues,
      moduleId,
      answers: [
        {
          blankSection: `#`,
          correctOption,
        },
      ],
      question: `${fillInTheBlankInteractiveValues.beforeDash} # ${fillInTheBlankInteractiveValues.afterDash}`,
    }

    try {
      if (type === 'edit') {
        // @ts-ignore
        const res = await editFillInTheBlankInteractive({
          ...body,
          typeId: body.id as string,
        })
      } else {
        //@ts-ignore
        const res = await submitFillInTheBlankInteractive(body).unwrap()
        console.log(res)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const isThisOrThatResource = (res?: {
    value: any
    isInputing: boolean
  }): res is { value: ThisOrThatInteractives; isInputing: boolean } => {
    return res?.value.type === ModuleContentTypes.thisOrThat
  }

  const thisOrThatCallback = async (
    thisOrThatInteractiveValues: ThisOrThatFormValues,
    type: 'edit' | 'submit',
  ) => {

    if (type === 'edit') {
      await editThisOrThatInteractive({
        questions: thisOrThatInteractiveValues.questions.map((question) => ({
          typeId: question.id as string,
          moduleId: question.moduleId as string,
          title: question.title,
          optionOne: question.optionOne,
          optionTwo: question.optionTwo,
          correctOption: question.answer as Exclude<
            typeof question['answer'],
            'None'
          >,
          cardDetails: {
            cardType: camelCase(question.cardType, true) as 'Image' | 'Text',
            [question.cardType === 'image'
              ? 'fileToUpload'
              : 'contentText']: question.cardContent,
          },
        })),
        moduleId: thisOrThatInteractiveValues.questions[0].moduleId as string,
      })
    } else {
      const formattedFormValues = thisOrThatInteractiveValues.questions.map(
        (question) => ({
          title: question.title,
          moduleId: moduleId,
          optionOne: question.optionOne,
          optionTwo: question.optionTwo,
          correctOption: question.answer as 'OptionOne' | 'OptionTwo',
          cardDetails: {
            type: camelCase(question.cardType),
            contentText:
              question.cardType === 'text' ? question.cardContent : '',
            fileToUpload:
              question.cardType === 'image' ? question.cardContent : [null],
          },
        }),
      )
      try {
        // @ts-ignore
        await submitThisOrThatInteractive(formattedFormValues)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const clickForMoreExplanationCallback = async (
    values: ClickForMoreExplanationFormValues,
    type: 'edit' | 'submit',
  ) => {
    if (type === 'edit') {
      console.log('should edit here', values)
    } else {
      try {
        const res = await submitClickForMoreExplanationInteractive({
          moduleId,
          ...values,
        }).unwrap()
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const boxWithAppropriateOptionCallback = async (
    values: BoxWithAppropriateOptionFormvalues,
    type: 'edit' | 'submit',
  ) => {
    console.log(values)
    if (type === 'edit') {
      console.warn('EDIT NOT IMPLEMENTED')
    } else {
      try {
        const res = await submitBoxwithAppropriateOptionInteractive({
          moduleId,
          ...values,
        })
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const [shouldPreview, setShouldPreview] = React.useState<boolean>(false)

  return (
    <form className="px-4 md:px-6 py-4" onSubmit={handleSubmitInteractive}>
      <div className="grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-center mb-4">
        <p className="text-xl">Interactive</p>
      </div>

      <div className="py-2 grid md:grid-cols-[150px,1fr] grid-cols-[100px,1fr] items-start mb-4">
        <p>Interactive Type</p>
        <div className="flex gap-4 flex-wrap">
          <Button
            className={`border py-1 px-3 rounded-full h-auto disabled:text-muted disabled:bg-gray-300 disabled:cursor-not-allowed ${
              selectedInteractiveType === InteractiveTypes.selectAnAnswer
                ? 'bg-app-pink bg-opacity-60 border-app-pink text-white'
                : 'bg-app-stroke border-muted'
            }`}
            type="button"
            disabled={
              isEditing &&
              selectedInteractiveType !== InteractiveTypes.selectAnAnswer
            }
            onClick={() =>
              setSelectedInteractiveType(InteractiveTypes.selectAnAnswer)
            }
          >
            Select an answer
          </Button>
          <Button
            className={`border py-1 px-3 rounded-full h-auto disabled:text-muted disabled:bg-gray-300 disabled:cursor-not-allowed ${
              selectedInteractiveType === InteractiveTypes.clickAndMatch
                ? 'bg-app-pink bg-opacity-60 border-app-pink text-white'
                : 'bg-app-stroke border-muted'
            }`}
            type="button"
            disabled={
              isEditing &&
              selectedInteractiveType !== InteractiveTypes.clickAndMatch
            }
            onClick={() =>
              setSelectedInteractiveType(InteractiveTypes.clickAndMatch)
            }
          >
            Click and Match
          </Button>
          <Button
            className={`border py-1 px-3 rounded-full h-auto disabled:text-muted disabled:bg-gray-300 disabled:cursor-not-allowed ${
              selectedInteractiveType === InteractiveTypes.thisOrThat
                ? 'bg-app-pink bg-opacity-60 border-app-pink text-white'
                : 'bg-app-stroke border-muted'
            }`}
            type="button"
            disabled={
              isEditing &&
              selectedInteractiveType !== InteractiveTypes.thisOrThat
            }
            onClick={() =>
              setSelectedInteractiveType(InteractiveTypes.thisOrThat)
            }
          >
            This or That
          </Button>
          <Button
            className={`border py-1 px-3 rounded-full h-auto disabled:text-muted disabled:bg-gray-300 disabled:cursor-not-allowed ${
              selectedInteractiveType === InteractiveTypes.fillInTheBlank
                ? 'bg-app-pink bg-opacity-60 border-app-pink text-white'
                : 'bg-app-stroke border-muted'
            }`}
            type="button"
            disabled={
              isEditing &&
              selectedInteractiveType !== InteractiveTypes.fillInTheBlank
            }
            onClick={() =>
              setSelectedInteractiveType(InteractiveTypes.fillInTheBlank)
            }
          >
            Fill in the blanks
          </Button>
          <Button
            className={`border py-1 px-3 rounded-full h-auto disabled:text-muted disabled:bg-gray-300 disabled:cursor-not-allowed ${
              selectedInteractiveType === InteractiveTypes.selectAllThatApply
                ? 'bg-app-pink bg-opacity-60 border-app-pink text-white'
                : 'bg-app-stroke border-muted'
            }`}
            type="button"
            disabled={
              isEditing &&
              selectedInteractiveType !== InteractiveTypes.selectAllThatApply
            }
            onClick={() =>
              setSelectedInteractiveType(InteractiveTypes.selectAllThatApply)
            }
          >
            Select all that apply
          </Button>
          <Button
            className={`border py-1 px-3 rounded-full h-auto disabled:text-muted disabled:bg-gray-300 disabled:cursor-not-allowed ${
              selectedInteractiveType ===
              InteractiveTypes.clickForMoreExplanation
                ? 'bg-app-pink bg-opacity-60 border-app-pink text-white'
                : 'bg-app-stroke border-muted'
            }`}
            type="button"
            disabled={
              isEditing &&
              selectedInteractiveType !==
                InteractiveTypes.clickForMoreExplanation
            }
            onClick={() =>
              setSelectedInteractiveType(
                InteractiveTypes.clickForMoreExplanation,
              )
            }
          >
            Click for more Explanation
          </Button>
          <Button
            className={`border py-1 px-3 rounded-full h-auto disabled:text-muted disabled:bg-gray-300 disabled:cursor-not-allowed ${
              selectedInteractiveType ===
              InteractiveTypes.boxWithAppropriateOption
                ? 'bg-app-pink bg-opacity-60 border-app-pink text-white'
                : 'bg-app-stroke border-muted'
            }`}
            type="button"
            disabled={
              isEditing &&
              selectedInteractiveType !==
                InteractiveTypes.boxWithAppropriateOption
            }
            onClick={() =>
              setSelectedInteractiveType(
                InteractiveTypes.boxWithAppropriateOption,
              )
            }
          >
            Box with appropriate options
          </Button>

          <Button
            className={`border py-1 px-3 rounded-full h-auto disabled:text-muted disabled:bg-gray-300 disabled:cursor-not-allowed ${
              selectedInteractiveType ===
              InteractiveTypes.fillInTheBlanksInATable
                ? 'bg-app-pink bg-opacity-60 border-app-pink text-white'
                : 'bg-app-stroke border-muted'
            }`}
            type="button"
            disabled={
              isEditing &&
              selectedInteractiveType !==
                InteractiveTypes.fillInTheBlanksInATable
            }
            onClick={() =>
              setSelectedInteractiveType(
                InteractiveTypes.fillInTheBlanksInATable,
              )
            }
          >
            Fill In The Blanks In A Table
          </Button>
        </div>
      </div>

      {selectedInteractiveType === InteractiveTypes.selectAnAnswer && (
        <SelectAnAnswer
          initialValues={
            resourceguards.isSelectAnAnswerResource(initialValues)
              ? {
                  question: initialValues.value.question,
                  optionOne: initialValues.value.optionOne,
                  optionTwo: initialValues.value.optionTwo,
                  optionThree: initialValues.value.optionThree,
                  optionFour: initialValues.value.optionFour,
                  correctOption:
                    numberToQuestionTypeMap[initialValues.value.correctOption],
                  id: initialValues.value.id,
                  moduleId: initialValues.value.moduleId,
                }
              : undefined
          }
          // @ts-ignore
          ref={selectAnswerRef}
          onEditCallback={(data) => callback(data, 'edit')}
          onSubmitCallback={(data) => callback(data, 'submit')}
          shouldPreview={
            shouldPreview &&
            selectedInteractiveType === InteractiveTypes.selectAnAnswer
          }
          stopPreview={() => setShouldPreview(false)}
        />
      )}

      {selectedInteractiveType === InteractiveTypes.clickAndMatch && (
        <ClickAndMatch
          // @ts-ignore
          ref={clickAndMatchRef}
          initialValues={
            resourceguards.isClickAndMatchResource(initialValues)
              ? {
                  title: initialValues.value.title,
                  statements: initialValues.value.statements,
                  id: initialValues.value.id,
                  moduleId: initialValues.value.moduleId,
                }
              : undefined
          }
          onEditCallback={(data) => callback(data, 'edit')}
          onSubmitCallback={(data) => callback(data, 'submit')}
          shouldPreview={
            shouldPreview &&
            selectedInteractiveType === InteractiveTypes.clickAndMatch
          }
          stopPreview={() => setShouldPreview(false)}
        />
      )}

      {selectedInteractiveType === InteractiveTypes.thisOrThat && (
        <ThisOrThat
          // @ts-ignore
          ref={thisOrThatRef}
          initialValues={
            isThisOrThatResource(initialValues)
              ? {
                  questions: initialValues.value.questions.map((question) => ({
                    ...question,
                    answer: numberToQuestionTypeMap[question.correctOption] as
                      | 'OptionOne'
                      | 'OptionTwo',
                    cardType:
                      question.cardDetails.cardType === 0 ? 'image' : 'text',
                    cardContent: question.cardDetails.content,
                  })),
                  groupId: initialValues.value.group,
                }
              : undefined
          }
          onSubmitCallback={(data) => thisOrThatCallback(data, 'submit')}
          onEditCallback={(data) => thisOrThatCallback(data, 'edit')}
          shouldPreview={
            shouldPreview &&
            selectedInteractiveType === InteractiveTypes.thisOrThat
          }
          stopPreview={() => setShouldPreview(false)}
        />
      )}

      {selectedInteractiveType === InteractiveTypes.fillInTheBlank && (
        <FillInTheBlank
          // @ts-ignore
          ref={fillInTheBlankRef}
          initialValues={
            resourceguards.isFillInTheBlankResource(initialValues)
              ? {
                  title: initialValues.value.title,
                  question: initialValues.value.question,
                  beforeDash: initialValues.value.question.split('#')[0],
                  afterDash: initialValues.value.question.split('#')[1],
                  optionOne: initialValues.value.optionOne,
                  optionTwo: initialValues.value.optionTwo,
                  optionThree: initialValues.value.optionThree,
                  optionFour: initialValues.value.optionFour,
                  correctOption:
                    //@ts-ignore
                    initialValues.value[
                      numberToQuestionTypeMap[
                        initialValues.value.answers[0].correctOption
                      ]
                        .charAt(0)
                        .toLowerCase()
                        .concat(
                          numberToQuestionTypeMap[
                            initialValues.value.answers[0].correctOption
                          ].slice(1),
                        )
                    ],
                  id: initialValues.value.id,
                  moduleId: initialValues.value.moduleId,
                }
              : undefined
          }
          onSubmitCallback={(data) => fillInTheBlankCallback(data, 'submit')}
          onEditCallback={(data) => fillInTheBlankCallback(data, 'edit')}
          shouldPreview={
            shouldPreview &&
            selectedInteractiveType === InteractiveTypes.fillInTheBlank
          }
          stopPreview={() => setShouldPreview(false)}
        />
      )}
      {selectedInteractiveType === InteractiveTypes.selectAllThatApply && (
        <SelectAllThatApply
          // @ts-ignore
          ref={selectAllThatApplyRef}
          initialValues={
            resourceguards.isAllThatApplyResource(initialValues)
              ? {
                  title: initialValues.value.title,
                  question: initialValues.value.question,
                  optionOne: initialValues.value.optionOne,
                  optionTwo: initialValues.value.optionTwo,
                  optionThree: initialValues.value.optionThree,
                  optionFour: initialValues.value.optionFour,
                  answers: initialValues.value.answers.map(
                    (num) => numberToQuestionTypeMap[num],
                  ),
                  id: initialValues.value.id,
                  moduleId: initialValues.value.moduleId,
                }
              : undefined
          }
          onEditCallback={(data) => callback(data, 'edit')}
          onSubmitCallback={(data) => callback(data, 'submit')}
          shouldPreview={
            shouldPreview &&
            selectedInteractiveType === InteractiveTypes.selectAllThatApply
          }
          stopPreview={() => setShouldPreview(false)}
        />
      )}

      {selectedInteractiveType === InteractiveTypes.clickForMoreExplanation && (
        <ClickForMoreExplanation
          // @ts-ignore
          ref={clickForMoreExplanationRef}
          onSubmitCallback={(data) =>
            clickForMoreExplanationCallback(data, 'submit')
          }
          onEditCallback={(data) => console.log(data)}
          shouldPreview={
            shouldPreview &&
            selectedInteractiveType === InteractiveTypes.clickForMoreExplanation
          }
          stopPreview={() => setShouldPreview(false)}
          initialValues={
            resourceguards.isClickForMoreExplanationResource(initialValues)
              ? {
                  title: initialValues.value.title,
                  content: initialValues.value.content,
                  image: (initialValues.value.imageUrl as unknown) as FileList,
                  buttons: initialValues.value.buttons.map((button) => ({
                    label: button.buttonLabel,
                    content: button.buttonContent,
                    id: button.id,
                  })),
                }
              : undefined
          }
        />
      )}

      {selectedInteractiveType ===
        InteractiveTypes.boxWithAppropriateOption && (
        <BoxWithAppropriateOption
          // @ts-ignore
          ref={boxWithApproprateOptionRef}
          onSubmitCallback={(data) =>
            boxWithAppropriateOptionCallback(data, 'submit')
          }
          onEditCallback={(data) =>
            boxWithAppropriateOptionCallback(data, 'edit')
          }
          shouldPreview={
            shouldPreview &&
            selectedInteractiveType ===
              InteractiveTypes.boxWithAppropriateOption
          }
          stopPreview={() => setShouldPreview(false)}
          initialValues={
            resourceguards.isBoxWithOptionsResource(initialValues)
              ? {
                  title: initialValues.value.title,
                  question: initialValues.value.question,
                  image: (initialValues.value.imageUrl as unknown) as FileList,
                  boxes: initialValues.value.options.map((box) => ({
                    value: box.text,
                    id: box.id,
                    isCorrect: box.isTheAnswer,
                  })),
                }
              : undefined
          }
        />
      )}

      {selectedInteractiveType === InteractiveTypes.fillInTheBlanksInATable && (
        <FillInTheBlanksInATable
          // @ts-ignore
          ref={fillInTheBlanksInATableRef}
          onSubmitCallback={(data) => console.log(data)}
          onEditCallback={(data) => console.log(data)}
          shouldPreview={
            shouldPreview &&
            selectedInteractiveType === InteractiveTypes.fillInTheBlanksInATable
          }
          stopPreview={() => setShouldPreview(false)}
          initialValues={undefined}
        />
      )}

      <div className="buttonContainer flex items-center justify-end gap-4 mt-10 mb-4">
        <Button
          type="button"
          className="text-app-pink px-8 py-2"
          onClick={() => setShouldPreview(true)}
        >
          Preview
        </Button>

        <Button
          type="button"
          className="text-app-pink border-2 border-app-pink px-8 py-2 rounded"
          onClick={discard}
        >
          Discard changes
        </Button>
        <Button
          type="submit"
          loading={
            isAddingClickAndMatchInteractive ||
            isEditingClickAndMatchInteractive ||
            isAddingSelectAnAnswerInteractive ||
            isEditingSelectAnAnswerInteractive ||
            isAddingThisOrThatInteractitve ||
            isEditingThisOrThatInteractive ||
            isAddingFillInTheBlankInteractive ||
            isEditingFillInTheBlankInteractive ||
            isAddingSelectAllThatApplyInteractive ||
            isEditingAllThatApplyInteractive ||
            isAddingClickForMoreExplanationInteractive ||
            isAddingBoxWithAppropriateOptionsInteractive
          }
          className="text-white bg-app-pink border-2 border-app-pink px-8 py-2 rounded"
        >
          Save changes
        </Button>
      </div>
    </form>
  )
}

export default AddInteractive
