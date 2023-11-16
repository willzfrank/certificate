import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'app/constants';
import { PAGESIZE } from 'app/utils/constants';
import {
  RootState,
  CourseResponse,
  SingleCourseDetailsResponse,
  GetAssessmentDetailsResponse,
  ModuleContentResponse,
  GetAsssessmentResultsResponse,
  GetNotesResponse,
  Note,
  GetDiscussionResponse,
  DiscussionComment,
  ApiError,
  GetCourseReviewsResponse,
  ModuleContentTypes,
  CourseApprovalStatus,
  ExternalCourse,
} from 'app/types';
import { HYDRATE } from 'next-redux-wrapper';
import { DragAndDropElemId } from 'app/components/dnd/types';

interface GetCoursesRequest {
  page?: number;
  pageSize?: number;
}

interface InstructorCourseStatus {
  instructorId: string;
  page?: number;
  perPage?: number;
}

interface Search extends GetCoursesRequest {
  query: string;
}

/**
 * In this API, we do some courses-related stuff. Any course-related stuff that doesn't
 * required been authenticated is handled via this api
 *
 * Things like getting the list of courses, gettting the details of a course and previewing the course, etc
 *
 *
 * IGNORE THIS COMMENT: Some course related stuff that requires authentication are handled in this API
 */

