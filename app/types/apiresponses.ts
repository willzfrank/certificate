import { AssessmentType, QuestionOptionType } from "./coursetypes";
import { QuestionFormValues } from "./formtypes";
import { Category, Profession, USERTYPES } from "./usertypes";

export interface ApiError {
  key: string;
  errorMessages: string[];
}

interface PaginatedResponse<T> {
  data: {
    metaData: {
      page: number;
      perPage: number;
      total: number;
      totalPages: number;
    };
    pagedList: Array<T>;
  };
  errors: Array<ApiError>;
}

export interface RegisterResponse {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  profilePictureUrl: string | null;
  roleName: USERTYPES;
  dateOfBirth: string | null;
  dateCreated: string;
  professions?: [];
}

export interface UpdateInstructorResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl: string | null;
  roleName: USERTYPES;
  isProfileComplete: boolean;
  lastProfilePoint: number;
  dateOfBirth: string | null;
  dateCreated: string;
  professions?: [];
}

export interface LoginResponse {
  data: {
    token: string;
    refreshToken: string;
    userId: string;
    tokenExpirationDate: string;
  };
}

export interface FIBItem {
  readonly id: string;
  readonly moduleId: string;
  readonly title: string;
  readonly optionOne: string;
  readonly optionTwo: string;
  readonly optionThree: string;
  readonly optionFour: string;
  readonly question: string;
  readonly position: number;
  readonly type: ModuleContentTypes.fillInTheBlank;
  readonly isTaken: boolean;
  readonly answers: [
    {
      "blankSection": '#';
      correctOption: number;
    }
  ]
}

export enum ModuleContentTypes {
  video = 'ModuleVideoType',
  assessment = 'ModuleAssessmentType',
  document = 'ModuleDocumentType',
  clickAndMatch = 'ClickAndMatchType',
  fillInTheBlank = 'FillInTheBlanksType',
  selectAnAnswer = 'SelectAnswerType',
  thisOrThat = 'ThisOrThatType',
  allThatApply = 'AllThatApplyType',
  boxWithOption = 'BoxWithOptionType',
  clickForMore = 'ClickForMoreType',
  NULL = 'NULL'
}

export interface ModuleContentResponse {
  data: {
    totalSeconds: number;
    videos: Array<{
      readonly id: string;
      readonly displayName: string;
      readonly totalSeconds: number;
      readonly videoUrl: string;
      readonly description: string;
      readonly isWatched: boolean;
      readonly position: number;
      readonly type: ModuleContentTypes.video
    }>;
    assessments: Array<{
      readonly id: string;
      name: string;
      totalNumberOfQuestions: number;
      isCompleted: boolean;
      readonly position: number;
      readonly type: ModuleContentTypes.assessment
    }>;
    documents: Array<{
      readonly id: string;
      readonly displayName: string;
      readonly description: string;
      readonly documentUrl: string;
      readonly position: number;
      readonly type: ModuleContentTypes.document;
      readonly isRead: boolean
    }>;
    selectAnswerInteractiveTypes: Array<{
      readonly correctOption: number;
      readonly moduleId: string;
      readonly optionOne: string;
      readonly optionTwo: string;
      readonly optionThree: string;
      readonly optionFour: string;
      readonly question: string;
      readonly position: number;
      readonly type: ModuleContentTypes.selectAnAnswer;
      readonly isTaken: boolean
      readonly id: string
    }>;
    clickAndMatchInteractiveTypes: Array<{
      id: string;
      moduleId: string;
      statements: Array<{
        statement: string;
        statementMatch: string;
      }>;
      title: string;
      position: number;
      type: ModuleContentTypes.clickAndMatch;
      readonly isTaken: boolean;
    }>;
    fillInTheBlanksInteractiveTypes: FIBItem[];
    thisOrThatInteractiveTypes: Array<{
      id: string;
      moduleId: string;
      title: string;
      optionOne: string;
      optionTwo: string;
      correctOption: 0 | 1;
      cardDetails: {
        cardType: 0 | 1;
        content: string;
      };
      position: number;
      type: ModuleContentTypes.thisOrThat;
      isTaken: boolean;
      group: string;
      subPosition: number;
    }>;
    selectAllThatApplyInteractiveTypes: Array<{
      readonly id: string;
      readonly moduleId: string;
      readonly title: string;
      readonly question: string;
      readonly optionOne: string;
      readonly optionTwo: string;
      readonly optionThree: string;
      readonly optionFour: string;
      readonly answers: number[];
      position: number;
      type: ModuleContentTypes.allThatApply;
      isTaken: boolean;
    }>;
    boxWithOptionsInteractiveTypes: Array<{
      readonly id: string;
      readonly moduleId: string;
      readonly position: number;
      readonly title: string;
      readonly question: string;
      readonly imageUrl: string;
      readonly type: ModuleContentTypes.boxWithOption;
      readonly options: Array<{ id: string, text: string, isTheAnswer: boolean }>
    }>;
    clickForMoreInteractiveTypes: Array<{
      id: string;
      moduleId: string;
      position: number;
      title: string;
      content: string;
      imageUrl: string;
      type: ModuleContentTypes.clickForMore,
      buttons: Array<{ id: string, buttonLabel: string, buttonContent: string }>
    }>
  };
  error: Array<{}>;
}

