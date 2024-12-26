import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const dashApi = createApi({
  reducerPath: 'dashApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_DASH_API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set(
        'token',
        'MTphZG1pbjoxNzM1MjAyNDEy.uJpCBRTOPbGZLdeUbDbEzOkoFUqoG_bxKmZCBinQpLY='
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
    getBestSellerProduct: builder.query({
      query: () => '/dashboard/bestSeller',
    }),
    getEarnings: builder.query({
      query: () => '/dashboard/earning',
    }),
    getRevenue: builder.query({
      query: () => '/dashboard/revenue',
    }),
    getSummary: builder.query({
      query: () => '/dashboard/summary',
    }),
  }),
});

export const {
  useGetBestSellerProductQuery,
  useGetEarningsQuery,
  useGetRevenueQuery,
  useGetSummaryQuery,
} = dashApi;