const courseApi = createApi({
  reducerPath: 'courseApi',

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL + '/courses',
    prepareHeaders: (headers, { getState }) => {
      const {
        user: { token },
      } = getState() as RootState;
      headers.set('Authorization', `Bearer ${token}`);

      return headers;
    },
  }),

  tagTypes: [
    'MODULECONTENT',
    'NOTES',
    'DISCUSSION_COMMENTS',
    'DISCUSSION_COMMENT_REPLIES',
    'INSTRUCTOR_COURSES',
  ],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },

  endpoints: (build) => ({
    getCourses: build.query<CourseResponse, GetCoursesRequest>({
      query: (config) => {
        const { page, pageSize } = {
          page: 1,
          pageSize: PAGESIZE,
          ...config,
        };
        return {
          url: `/list-all-courses?page=${page}&perPage=${pageSize}`,
        };
      },
      // providesTags: (result, error, id) => [{ type: 'COURSE' }],
    }),
    getFilteredCourses: build.query<CourseResponse, GetCoursesRequest>({
      query: ({ page = 1, pageSize = PAGESIZE, ...params }) => {
        Object.keys(params).forEach((key) => {
          if (params[key as keyof typeof params] === '') {
            delete params[key as keyof typeof params];
          }
        });

        return {
          url: `/filter-courses`,
          params: {
            Page: page,
            PerPage: pageSize,
            ...params,
          },
        };
      },
    }),
    searchCourses: build.query<CourseResponse, Search>({
      query: ({ page = 1, pageSize = PAGESIZE, query }) => {
        return {
          url: `/search`,
          params: {
            Page: page,
            PerPage: pageSize,
            query,
          },
        };
      },
    }),

    getSingleCoursePreview: build.query<
      ExternalCourse,
      { courseId: string; token?: string }
    >({
      query: ({ courseId, token }) => ({
        url: `/get-course-details?courseId=${courseId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (res: { data: ExternalCourse; error: Array<any> }) =>
        res.data,
    }),
    getAllModulesOfCourse: build.query<
      ExternalCourse,
      { courseId: string; token?: string }
    >({
      query: ({ courseId, token }) => ({
        url: `/${courseId}/modules/get-all-modules`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      transformResponse: (res: { data: ExternalCourse; error: Array<any> }) =>
        res.data,
    }),
    getAssessmentDetails: build.query<
      GetAssessmentDetailsResponse,
      {
        courseId: string;
        moduleId: string;
        assessmentId: string;
        studentId: string;
      }
    >({
      query: (args) => ({
        url: `/${args.courseId}/modules/${args.moduleId}/get-assessment-questions-to-be-taken`,
        params: {
          studentId: args.studentId,
          moduleAssessmentId: args.assessmentId,
        },
      }),
    }),
    getAssessmentResult: build.query<
      GetAsssessmentResultsResponse,
      {
        courseId: string;
        moduleId: string;
        studentId: string;
        assessmentGradeId: string;
      }
    >({
      query: (args) => ({
        url: `/${args.courseId}/modules/${args.moduleId}/get-assessment-result`,
        params: {
          assessmentGradeId: args.assessmentGradeId,
          studentId: args.studentId,
        },
      }),
    }),
    getModuleContent: build.query<
      ModuleContentResponse,
      { courseId: string; moduleId: string }
    >({
      query: (args) => ({
        url: `/${args.courseId}/modules/get-module-content?moduleId=${args.moduleId}`,
      }),
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
    getInstructorCourse: build.query<
      CourseResponse,
      {
        instructorId: string;
        exemptedCourseId: string;
        page: number;
        perPage: number;
      }
    >({
      query: (args) => ({
        url: `/list-by-instructor`,
        params: {
          instructorId: args.instructorId,
          withExceptionOf: args.exemptedCourseId,
          page: args.page || 1,
          perPage: args.perPage || 10,
        },
      }),
    }),
    getInstructorCourseStatus: build.query<
      CourseResponse,
      InstructorCourseStatus
    >({
      query: (args) => ({
        url: `/list-instructor-courses-with-status?instructorId=${args.instructorId}`,

        params: {
          Page: args.page || 1,
          PerPage: args.perPage || 10,
          instructorId: args.instructorId,
        },
      }),
      providesTags: ['INSTRUCTOR_COURSES'],
    }),
    deleteCourse: build.mutation<unknown, string>({
      query: (courseId) => ({
        url: '/toggle-course',
        params: { courseId },
        method: 'PATCH',
      }),
      invalidatesTags: ['INSTRUCTOR_COURSES'],
    }),
    moveCourseToDraft: build.mutation<any, string>({
      query: (courseId) => ({
        url: '/set-approval',
        params: { courseId, approvalStatus: CourseApprovalStatus.Draft },
        method: 'POST',
      }),
      invalidatesTags: ['INSTRUCTOR_COURSES'],
    }),
    getStudentsNotesPerVideo: build.query<
      GetNotesResponse,
      { studentId: string; videoId: string; page?: number; perPage?: number }
    >({
      query: (args) => ({
        url: `${API_URL}/studentnotes/get-student-notes-per-video`,
        params: {
          studentId: args.studentId,
          moduleVideoId: args.videoId,
          page: args.page || 1,
          perPage: args.perPage || 10,
        },
      }),
      providesTags: (res, error, args) => [{ type: 'NOTES', id: args.videoId }],
    }),
    addStudentNote: build.mutation<
      { data: Note; errors: Array<any> },
      { studentId: string; moduleVideoId: string; text: string }
    >({
      query(args) {
        return {
          url: `${API_URL}/studentnotes/add-student-note`,
          body: {
            studentId: args.studentId,
            moduleVideoid: args.moduleVideoId,
            text: args.text,
          },
          method: 'POST',
        };
      },
      invalidatesTags: (res, error, args) => [
        { type: 'NOTES', id: args.moduleVideoId },
      ],
    }),

    editStudentNote: build.mutation<
      { data: Note; errors: Array<any> },
      { noteId: string; text: string; moduleVideoId: string }
    >({
      query(args) {
        return {
          url: `${API_URL}/studentnotes/edit-student-note`,
          params: {
            noteId: args.noteId,
          },
          body: {
            text: args.text,
          },
          method: 'PATCH',
        };
      },
      invalidatesTags: (res, error, args) => [
        { type: 'NOTES', id: args.moduleVideoId },
      ],
    }),

    deleteStudentNote: build.mutation<
      void,
      { noteId: string; moduleVideoId: string }
    >({
      query: (args) => ({
        url: `${API_URL}/studentnotes/delete-student-note`,
        params: {
          noteId: args.noteId,
        },
        method: 'DELETE',
      }),
      invalidatesTags: (res, error, args) => [
        { type: 'NOTES', id: args.moduleVideoId },
      ],
    }),

    getCourseDiscussionComments: build.query<
      GetDiscussionResponse,
      { courseId: string; page: number; perPage: number }
    >({
      query: (args) => ({
        url: `${API_URL}/discussionforums/get-comments-by-course`,
        params: args,
      }),
      providesTags: (res, error, args) => [
        { type: 'DISCUSSION_COMMENTS', id: args.courseId },
      ],
    }),

    addDiscussionComment: build.mutation<
      { data: DiscussionComment; errors: ApiError },
      { courseId: string; userId: string; commentText: string }
    >({
      query: (args) => ({
        url: `${API_URL}/discussionforums/send-message`,
        body: {
          courseId: args.courseId,
          userId: args.userId,
          text: args.commentText,
        },
        method: 'POST',
      }),
      invalidatesTags: (res, error, args) => [
        { type: 'DISCUSSION_COMMENTS', id: args.courseId },
      ],
    }),

    getCommentReplies: build.query<
      GetDiscussionResponse,
      { commentId: string; page: number; perPage: number }
    >({
      query: (args) => ({
        url: `${API_URL}/discussionforums/get-replies-to-comments`,
        params: args,
      }),
      providesTags: (res, error, args) => [
        { type: 'DISCUSSION_COMMENT_REPLIES', id: args.commentId },
      ],
    }),

    addCommentReply: build.mutation<
      DiscussionComment,
      {
        courseId: string;
        userId: string;
        replyText: string;
        parentMessageId: string;
      }
    >({
      query: (args) => ({
        url: `${API_URL}/discussionforums/send-reply-to-message`,
        body: {
          ...args,
          text: args.replyText,
        },
        method: 'POST',
      }),
      invalidatesTags: (res, error, args) => [
        { type: 'DISCUSSION_COMMENT_REPLIES', id: args.parentMessageId },
      ],
    }),

    markCourseAsCompleted: build.mutation<
      { data: string; errors: ApiError[] },
      string
    >({
      query: (courseId) => ({
        url: '/mark-as-completed',
        params: { courseId },
        method: 'PUT',
      }),
    }),

    getCourseReviews: build.query<
      GetCourseReviewsResponse,
      { courseId: string; page: number; perPage: number }
    >({
      query: (args) => ({
        url: '/get-ratings',
        params: args,
      }),
    }),

    sortModule: build.mutation<
      void,
      [
        {
          moduleId: string;
          newPosition: number;
          oldPosition: number;
        },
        {
          moduleId: string;
          newPosition: number;
          oldPosition: number;
        }
      ]
    >({
      query: (args) => ({
        url: '/sort-module',
        method: 'PATCH',
        body: args,
      }),
    }),

    sortModuleContent: build.mutation<
      void,
      {
        moduleId: string;
        pair: [
          {
            contentId: DragAndDropElemId;
            contentType: ModuleContentTypes;
          },
          {
            contentId: DragAndDropElemId;
            contentType: ModuleContentTypes;
          }
        ];
        positions: [number, number];
      }
    >({
      query: (args) => ({
        url: '/sort-module-content',
        method: 'PATCH',
        params: {
          moduleId: args.moduleId,
        },
        body: args.pair.map((_pos, _idx) => ({
          contentId: _pos.contentId,
          contentType: _pos.contentType,
          oldPosition: args.positions[_idx],
          newPosition: args.positions[(_idx + 1) % 2],
        })),
      }),
    }),
    getAllModules: build.query<any, { courseId: string }>({
      query: (args) => ({
        url: `/${args.courseId}/Modules/get-all-modules`,
        method: 'GET',
        headers: {
          accept: 'text/plain',
        },
      }),
    }),
  }),
});

export default courseApi;

export const {
  useGetAllModulesQuery,
  useGetCoursesQuery,
  useGetSingleCoursePreviewQuery,
  useGetAllModulesOfCourseQuery,
  useLazyGetSingleCoursePreviewQuery,
  useLazyGetAssessmentDetailsQuery,
  useGetModuleContentQuery,
  useGetInstructorCourseQuery,
  useSearchCoursesQuery,
  useGetStudentsNotesPerVideoQuery,
  useAddStudentNoteMutation,
  useEditStudentNoteMutation,
  useDeleteStudentNoteMutation,
  useLazyGetAssessmentResultQuery,
  useGetInstructorCourseStatusQuery,
  useMarkCourseAsCompletedMutation,
  useSortModuleContentMutation,
  useSortModuleMutation,
  useMoveCourseToDraftMutation,
  useDeleteCourseMutation,

  // Discussion
  useGetCourseDiscussionCommentsQuery,
  useAddDiscussionCommentMutation,
  useGetCommentRepliesQuery,
  useLazyGetCommentRepliesQuery,
  useAddCommentReplyMutation,

  // course reviews
  useGetCourseReviewsQuery,
} = courseApi;
