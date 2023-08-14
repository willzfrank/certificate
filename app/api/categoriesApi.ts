import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { API_URL } from 'app/constants';
import { CategoriesResponse } from 'app/types';

export const categoriesApi = createApi({
    reducerPath: 'categoriessApi',
    baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
    tagTypes: ['CATEGORIES'],
    endpoints: (builder) => {
        return {
            getCategories: builder.query<CategoriesResponse, void>({
                query: () => ({
                    url: "/Categories/list-all",
                }),
            }),
        }
    }
})

export default categoriesApi;
export const { useGetCategoriesQuery } = categoriesApi;