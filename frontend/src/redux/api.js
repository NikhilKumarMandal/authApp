import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1/users/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: 'register',
        method: 'POST',
        body: user,
        headers: {
          'Content-Type': 'application/json'
        },
      }),
    }),
    verifyEmail: builder.mutation({
      query: ({ id, otp }) => ({
        url: `verify-email/${id}`,
        method: 'POST',
        body: { otp },
      }),
    }),
    resendOtp: builder.mutation({
      query: ({ id }) => ({
        url: `resendEmail/${id}`,
        method: 'POST',
        body: {},
      }),
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
        headers: {
          'Content-Type': 'application/json'
        },
      }),
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: 'logout',
        method: 'POST',
        credentials: 'include' 
      }),
    }),
    forgetPassword: builder.mutation({
      query: (user) => ({
        url: 'forget-password',
        method: 'POST',
        body: user,
        headers: {
          'Content-Type': 'application/json'
        },
      }),
    }),
    resetPasswordLink: builder.mutation({
      query: (data) => {
        const { token, ...values } = data
        const actualData = { ...values }
        return {
          url: `password/reset/${token}`,
          method: 'POST',
          body: actualData,
          headers: {
          'Content-Type': 'application/json'
        }
        }
      }
    }),
  }),
});

export const { useCreateUserMutation, useVerifyEmailMutation, useResendOtpMutation, useLoginUserMutation, useLogoutUserMutation,useForgetPasswordMutation,useResetPasswordLinkMutation } = registerApi;


