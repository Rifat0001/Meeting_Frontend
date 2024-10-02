import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: '/auth/login',
        method: 'POST',
        body: userInfo,
      }),
    })
    ,
    signup: builder.mutation({
      query: (signUpInfo) => ({
        url: '/auth/signup',
        method: 'POST',
        body: signUpInfo,
      }),
      invalidatesTags: ["user"],
    }),

    updateUserRole: builder.mutation({
      query: ({ userId, newRole }) => ({
        url: `/auth/user/${userId}`,
        method: "PUT",
        body: newRole,
      }),
      invalidatesTags: ["user"],
    }),

    getAllUser: builder.query({
      query: () => ({
        url: '/auth/user',
        method: 'GET',
      }),
      providesTags: ['user'],
    }),

    getSingleUser: builder.query({
      query: ({ email }) => ({
        url: `/auth/user/${email}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/auth/user/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user'],  // Invalidate the cache to refresh after deletion
    }),

    updateAccountInfo: builder.mutation({
      query: ({ userId, userInfo }) => ({
        url: `/auth/user/update/${userId}`,
        method: "PUT",
        body: userInfo,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useGetAllUserQuery, useGetSingleUserQuery, useUpdateAccountInfoMutation, useUpdateUserRoleMutation, useDeleteUserMutation } = authApi;
