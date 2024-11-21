import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from './mainStore'
import { UserInfo } from './userListSlice'

export const userSystemApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['UserList'],
  endpoints: (builder) => ({
    getAllUsers: builder.query<Object, void>({
      query: () => ({
        url: ``,
        method: 'GET',
      }),
      providesTags: ['UserList'],
    }),
    getUserByParams: builder.mutation<Array<UserInfo>, Object>({
      query: (user) => ({
        url: `search`,
        method: 'POST',
        body: user,
      }),
    }),
    register: builder.mutation({
      query: (user) => ({
        url: `register`,
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: `login`,
        method: 'POST',
        body: user,
      }),
    }),
    addNewUser: builder.mutation({
      query: (user) => ({
        url: `new`,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['UserList'],
    }),
  }),
})

export const {
  useGetAllUsersQuery,
  useGetUserByParamsMutation,
  useLoginMutation,
  useAddNewUserMutation,
  useRegisterMutation,
} = userSystemApi
