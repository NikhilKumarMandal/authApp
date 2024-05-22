import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1/users/' }),
  endpoints: (builder) => ({
      createUser: builder.mutation({
          query: (user) => {
              return {
                url: 'register',
                method: 'POST',
                body: user,
                headers: {
                      'Content-type': 'application/json'
                }
              }
        }
    })
  }),
})


export const { useCreateUserMutation } = registerApi