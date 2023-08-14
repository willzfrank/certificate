import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "app/constants";
import {
  RegisterResponse,
  USER,
  Profession,
  ProfessionsResponse,
  RootState,
  UpdateInstructorResponse,
  GetUserNotificationsResponse,
  ApiError,
} from "app/types";

export interface GetUserBody {
  id: string;
  isInstructor: boolean;
}

export interface UpdateStudentBody {
  studentId: string;
  firstName: string;
  lastName: string;
}

export interface UpdateInstructorBody {
  instructorId: string;
  firstName: string;
  lastName: string;
  instructorLevel?: string;
  userName: string;
  bio: string;
}

export interface UpdateStudentImage {
  studentId: string;
  imageFile: File | FormData;
}

export interface UpdateInstructorImage {
  instructorId: string;
  imageFile: File | FormData;
}

export interface UpdateInstructorProfessions {
  instructorId: string;
  professionIds: string[];
}

export const getUserFromResponse = (res: RegisterResponse): USER => {
  return {
    id: res.id,
    lastName: res.lastName,
    firstName: res.firstName,
    email: res.email,
    profilePictureUrl: res.profilePictureUrl || "",
    roleName: res.roleName,
    dateOfBirth: res.dateOfBirth,
    dateCreated: res.dateCreated,
    professions: res.professions || [],
  };
};

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).user.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ["USER"],
  endpoints: (builder) => {
    return {
      getUserById: builder.query<RegisterResponse, GetUserBody>({
        query: (arg) => ({
          url: `${
            arg.isInstructor
              ? `/Instructors/get-instructor-by-id?instructorId=${arg.id}`
              : `/Students/get-student-by-id?studentId=${arg.id}`
          }`,
        }),
        providesTags: (result, error, id) => [{ type: "USER" }],
        transformResponse: (response: {
          data: RegisterResponse;
          error: any;
        }) => {
          if (response.error) {
            return response.error;
          }
          return response.data;
        },
      }),
      updateStudentProfile: builder.mutation<
        RegisterResponse,
        UpdateStudentBody
      >({
        query: (args) => ({
          url: `/Students/update-student-profile?studentId=${args.studentId}`,
          body: args,
          method: "PUT",
        }),
        invalidatesTags: (res, error, args) => ["USER"],
        transformResponse: (response: {
          data: RegisterResponse;
          error: any;
        }) => {
          if (response.error) {
            return response.error;
          }
          return response.data;
        },
      }),
      updateStudentPicture: builder.mutation<
        RegisterResponse,
        UpdateStudentImage
      >({
        query: (args) => {
          return {
            url: `/Students/set-profile-picture?studentId=${args.studentId}`,
            body: args.imageFile,
            method: "PUT",
          };
        },
        invalidatesTags: (res, error, args) => ["USER"],
        transformResponse: (response: {
          data: RegisterResponse;
          error: any;
        }) => {
          if (response.error) {
            return response.error;
          }
          return response.data;
        },
      }),
      updateInstructorProfile: builder.mutation<
        UpdateInstructorResponse,
        UpdateInstructorBody
      >({
        query: (args) => ({
          url: `/Instructors/update-instructor-profile?instructorId=${args.instructorId}`,
          body: args,
          method: "PUT",
        }),
        invalidatesTags: (res, error, args) => ["USER"],
        transformResponse: (response: {
          data: UpdateInstructorResponse;
          error: any;
        }) => {
          if (response.error) {
            return response.error;
          }
          return response.data;
        },
      }),
      updateInstructorPicture: builder.mutation<
        UpdateInstructorResponse,
        UpdateInstructorImage
      >({
        query: (args) => {
          return {
            url: `/Instructors/set-profile-picture?instructorId=${args.instructorId}`,
            body: args.imageFile,
            method: "PUT",
          };
        },
        invalidatesTags: (res, error, args) => ["USER"],
        transformResponse: (response: {
          data: UpdateInstructorResponse;
          error: any;
        }) => {
          if (response.error) {
            return response.error;
          }
          return response.data;
        },
      }),
      addIntructorProfessions: builder.mutation<
        any,
        UpdateInstructorProfessions
      >({
        query: (args) => ({
          url: `${API_URL}/Instructors/add-instructor-professions`,
          body: args,
          method: "PUT",
        }),
      }),
      removeIntructorProfessions: builder.mutation<
        any,
        UpdateInstructorProfessions
      >({
        query: (args) => ({
          url: `${API_URL}/Instructors/remove-instructor-professions`,
          body: args,
          method: "PUT",
        }),
      }),

      getUserNotifications: builder.query<
        GetUserNotificationsResponse,
        { userId: string; page: number; perPage: number; token?: string }
      >({
        query: ({ token, ...args }) => ({
          url: `${API_URL}/notifications/get-user-notifications`,
          params: args,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      }),

      updateUserPassword: builder.mutation<
        { data: any; errors: Array<ApiError> },
        {
          isInstructor: boolean;
          userId: string;
          oldPassword: string;
          newPassword: string;
        }
      >({
        query: (args) => ({
          url: args.isInstructor
            ? `/Instructors/change-instructor-password?instructorId=${args.userId}`
            : `/Students/change-student-password?studentId=${args.userId}`,
          body: {
            oldPassword: args.oldPassword,
            newPassword: args.newPassword,
          },
          method: "PATCH",
        }),
      }),
    };
  },
});

const professionsApi = createApi({
  reducerPath: "professionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders(headers, { getState }) {
      const token = (getState() as RootState).user.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["PROFESSIONS"],
  endpoints: (builder) => {
    return {
      getProfessions: builder.query<ProfessionsResponse, void>({
        query: () => ({
          url: "/Professions/list-all-professions",
        }),
        transformResponse: (response: { data: Profession[]; error: any }) => {
          if (response.error) {
            return response.error;
          }
          return response.data;
        },
      }),
    };
  },
});

export const {
  useLazyGetUserByIdQuery,
  useGetUserByIdQuery,
  useUpdateStudentPictureMutation,
  useUpdateStudentProfileMutation,
  useUpdateInstructorPictureMutation,
  useUpdateInstructorProfileMutation,

  useAddIntructorProfessionsMutation,
  useRemoveIntructorProfessionsMutation,

  useUpdateUserPasswordMutation,

  // notifications
  useGetUserNotificationsQuery,
} = userApi;

export const { useGetProfessionsQuery } = professionsApi;

export { professionsApi, userApi };
