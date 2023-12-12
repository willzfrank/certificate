import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { API_URL } from 'app/constants';
import {
  ApiError,
  BoxWithAppropriateOptionFormvalues,
  ClickForMoreExplanationFormValues,
  CourseModules,
  InteractiveTypes,
  ModuleContentResponse,
  QuestionFormValues,
  QuestionOptionType,
  RootState,
  ExternalCourse,
} from 'app/types';
import { camelCase } from 'app/utils';

interface CreateAssesssmentRequest {
  name: string;
  courseId: string;
  moduleId: string;
  questions: Array<QuestionFormValues>;
}

type InteractiveTypesBody = {
  question: string;
  optionOne: string;
  optionTwo: string;
  optionThree: string;
  optionFour: string;
  correctOption: QuestionOptionType;
  moduleId: string;
};

interface SelectAnAnswerBody extends InteractiveTypesBody { }

interface SelectAllThatApplyBody
  extends Omit<InteractiveTypesBody, 'correctOption'> {
  title: string;
  answers: string[];
}

export interface FillInTheBlankBody
  extends Omit<InteractiveTypesBody, 'correctOption'> {
  title: string;
  answers: Array<{
    blankSection: string;
    correctOption: QuestionOptionType;
  }>;
}

type ThisOrThatFormBody = Omit<
  InteractiveTypesBody,
  'optionThree' | 'optionFour' | 'question'
> & {
  title: string;
  correctOption: Omit<QuestionOptionType, 'OptionThree' | 'OptionFour'>;
  cardDetails: {
    type: string;
    fileToUpload: FileList;
    contentText: string;
  };
};

interface ClickAndMatchBody {
  moduleId: string;
  title: string;
  statements: Array<{
    statement: string;
    statementMatch: string;
  }>;
}

type EditClickForMoreExplanationBody = ClickForMoreExplanationFormValues & {
  typeId: string;
  buttons: Array<
    ClickForMoreExplanationFormValues['buttons'][number] & { id: string }
  >;
};

