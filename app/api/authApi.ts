import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "app/constants";
import { RegisterResponse, LoginResponse, USERTYPES } from "app/types";

export interface RegisterBody {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userType: USERTYPES,
    userGroupId?: string
}

export interface LoginBody {
    userName: string,
    password: string
    userType: USERTYPES
}

/**
 * This API is where we do everything relating to authentication,
 * from logging in to registering a new user and also verrification of
 * user's email and resetting of password.
 */
const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['AUTH'],
    endpoints: (builder) => {
        return {
            register: builder.mutation<RegisterResponse, RegisterBody>({
                query: (arg) => ({
                    url: `${arg.userType === USERTYPES.INSTRUCTOR ? '/Instructors' : '/Students'}/create-${arg.userType === USERTYPES.INSTRUCTOR ? 'instructor' : 'student'}-account/`,
                    method: 'POST',
                    body: arg,
                }),
                invalidatesTags: ['AUTH'],
                transformResponse: (response: { data: RegisterResponse, error: any }) => {
                    if (response.error) {
                        return response.error
                    } return response.data
                },
            }),
            login: builder.mutation<LoginResponse, LoginBody>({
                query: (arg) => ({
                    url: `/auth/${arg.userType.toLowerCase()}-login`,
                    method: 'POST',
                    body: arg,
                })
            }),
            verifyEmail: builder.query<void, { confirmationToken: string, emailAddress: string }>({
                query: (arg) => ({
                    url: `/auth/confirm-email`,
                    params: arg
                }),
            }),
            requestPasswordReset: builder.mutation<{ data: any, errors: any[] }, string>({
                query: (email) => ({
                    url: '/auth/request-password-reset',
                    params: { email },
                    method: 'POST'
                })
            }),
            completePasswordReset: builder.query<void, { confirmationToken: string, email: string, newPassword: string }>({
                query(args) {
                    return {
                        url: '/auth/complete-password-reset',
                        params: {
                            email: args.email,
                            resetToken: args.confirmationToken,
                            newPassword: args.newPassword
                        },
                    }
                },
            })
        }
    }
})

export const {
    useRegisterMutation,
    useLoginMutation,
    useLazyVerifyEmailQuery,
    useRequestPasswordResetMutation,
    useLazyCompletePasswordResetQuery
} = authApi;

export default authApi;