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
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;