const courseCreationApi = createApi({
  reducerPath: 'courseCreationApi',
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

  tagTypes: ['MODULECONTENT', 'CREATEDCOURSE'],

  endpoints: (build) => ({
    getSingleCoursePreview: build.query<ExternalCourse, { courseId: string }>({
      query: ({ courseId }) => `/get-course-details?courseId=${courseId}`,
      transformResponse: (res: { data: ExternalCourse; error: Array<any> }) =>
        res.data,
      providesTags: (res, err, args) =>
        res ? [{ type: 'CREATEDCOURSE', id: res.id }] : ['CREATEDCOURSE'],
    }),

    createNewCourse_CourseInfo: build.mutation<
      any,
      {
        instructorId: string;
        targetAudience: string;
        courseName: string;
        courseDescription: string;
        categoryIds: string[];
        isExternal: boolean;
        redirectURL?: string;
        certificateRequired?: boolean;
        price?: number;
        subTitle: string
      }
    >({
      query: (argz) => ({
        url: '/create-course',
        method: 'POST',
        body: {
          instructorIds: [argz.instructorId],
          intendedUsers: argz.targetAudience,
          price: argz.price,
          categoryIds: argz.categoryIds,
          name: argz.courseName,
          description: argz.courseDescription,
          isExternal: argz.isExternal || false,
          certificateRequired: argz.certificateRequired,
          [argz.isExternal ? 'redirectUrl' : '']: argz.redirectURL,
          subTitle: argz.subTitle || ''
        },
      }),
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'CREATEDCOURSE', id: res.data }] : ['CREATEDCOURSE'],
    }),

    createNewCourse__UploadPreviewMedia: build.mutation<
      { data: ExternalCourse; errors: ApiError[] },
      { courseId: string; formData: FormData }
    >({
      query: (args) => ({
        url: `/set-image-and-video?courseId=${args.courseId}`,
        method: 'PATCH',
        body: args.formData,
      }),
      invalidatesTags: (res, error, args) =>
        res
          ? [{ type: 'CREATEDCOURSE', id: args.courseId }]
          : ['CREATEDCOURSE'],
    }),

    createNewCourse__GenerateModules: build.mutation<
      { data: Array<CourseModules>; errors: Array<any> },
      { courseId: string; quantityToGenerate: number }
    >({
      query: (args) => ({
        url: `/${args.courseId}/modules/generate-modules?quantityToGenerate=${args.quantityToGenerate}`,
        method: 'PUT',
      }),
      invalidatesTags: (res, err, args) => [
        { type: 'CREATEDCOURSE', id: args.courseId },
      ],
      transformResponse: (res: any) => {
        return {
          data: res.data.map(({ id, ...moduleDetails }: any) => ({
            moduleId: id,
            ...moduleDetails,
          })),
          errors: res.errors || [],
        };
      },
    }),

    createNewCourse__AddVideoToModule: build.mutation<
      any,
      { courseId: string; moduleId: string; formData: FormData }
    >({
      query: (args) => ({
        url: `/${args.courseId}/modules/add-video-to-module?moduleId=${args.moduleId}`,
        method: 'PUT',
        body: args.formData,
      }),
      invalidatesTags: (result, error, args) =>
        result
          ? [{ type: 'MODULECONTENT' as const, id: args.moduleId }]
          : [{ type: 'MODULECONTENT' as const, id: 'LIST' }],
    }), createNewCourse__AddYoutubeVideoToModule: build.mutation<
      any,
      { courseId: string; moduleId: string; formData: FormData }
    >({
      query: (args) => ({
        url: `/${args.courseId}/modules/add-video-to-module?moduleId=${args.moduleId}`,
        method: 'PUT',
        body: args.formData,
      }),
      invalidatesTags: (result, error, args) =>
        result
          ? [{ type: 'MODULECONTENT' as const, id: args.moduleId }]
          : [{ type: 'MODULECONTENT' as const, id: 'LIST' }],
    }),

    editModuleVideo: build.mutation<
      { data: string; errors: Array<ApiError> },
      {
        courseId: string;
        videoId: string;
        name: string;
        description: string;
        numberOfSeconds: string;
        formData: FormData;
        moduleId: string;
      }
    >({
      query: (args) => ({
        url: `/change-module-video`,
        method: 'PATCH',
        params: {
          courseId: args.courseId,
          moduleVideoId: args.videoId,
          name: args.name,
          description: args.description,
          numberOfSeconds: args.numberOfSeconds,
        },
        body: args.formData,
      }),
      invalidatesTags: (result, error, args) =>
        result
          ? [{ type: 'MODULECONTENT' as const, id: args.moduleId }]
          : [{ type: 'MODULECONTENT' as const, id: 'LIST' }],
    }),

    setCoursePricing: build.mutation<any, { courseId: string; pricing: any }>({
      query: ({ courseId, pricing }) => ({
        url: `/${courseId}/set-pricings`,
        method: 'POST',
        body: pricing,
      }),
      invalidatesTags: (result, error, args) =>
        result
          ? [{ type: 'MODULECONTENT' as const, id: args.courseId }]
          : [{ type: 'MODULECONTENT' as const, id: 'LIST' }],
    }),

    createNewCourse__RemoveVideoFromModule: build.mutation<
      void,
      { courseId: string; videoId: string; moduleId: string }
    >({
      query: (args) => ({
        url: `/${args.courseId}/modules/remove-video-from-module`,
        params: {
          moduleVideoId: args.videoId,
        },
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, args) =>
        result
          ? [{ type: 'MODULECONTENT' as const, id: args.moduleId }]
          : [{ type: 'MODULECONTENT' as const, id: 'LIST' }],
    }),

    createNewCourse__AddAssessmentToModule: build.mutation<
      any,
      CreateAssesssmentRequest
    >({
      query: (args) => ({
        url: `/${args.courseId}/modules/add-assessment-questions`,
        params: {
          moduleId: args.moduleId,
          name: args.name,
        },
        body: args.questions,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, args) =>
        result
          ? [{ type: 'MODULECONTENT' as const, id: args.moduleId }]
          : [{ type: 'MODULECONTENT' as const, id: 'LIST' }],
    }),

    createNewCourse__AddDocumentToModule: build.mutation<
      any,
      { courseId: string; moduleId: string; formData: FormData }
    >({
      query: (args) => ({
        url: `/${args.courseId}/modules/add-document-to-module`,
        body: args.formData,
        method: 'PUT',
        params: {
          moduleId: args.moduleId,
        },
      }),
      invalidatesTags: (result, error, args) =>
        result
          ? [{ type: 'MODULECONTENT' as const, id: args.moduleId }]
          : [{ type: 'MODULECONTENT' as const, id: 'LIST' }],
    }),

    createNewCourse__RemoveDocumentFromModule: build.mutation<
      any,
      { courseId: string; moduleDocumentId: string; moduleId: string }
    >({
      query: (args) => ({
        url: `/${args.courseId}/modules/remove-document-from-module`,
        params: { moduleDocumentId: args.moduleDocumentId },
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, args) =>
        result
          ? [{ type: 'MODULECONTENT' as const, id: args.moduleId }]
          : [{ type: 'MODULECONTENT' as const, id: 'LIST' }],
    }),

    editModuleDocument: build.mutation<
      { data: string; errors: Array<ApiError> },
      {
        courseId: string;
        moduleDocumentId: string;
        documentName: string;
        documentDescription: string;
        formData: FormData;
        moduleId: string;
      }
    >({
      query: (args) => ({
        url: '/change-module-document',
        params: {
          courseId: args.courseId,
          moduleDocumentId: args.moduleDocumentId,
          name: args.documentName,
          description: args.documentDescription,
        },
        body: args.formData,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, args) =>
        result
          ? [{ type: 'MODULECONTENT' as const, id: args.moduleId }]
          : [{ type: 'MODULECONTENT' as const, id: 'LIST' }],
    }),

    addInteractiveType__SelectAnAnswer: build.mutation<
      void,
      SelectAnAnswerBody
    >({
      query: (body) => ({
        url: '/add-select-as-answer-interactive-type',
        body,
        method: 'POST',
      }),
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args.moduleId }] : [],
    }),

    addInteractiveType__SelectAllThatApply: build.mutation<
      void,
      SelectAllThatApplyBody
    >({
      query: (body) => ({
        url: '/add-select-all-that-apply-interactive-type',
        body,
        method: 'POST',
      }),
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args.moduleId }] : [],
    }),

    addInteractiveType__FillInTheBlanks: build.mutation<
      void,
      FillInTheBlankBody
    >({
      query: (body) => ({
        url: '/add-fill-in-the-blanks-interactive-type',
        body,
        method: 'POST',
      }),
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args.moduleId }] : [],
    }),

    addInteractiveType__ThisOrThat: build.mutation<void, ThisOrThatFormBody[]>({
      query: (args) => {
        const formData = new FormData();

        args.forEach((value, index) => {
          formData.append(`models[${index}].moduleId`, value.moduleId);
          formData.append(`models[${index}].title`, value.title);
          formData.append(`models[${index}].optionOne`, value.optionOne);
          formData.append(`models[${index}].optionTwo`, value.optionTwo);
          formData.append(
            `models[${index}].correctOption`,
            value.correctOption
          );
          formData.append(
            `models[${index}].cardDetails.cardType`,
            value.cardDetails.type.charAt(0).toUpperCase() +
            value.cardDetails.type.slice(1, value.cardDetails.type.length)
          );
          formData.append(
            `models[${index}].cardDetails.contentText`,
            value.cardDetails.contentText
          );
          formData.append(
            `models[${index}].cardDetails.fileToUpload`,
            value.cardDetails.fileToUpload[0]
          );
        });

        // const data = args.map(value => ({
        //     moduleId: value.moduleId,
        //     title: value.title,
        //     optionOne: value.optionOne,
        //     optionTwo: value.optionTwo,
        //     correctOption: value.correctOption,
        //     cardDetails: {
        //         cardType: value.cardDetails.type.charAt(0).toUpperCase + value.cardDetails.type.slice(1, value.cardDetails.type.length),
        //         fileToUpload: value.cardDetails.fileToUpload[0],
        //         contentText: value.cardDetails.contentText,
        //     }
        // }))

        // formData.append('models', );

        return {
          url: '/add-this-or-that-interactive-type',
          body: formData,
          method: 'POST',
        };
      },
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args[0].moduleId }] : [],
    }),

    deleteInteractiveType: build.mutation<
      { data: string; errors: Array<ApiError> },
      {
        moduleId: string;
        interactiveTypeId: string;
        interactiveTypeName: InteractiveTypes;
      }
    >({
      query: (args) => ({
        url: '/toggle-interactive-type',
        body: {
          interactiveTypeId: args.interactiveTypeId,
          interactiveTypeName: args.interactiveTypeName,
        },
        method: 'PATCH',
      }),
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args.moduleId }] : [],
    }),

    deleteAssessment: build.mutation<
      void,
      { moduleId: string; assessmentModuleId: string }
    >({
      query: (args) => ({
        url: '/toggle-assessment',
        params: {
          moduleAssessmentId: args.assessmentModuleId,
        },
        method: 'PATCH',
      }),
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args.moduleId }] : [],
    }),

    addInteractiveType__ClickAndMatch: build.mutation<void, ClickAndMatchBody>({
      query: (body) => ({
        url: '/add-click-and-match-interactive-type',
        body,
        method: 'POST',
      }),
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args.moduleId }] : [],
    }),

    getModuleContent: build.query<
      ModuleContentResponse,
      { courseId: string; moduleId: string }
    >({
      query: (args) => ({
        url: `/${args.courseId}/modules/get-module-content-unrestricted?moduleId=${args.moduleId}`,
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
            documents: res.data.documents,
            selectAnswerInteractiveTypes: res.data.selectAnswerInteractiveTypes,
            clickAndMatchInteractiveTypes:
              res.data.clickAndMatchInteractiveTypes,
            fillInTheBlanksInteractiveTypes:
              res.data.fillInTheBlanksInteractiveTypes,
            selectAllThatApplyInteractiveTypes:
              res.data.allThatApplyInteractiveTypes,
            thisOrThatInteractiveTypes: res.data.thisOrThatInteractiveTypes,
            clickForMoreInteractiveTypes:
              res.data.clickForMoreInteractiveTypes || [],
            boxWithOptionsInteractiveTypes:
              res.data.boxWithOptionsInteractiveTypes || [],
          },
          error: res.error,
        };
      },
    }),

    updateModule: build.mutation<
      { data: any; errors: any },
      {
        courseId: string;
        moduleDetails: {
          id: string;
          name: string;
          description: string;
          isExtra: boolean;
          paymentRequired: boolean
        };
      }
    >({
      query: (args) => ({
        url: `/${args.courseId}/modules/edit-module`,
        method: 'PATCH',
        body: {
          name: args.moduleDetails.name,
          description: args.moduleDetails.description,
          isExtra: args.moduleDetails.isExtra,
          paymentRequired: args.moduleDetails.paymentRequired
        },
        params: {
          moduleId: args.moduleDetails.id,
        },
      }),
    }),

    deleteModule: build.mutation<
      { data: any[]; errors: any[] },
      { moduleId: string; courseId: string }
    >({
      query: (args) => ({
        url: `/${args.courseId}/modules/delete-module`,
        method: 'DELETE',
        params: {
          moduleId: args.moduleId,
        },
      }),
    }),

    submitForReview: build.mutation<
      { data: ExternalCourse; errors: ApiError[] },
      string
    >({
      query: (courseId) => ({
        url: '/submit-course-for-review',
        method: 'PATCH',
        params: { courseId },
      }),
    }),

    editCourseDetails: build.mutation<
      { data: ExternalCourse; error: ApiError[] },
      {
        name?: string;
        description?: string;
        subTitle?: string;
        intendedUsers?: string;
        courseId?: string;
        certificateRequired?: boolean;
        price?: number
      }
    >({
      query: (args) => ({
        url: '/edit-course-details',
        params: {
          courseId: args.courseId,
        },
        body: args,
        method: 'PATCH',
      }),
    }),

    editSelectAnAnswerInteractiveType: build.mutation<
      any,
      {
        typeId: string;
        question: string;
        optionOne: string;
        optionTwo: string;
        optionThree: string;
        optionFour: string;
        correctOption: QuestionOptionType;
        moduleId: string;
      }
    >({
      query: ({ typeId, ...body }) => ({
        url: '/edit-select-as-answer-interactive-type',
        method: 'PATCH',
        body,
        params: { typeId },
      }),
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args.moduleId }] : [],
    }),

    editAllThatApplyInteractiveType: build.mutation<
      any,
      {
        typeId: string;
        title: string;
        question: string;
        optionOne: string;
        optionTwo: string;
        optionThree: string;
        optionFour: string;
        answers: Array<QuestionOptionType>;
        moduleId: string;
      }
    >({
      query: ({ typeId, ...body }) => ({
        url: '/edit-select-all-that-apply-interactive-type',
        method: 'PATCH',
        body,
        params: { typeId },
      }),
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args.moduleId }] : [],
    }),

    editFillInTheBlanksInteractiveType: build.mutation<
      any,
      {
        typeId: string;
        title: string;
        question: string;
        optionOne: string;
        optionTwo: string;
        optionThree: string;
        optionFour: string;
        answers: Array<{
          id: string;
          blankSection: string;
          correctOption: QuestionOptionType;
        }>;
        moduleId: string;
      }
    >({
      query: ({ typeId, ...body }) => ({
        url: '/edit-fill-in-the-blanks-interactive-type',
        method: 'PATCH',
        body,
        params: { typeId },
      }),
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args.moduleId }] : [],
    }),

    editClickAndMatchInteractiveType: build.mutation<
      any,
      {
        typeId: string;
        title: string;
        statements: Array<{
          id: string;
          statement: string;
          statementMatch: string;
        }>;
        moduleId: string;
      }
    >({
      query: ({ typeId, ...body }) => ({
        url: '/edit-click-and-match-interactive-type',
        method: 'PATCH',
        body,
        params: { typeId },
      }),
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args.moduleId }] : [],
    }),

    editThisOrThatInteractiveType: build.mutation<
      any,
      {
        questions: Array<{
          typeId: string;
          moduleId: string;
          title: string;
          optionOne: string;
          optionTwo: string;
          correctOption: QuestionOptionType;
          cardDetails: {
            cardType: 'Image' | 'Text';
            fileToUpload?: FileList;
            contentText?: string;
          };
        }>;
        moduleId: string;
      }
    >({
      query: (args) => {
        const formData = new FormData();

        args.questions.forEach((value, index) => {
          formData.append(`models[${index}].moduleId`, value.moduleId);
          formData.append(`models[${index}].title`, value.title);
          formData.append(`models[${index}].optionOne`, value.optionOne);
          formData.append(`models[${index}].optionTwo`, value.optionTwo);
          formData.append(`models[${index}].typeId`, value.typeId);
          formData.append(
            `models[${index}].correctOption`,
            value.correctOption
          );
          formData.append(
            `models[${index}].cardDetails.cardType`,
            value.cardDetails.cardType
          );

          if (value.cardDetails.cardType === 'Image') {
            formData.append(
              `models[${index}].cardDetails.fileToUpload`,
              value.cardDetails.fileToUpload![0]
            );
          } else {
            formData.append(
              `models[${index}].cardDetails.contentText`,
              value.cardDetails.contentText as string
            );
          }
        });

        return {
          url: '/edit-this-or-that-interactive-type',
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args.moduleId }] : [],
    }),

    addInteractiveType__ClickForMoreExplanation: build.mutation<
      any,
      { moduleId: string } & ClickForMoreExplanationFormValues
    >({
      query: (args) => {
        const formData = new FormData();

        formData.append('ModuleId', args.moduleId);
        formData.append('Title', args.title);
        formData.append('Content', args.content);
        formData.append('ImageToUpload', args.image[0]);

        args.buttons.forEach((button, index) => {
          formData.append(`Buttons[${index}].buttonLabel`, button.label);
          formData.append(`Buttons[${index}].buttonContent`, button.content);
        });

        return {
          url: '/add-click-for-explanation-interactive-type',
          body: formData,
          method: 'POST',
        };
      },
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args.moduleId }] : [],
    }),

    editClickForMoreExplanationInteractiveType: build.mutation<
      any,
      EditClickForMoreExplanationBody
    >({
      query: (args) => {
        return {
          url: '/edit-click-for-more-interactive-type',
        };
      },
    }),

    addInteractiveType__BoxWithAppropriateOptions: build.mutation<
      void,
      { moduleId: string } & BoxWithAppropriateOptionFormvalues
    >({
      query: (args) => {
        const formData = new FormData();

        formData.append('ModuleId', args.moduleId);
        formData.append('Title', args.title);
        formData.append('Question', args.question);
        formData.append('ImageToUpload', args.image[0]);

        // for (let i = 0; i < args.boxes.length; i++) {
        //   formData.append(`BoxOptions[${i}].text`, args.boxes[i].value);
        //   // @ts-ignore
        //   formData.append(
        //     `BoxOptions[${i}].isTheAnswer`,
        //     args.boxes[i].isCorrect
        //   );
        // }

        for (let i = 0; i < args.boxes.length; i++) {
          formData.append(`BoxOptions[${i}].text`, args.boxes[i].value);
          formData.append(
            `BoxOptions[${i}].isTheAnswer`,
            String(args.boxes[i].isCorrect)
          );
        }
        return {
          url: '/add-box-with-options-interactive-type',
          body: formData,
          method: 'POST',
        };
      },
      invalidatesTags: (res, error, args) =>
        res ? [{ type: 'MODULECONTENT', id: args.moduleId }] : [],
    }),
  }),
});

