import { ModuleContentResponse, ModuleContentTypes } from './apiresponses';
import { Category } from './usertypes';

export type CourseType = {
  instructor: string;
  title: string;
  price: number;
};

export interface CourseInstructor {
  id: string;
  name: string;
  bio?: string;
  profilePictureUrl?: string;
}

export interface Course {
  courseId: string;
  title: string;
  imageUrl: string;
  videoUrl: string;
  approvalStatus?: CourseApprovalStatus;
  instructors: CourseInstructor[];
  minumumPrice: number;
  maximumPrice: number;
  dateCreated: string;
  ratings?: 0;
  revenue?: 0;
  isActive: boolean;
  isExternal: boolean;
  redirectUrl?: string;
  slugName?: string;
}

export interface CourseModules {
  moduleId: string;
  name: string;
  description: string;
  isExtra: boolean;
  position: number;
  paymentRequired?: boolean
}

export interface CourseResponse {
  data: {
    metaData: {
      page: number;
      perPage: number;
      total: number;
      totalPages: number;
    };
    pagedList: Course[];
  };
  errors: any[];
}
export interface PricingPlan {
  id: string;
  name: string;
  subscriptionType: string;
  price: number;
  offers: string[];
}

export interface SingleCourseDetailsResponse {
  id: string;
  name: string;
  description: string;
  intendedUsers: string;
  imageUrl: string;
  previewVideoUrl: string;
  totalNumberOfSeconds: number;
  instructors: Array<CourseInstructor>;
  modules: Array<CourseModules>;
  pricings: PricingPlan[];
  ratings: number;
  ratingsCount: number;
  lastSavePoint: LastSavedPointType;
  isSubscribed: boolean;
  categories: Category[];
  subTitle: string | null;
  isExternal: boolean
}

export interface ExternalCourse extends SingleCourseDetailsResponse {
  slugName: string;
  isExternal: boolean;
  wouldRecommend: boolean;
  redirectUrl: string;
}

export interface Course {
  courseId: string;
  title: string;
  imageUrl: string;
  videoUrl: string;
  instructors: CourseInstructor[];
  minumumPrice: number;
  maximumPrice: number;
  dateCreated: string;
  isSubscribed: string;
}

export type InProgressCoursesResponse = Omit<
  Course,
  'minimumPrice' | 'maximumPrice'
> & {
  percentCompleted: number;
  courseId: string;
  certificateRequired?: boolean;
};

export type AssessmentType = {
  id: string;
  question: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  assessmentId: string;
  assessmentGradeId: string;
  moduleId: string;
};

export interface PreviewProps extends Course {
  inWishList: boolean;
  add: Function;
  remove: Function;
}

export type VideoResourceType = {
  value: Omit<
    ModuleContentResponse['data']['videos'][number],
    'position' | 'type'
  >;
  isInputing: boolean;
};

export type AssessmentResourceType = {
  value: ModuleContentResponse['data']['assessments'][number];
  isInputing: boolean;
};

export type DocumentResourceType = {
  value: ModuleContentResponse['data']['documents'][number];
  isInputing: boolean;
};

export type SelectAnAnswerInteractiveResourceType = {
  value: ModuleContentResponse['data']['selectAnswerInteractiveTypes'][number];
  isInputing: boolean;
};

export type ClickAndMatchInteractiveResourceType = {
  value: ModuleContentResponse['data']['clickAndMatchInteractiveTypes'][number];
  isInputing: boolean;
};

export type FillInTheBlanksInteractiveResourceType = {
  value: ModuleContentResponse['data']['fillInTheBlanksInteractiveTypes'][number];
  isInputing: boolean;
};

export type ThisOrThatInteractiveResourceType = {
  value: ModuleContentResponse['data']['thisOrThatInteractiveTypes'][number];
  isInputing: boolean;
};

export type SelectAllThatApplyInteractiveResourceType = {
  value: ModuleContentResponse['data']['selectAllThatApplyInteractiveTypes'][number];
  isInputing: boolean;
};

export type ClickForMoreInteractiveResourceType = {
  value: ModuleContentResponse['data']['clickForMoreInteractiveTypes'][number];
  isInputing: boolean;
};

export type BoxWithOptionsInteractiveResourceType = {
  value: ModuleContentResponse['data']['boxWithOptionsInteractiveTypes'][number];
  isInputing: boolean;
};

export type AllInteractiveResourceTypes =
  | SelectAnAnswerInteractiveResourceType
  | SelectAllThatApplyInteractiveResourceType
  | FillInTheBlanksInteractiveResourceType
  | ClickAndMatchInteractiveResourceType
  | ThisOrThatInteractiveResourceType
  | BoxWithOptionsInteractiveResourceType
  | ClickForMoreInteractiveResourceType;

export type QuestionOptionType =
  | 'OptionOne'
  | 'OptionTwo'
  | 'OptionThree'
  | 'OptionFour';

export type LastSavedPointType = 0 | 1 | 2 | 3;

export enum CourseApprovalStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Draft = 'Draft',
  RequestingReview = 'Requesting Review',
  InReview = 'In Review',
  Disapproved = 'Disapproved',
  ChangesRequested = 'Changes Requested',
}

export type AllModuleResources =
  | ModuleContentResponse['data'][keyof Omit<
    ModuleContentResponse['data'],
    'totalSeconds' | 'thisOrThatInteractiveTypes'
  >]
  | ThisOrThatInteractives[];

export type ThisOrThatInteractives = {
  questions: ModuleContentResponse['data']['thisOrThatInteractiveTypes'];
  position: number;
  type: ModuleContentTypes.thisOrThat;
};

export type ExcludePositionAndType<T> = Omit<T, 'position' | 'type'>;
