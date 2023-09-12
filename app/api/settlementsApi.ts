import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'app/constants';
import { RootState } from 'app/types';

// Define the parameters type separately for clarity
interface ListSettlementsParams {
  instructorId: string;
  page: number;
  perPage: number;
}

export const settlementApi = createApi({
  reducerPath: 'settlementApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { user } = getState() as RootState;
      const { token } = user;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['SETTLEMENT'],
  endpoints: (builder) => ({
    // Use a separate query name for clarity
    listAllStudentsByInstructor: builder.query<any, ListSettlementsParams>({
      query: ({ instructorId, page, perPage }) => ({
        url: '/Subscriptions/list-trasanction-by-instructor-for-student',
        method: 'GET',
        params: { instructorId, page, perPage }, // Use the params property for query parameters
      }),
      providesTags: ['SETTLEMENT'],
    }),

    // New endpoint for list-all-settlements-by-instructor
    listAllSettlementsByInstructor: builder.query<any, ListSettlementsParams>({
      query: ({ instructorId, page, perPage }) => ({
        url: '/Subscriptions/list-all-settlements-by-instructor',
        method: 'GET',
        params: { instructorId, page, perPage },
      }),
      providesTags: ['SETTLEMENT'],
    }),
  }),
});

export const {
  // Rename the query hooks for clarity
  useListAllStudentsByInstructorQuery,
  useLazyListAllStudentsByInstructorQuery,
  useListAllSettlementsByInstructorQuery,
  useLazyListAllSettlementsByInstructorQuery,
} = settlementApi;

export default settlementApi;
