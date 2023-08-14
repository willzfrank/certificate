import { QuestionOptionType } from "./coursetypes";

export enum InteractiveTypes {
  clickAndMatch = 'ClickAndMatchType',
  fillInTheBlank = 'FillInTheBlanksType',
  selectAnAnswer = 'SelectAnswerType',
  thisOrThat = 'ThisOrThatType',
  selectAllThatApply = 'AllThatApplyType',
  clickForMoreExplanation = 'ClickForMoreType',
  boxWithAppropriateOption = 'BoxWithOptionType',
  fillInTheBlanksInATable = 'FillInTheBlanksInATableType',
}


export type SelectAnAnswerFormValues = {
  question: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  correctOption: QuestionOptionType;
  id?: string;
  moduleId?: string;
};

export type ClickAndMatchFormValues = {
  title: string;
  statements: Array<{
    statement: string;
    statementMatch: string;
  }>;
  id?: string;
  moduleId?: string;
};

export type ThisOrThatFormValues = {
  questions: Array<{
    title: string;
    optionOne: string;
    optionTwo: string;
    answer: "OptionOne" | "OptionTwo" | "None";
    cardType: "image" | "text" | "none";
    cardContent: string | FileList;
    id?: string;
    moduleId?: string
  }>;
  groupId: string
};

export type SelectAllThatApplyFormValues = {
  title: string;
  question: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  answers: QuestionOptionType[];
  id?: string;
  moduleId?: string;
  // numOfCorrect: "1" | "2" | "3" | "4";
};

export type FillInTheBlankFormValues = {
  title: string;
  question: string;
  beforeDash: string;
  afterDash: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  correctOption: QuestionOptionType;
  id?: string;
  moduleId?: string;
};

export type ClickForMoreExplanationFormValues = {
  title: string;
  content: string;
  image: FileList;
  buttons: Array<{
    label: string,
    content: string,
    id?: string
  }>
}

export type BoxWithAppropriateOptionFormvalues = {
  title: string;
  question: string;
  image: FileList;
  boxes: Array<{
    id?: string
    value: string;
    isCorrect: boolean;
  }>;
}

export type FillInTheBlanksInATableFormValues = {
  title: string;
  question: string;
  columnCount: number;
  rowCount: number;
  columnTitles: string[];
  rows: Array<{
    columns: string[],
    blankColumnIndex: number,
    blankColumnOptions: {
      OptionOne: string,
      OptionTwo: string,
      OptionThree: string,
      OptionFour: string,
      correctOption: QuestionOptionType
    }
  }>
}