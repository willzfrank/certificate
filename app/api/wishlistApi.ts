import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "app/constants";
import { CourseResponse, RootState } from "app/types";


export interface WishListResponse {
    data: string,
    errors: any[]
}

export interface WishListBody {
    studentId: string;
    courseId: string;
}

export interface GetAllBody {
    studentId: string;
}


const wishlistApi = createApi({
    reducerPath: 'wishlistApi',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL, prepareHeaders: (headers, { getState }) => {

            const { user: { token } } = getState() as RootState;
            headers.set('Authorization', `Bearer ${token}`);
            return headers;
        }
    }),
    tagTypes: ['WISHLIST'],
    endpoints: (builder) => {
        return {
            getWishlist: builder.query<CourseResponse, GetAllBody>({
                query: (arg) => ({
                    url: `/Courses/get-courses-in-students-wishlist?studentId=${arg.studentId}&perPage=1000`,
                    method: 'GET',
                }),
                providesTags: (result, error, id) => [{ type: 'WISHLIST' }],
            }),
            add: builder.mutation<WishListResponse, WishListBody>({
                query: (arg) => ({
                    url: `/Courses/add-to-wishlist?studentId=${arg.studentId}&courseId=${arg.courseId}`,
                    method: 'POST',
                }),
                invalidatesTags: ['WISHLIST'],

            }
            ),
            remove: builder.mutation<WishListResponse, WishListBody>({
                query: (arg) => ({
                    url: `/Courses/remove-from-wishlist?studentId=${arg.studentId}&courseId=${arg.courseId}`,
                    method: 'PATCH',
                }),
                invalidatesTags: ['WISHLIST'],
            }
            ),
        }
    }
})

export const { useAddMutation, useGetWishlistQuery, useRemoveMutation } = wishlistApi;

export default wishlistApi;