export default courseCreationApi;


export const {
  useCreateNewCourse_CourseInfoMutation,
  useCreateNewCourse__GenerateModulesMutation,
  useCreateNewCourse__AddVideoToModuleMutation,
  useCreateNewCourse__AddYoutubeVideoToModuleMutation,
  useCreateNewCourse__RemoveVideoFromModuleMutation,
  useCreateNewCourse__AddAssessmentToModuleMutation,
  useCreateNewCourse__UploadPreviewMediaMutation,
  useCreateNewCourse__AddDocumentToModuleMutation,
  useCreateNewCourse__RemoveDocumentFromModuleMutation,
  useSetCoursePricingMutation,

  useGetModuleContentQuery,
  useLazyGetModuleContentQuery,
  useGetSingleCoursePreviewQuery: useGetCoursePreviewWhileCreatingQuery,
  useLazyGetSingleCoursePreviewQuery: useLazyGetCoursePreviewWhileCreatingQuery,
  useUpdateModuleMutation,
  useDeleteModuleMutation,
  useAddInteractiveType__ClickAndMatchMutation,
  useAddInteractiveType__FillInTheBlanksMutation,
  useAddInteractiveType__SelectAllThatApplyMutation,
  useAddInteractiveType__SelectAnAnswerMutation,
  useAddInteractiveType__ThisOrThatMutation,
  useAddInteractiveType__ClickForMoreExplanationMutation,
  useAddInteractiveType__BoxWithAppropriateOptionsMutation,
  useEditClickForMoreExplanationInteractiveTypeMutation,
  useDeleteAssessmentMutation,

  useSubmitForReviewMutation,

  // Module Content Editing
  useEditModuleVideoMutation,
  useEditCourseDetailsMutation,
  useEditModuleDocumentMutation,
  useDeleteInteractiveTypeMutation,
  useEditSelectAnAnswerInteractiveTypeMutation,
  useEditAllThatApplyInteractiveTypeMutation,
  useEditClickAndMatchInteractiveTypeMutation,
  useEditFillInTheBlanksInteractiveTypeMutation,
  useEditThisOrThatInteractiveTypeMutation,

  // Pricing Mutation
  // useSetCoursePricingMutation,
} = courseCreationApi;
