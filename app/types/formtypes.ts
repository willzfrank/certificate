import { QuestionOptionType } from "./coursetypes"

export type QuestionFormValues = {
    question: string
    optionOne: string
    optionTwo: string
    optionThree: string
    optionFour: string
    correctOption: QuestionOptionType | null
    moduleId: string
}

export type AssessmentDetailsType = {
    name: string
    questions: Array<QuestionFormValues> 
  }