/* {
                "id": "05b679a7-cddd-4675-9c75-5352578123ea",
                "moduleId": "6e6120f1-c62b-4f0c-8100-5db915611fcd",
                "position": 6,
                "title": "Click each button to get more information",
                "content": "Lorem ipsum dolor sit amet consectetur. Pulvinar nulla dictumst nisl sit consectetur tristique parturient donec.",
                "imageUrl": "https://certification-by-unify.s3.amazonaws.com/fe9deed7-1a1c-4935-ad58-323709e263d6?AWSAccessKeyId=AKIAWGSLF2G2J2TJ475M&Expires=1708436398&Signature=B8yV%2B993xv66GsfZgkA%2FRw3qIAU%3D",
                "type": "ClickForMoreType",
                "buttons": [
                    {
                        "id": "751f4abc-6f8d-4c15-8b65-6cae0c7b3022",
                        "buttonLabel": "Quantitative analysis",
                        "buttonContent": "Lorem ipsum dolor sit amet consectetur. Pulvinar nulla dictumst nisl sit consectetur tristique parturient donec.Lorem ipsum dolor sit amet consectetur. Pulvinar nulla dictumst nisl sit consectetur tristique parturient donec."
                    },
                    {
                        "id": "e64e48ae-ca24-4e5d-81c3-2354051ed1d3",
                        "buttonLabel": "Qualitative analysis",
                        "buttonContent": "Lorem ipsum dolor sit amet consectetur. Pulvinar nulla dictumst nisl sit consectetur tristique parturient donec.Lorem ipsum dolor sit amet consectetur. Pulvinar nulla dictumst nisl sit consectetur tristique parturient donec."
                    }
                ]
            }

 */

export interface ProfessionsResponse {
  data: Profession[];
  errors: any[];
}

export interface CategoriesResponse {
  data: Category[];
  errors: any[];
}

export interface GetAssessmentDetailsResponse {
  data: Array<AssessmentType>;
  errors: Array<ApiError>;
}

export interface AssessmentResultQuestion
  extends Omit<QuestionFormValues, "correctOption"> {
  id: string;
  correctOption: number;
  chosenOption: number;
}

export interface GetAsssessmentResultsResponse {
  data: {
    assessmentGradeId: string;
    isCompleted: boolean;
    totalScore: number;
    questions: Array<AssessmentResultQuestion>;
  };
  error: Array<ApiError>;
}

export interface Note {
  id: string;
  studentId: string;
  studentName: string;
  profilePictureUrl: string;
  dateCreated: string;
  text: string;
}

export type GetNotesResponse = PaginatedResponse<Note>;

export interface DiscussionComment {
  id: string;
  text: string;
  dateCreated: string;
  numberOfReplies: number;
  user: {
    id: string;
    name: string;
    profilePictureUrl: string;
    roleName: USERTYPES;
  };
}

export type GetDiscussionResponse = PaginatedResponse<DiscussionComment>;

export interface CourseReview {
  id: string;
  courseId: string;
  score: number;
  text: string;
  dateCreated: string;
  studentName: string;
  studentProfilePicture: string;
}

export type GetCourseReviewsResponse = PaginatedResponse<CourseReview>;

export interface Notification {
  content: string;
  ownerId: string;
  notificationEntityId: string;
  notificationType: string;
}

export type GetUserNotificationsResponse = PaginatedResponse<Notification>;

export interface CheckDiscountCodeValidityResponse {
  data: {
    id: string
    code: string,
    value: number,
    discountType: "DiscountByPercentage" | "DiscountByAbsoluteValue",
    isValid: boolean
  },
  errors: Array<ApiError>
}
