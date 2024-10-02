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
        url: `/user/${userId}`,
        method: "PUT",
        body: newRole,
      }),
      invalidatesTags: ["user"],
    }),

    getAllUser: builder.query({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
      providesTags: ['user'],
    }),

    getSingleUser: builder.query({
      query: ({ userId }) => ({
        url: `/user/${userId}`,
        method: 'GET',
      }),
      providesTags: ['user'],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['user'],  // Invalidate the cache to refresh after deletion
    }),

    update: builder.mutation({
      query: ({ userId, newRole }) => ({
        url: `/user/${userId}`,
        method: "PUT",
        body: newRole,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
