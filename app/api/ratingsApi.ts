import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { API_URL } from "app/constants";
import { RootState } from "app/types";

export interface RatingsBody {
  studentId: string;
  courseId: string;
  score: Number;
  text: string;
  wouldRecommend: boolean;
}



export const ratingsApi = createApi({
  reducerPath: "RatingsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const {
        user: { token },
      } = getState() as RootState;
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["RATINGS"],
  endpoints: (builder) => {
    return {
      rateCourse: builder.mutation<any, RatingsBody>({
        query: (arg) => ({
          url: `/Courses/rate`,
          method: "POST",
          body: arg,
        }),
        invalidatesTags: ["RATINGS"],
      }),
    };
  },
});

export const { useRateCourseMutation } = ratingsApi;
export default ratingsApi;
