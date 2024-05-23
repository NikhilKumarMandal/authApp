import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1/users/' }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: 'register',
        method: 'POST',
        body: user,
        headers: {
          'Content-Type': 'application/json', // Use 'Content-Type' instead of 'Content-type'
        },
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ id, otp }) => ({
        url: `verify-email/${id}`,
        method: 'POST',
        body: {otp} ,
       
      }),
    }),
  }),
});

export const { useCreateUserMutation, useVerifyEmailMutation } = registerApi;


