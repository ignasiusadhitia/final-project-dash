import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DASH_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set(
        'Authorization',
        'Bearer MTphZG1pbjoxNzM1MDY4MjU3.CJ9GMkPexjyHXZlIB1PD9SvjFWJB_4EjoAQVQn6ptpo='
      );
      return headers;

      //   const token = localStorage.getItem('token');
      //   if (token) {
      //     headers.set('token', `${token}`);
      //   }
      //   return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (page, limit) => `/category?page=${page}&limit=${limit}`,
    }),
    getCategory: builder.query({
      query: (id) => `/category/${id}`,
    }),
    createCategory: builder.mutation({
      query: (data) => ({
        url: '/category',
        method: 'POST',
        body: data,
      }),
    }),
    editCategory: builder.mutation({
      query: (data) => ({
        url: `/category/${data.id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
