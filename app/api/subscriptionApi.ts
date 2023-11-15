import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { API_URL } from 'app/constants';
import {
  ApiError,
  CheckDiscountCodeValidityResponse,
  InProgressCoursesResponse,
  InteractiveTypes,
  ModuleContentResponse,
  QuestionOptionType,
  RootState,
} from 'app/types';

interface AddSubscriptionRequestParams {
  courseId: string;
  studentId: string;
  amountPaid: number;
  subscriptionType: string | number;
  channel: 'Card' | 'Bank';
  source: 'Web' | 'App';
  coursePricingId: string;
  discountCode?: string;
}

const subscriptionApi = createApi({
  reducerPath: 'subscriptionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + '/Subscriptions',
    prepareHeaders: (headers, { getState }) => {
      const {
        user: { token },
      } = getState() as RootState;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['MODULECONTENT'],
  endpoints: (builder) => ({
    addSubscription: builder.mutation<any, AddSubscriptionRequestParams>({
      query: (args) => ({
        url: '/add-subscription',
        body: args,
        method: 'POST',
      }),
    }),

    getInProgressCourses: builder.query<
      InProgressCoursesResponse[],
      { studentId: string; page: number; perPage: number }
    >({
      query: (args) => ({
        url: `/get-courses-inprogress`,
        params: args,
      }),
      transformResponse: (res: any) => res.data.pagedList,
    }),

    getCompletedCourses: builder.query<
      InProgressCoursesResponse[],
      { studentId: string; page: number; perPage: number }
    >({
      query: (args) => ({
        url: '/get-completed-courses',
        params: args,
      }),
      transformResponse: (res: any) => res.data.pagedList,
    }),

    getCourseModuleContent: builder.query<
      ModuleContentResponse,
      { courseId: string; moduleId: string }
    >({
      query: (args) => ({
        url: `${API_URL}/courses/${args.courseId}/modules/get-module-content-unrestricted?moduleId=${args.moduleId}`,
      }),

      providesTags: (result, error, args) => [
        { type: 'MODULECONTENT' as const, id: args.moduleId },
      ],
      transformResponse: (res: any): ModuleContentResponse => {
        return {
          data: {
            totalSeconds: res.data.totalSeconds,
            videos: res.data.videos.map((video: any) => ({
              displayName: video.displayName,
              totalSeconds: video.totalSeconds,
              id: video.id,
              videoUrl: video.videoUrl,
              isWatched: video.isWatched,
              description: video.description,
              position: video.position,
              type: video.type,
            })),
            assessments: res.data.assessments,
            documents: res.data.documents ?? [],
            fillInTheBlanksInteractiveTypes:
              res.data.fillInTheBlanksInteractiveTypes,
            selectAnswerInteractiveTypes: res.data.selectAnswerInteractiveTypes,
            selectAllThatApplyInteractiveTypes:
              res.data.allThatApplyInteractiveTypes,
            thisOrThatInteractiveTypes: res.data.thisOrThatInteractiveTypes,
            clickAndMatchInteractiveTypes:
              res.data.clickAndMatchInteractiveTypes,
            clickForMoreInteractiveTypes:
              res.data.clickForMoreInteractiveTypes || [],
            boxWithOptionsInteractiveTypes:
              res.data.boxWithOptionsInteractiveTypes || [],
          },
          error: res.error,
        };
      },
    }),

    registerVideoAsWatched: builder.mutation<
      { data: string; errors: ApiError[] },
      { studentId: string; moduleVideoId: string; moduleId: string }
    >({
      query: (args) => ({
        url: '/set-modulevideo-as-watched',
        params: {
          studentId: args.studentId,
          moduleVideoId: args.moduleVideoId,
        },
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, args) => [
        { type: 'MODULECONTENT' as const, id: args.moduleId },
      ],
    }),

    registerDocumentAsRead: builder.mutation<
      { data: string; errors: ApiError[] },
      { studentId: string; moduleDocumentID: string; moduleId: string }
    >({
      query: (args) => ({
        url: '/set-moduledocument-as-read',
        params: {
          moduleDocumentId: args.moduleDocumentID,
          studentId: args.studentId,
        },
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, args) => [
        { type: 'MODULECONTENT' as const, id: args.moduleId },
      ],
    }),

    setInteractiveTypeAsTaken: builder.mutation<
      { message: string },
      {
        values: Array<{
          interactiveTypeId: string;
          studentId: string;
          interactiveType: InteractiveTypes;
        }>;
        moduleId: string;
      }
    >({
      query: (args) => ({
        url: '/set-interactivetype-as-taken',
        body: args.values,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, args) => [
        { type: 'MODULECONTENT' as const, id: args.moduleId },
      ],
    }),

    gradeAssessment: builder.mutation<
      { data: number; errors: Array<any> },
      {
        assessmentGradeId: string;
        studentId: string;
        moduleId: string;
        courseId: string;
        answers: Array<{ id: string; chosenOption: QuestionOptionType }>;
      }
    >({
      query: (args) => ({
        url: `${API_URL}/courses/${args.courseId}/modules/${args.moduleId}/grade-assessments-taken`,
        method: 'PATCH',
        body: args.answers,
        params: {
          assessmentGradeId: args.assessmentGradeId,
          studentId: args.studentId,
        },
      }),
      invalidatesTags: (result, error, args) => [
        { type: 'MODULECONTENT' as const, id: args.moduleId },
      ],
    }),

    checkDiscountCodeValidity: builder.mutation<
      CheckDiscountCodeValidityResponse,
      string
    >({
      query: (code) => ({
        url: `${API_URL}/discountcodes/check-code-validity`,
        params: { code },
        method: 'POST',
      }),
    }),

    getStudentsLearningReport: builder.query<any, { studentId: string }>({
      query: (args) => ({
        url: `/get-students-learning-report?studentId=${args.studentId}`,
        method: 'GET',
      }),
    }),

    getCourseSubscriptionStatus: builder.query<
      InProgressCoursesResponse[],
      { studentId: string; page: number; perPage: number }
    >({
      query: (args) => ({
        url: `/get-course-subscription-status`,
        params: args,
      }),
      transformResponse: (res: any) => res.data.pagedList,
    }),
  }),
});

export default subscriptionApi;

export const {
  useAddSubscriptionMutation,
  useGetCourseSubscriptionStatusQuery,
  useGetInProgressCoursesQuery,
  useGetCourseModuleContentQuery,
  useLazyGetCourseModuleContentQuery,
  useRegisterVideoAsWatchedMutation,
  useRegisterDocumentAsReadMutation,
  useGradeAssessmentMutation,
  useGetCompletedCoursesQuery,
  useSetInteractiveTypeAsTakenMutation,
  useCheckDiscountCodeValidityMutation,
  useGetStudentsLearningReportQuery,
} = subscriptionApi;
