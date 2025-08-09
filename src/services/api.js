import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://chat-app-backend-rkzy.onrender.com/api",
        prepareHeaders: (headers, { getState }) => {
            // cookies sent automatically
            return headers;
        },
        credentials: 'include',
    }),
    tagTypes: ['Posts', 'User'],
    endpoints: (builder) => ({
        // signup: builder.mutation({
        //     query: (credentials) => ({ url: '/auth/signup', method: 'POST', body: credentials }),
        //     invalidatesTags: ['User'],
        // }),
        // login: builder.mutation({
        //     query: (credentials) => ({ url: '/auth/login', method: 'POST', body: credentials }),
        //     invalidatesTags: ['User'],
        // }),
        fetchUser: builder.query({
            query: () => '/auth/me',
            providesTags: ['User'],
        }),
        fetchPosts: builder.query({
            query: () => '/posts',
            providesTags: ['Posts'],
        }),
        createPost: builder.mutation({
            query: (post) => ({ url: '/posts', method: 'POST', body: post }),
            invalidatesTags: ['Posts'],
        }),
        editPost: builder.mutation({
            query: ({ id, ...post }) => ({ url: `/posts/${id}`, method: "PUT", body: post }),
            invalidatesTags: ['Posts']
        }),
        // deletePost: builder.mutation({
        //     query: (id) => ({ url: `/posts/${id}`, method: 'DELETE' }),
        //     invalidatesTags: ['Posts'],
        // }),
        fetchTags: builder.query({
            query: () => '/tags',
            providesTags: ['Tags'],
        }),
        createTag: builder.mutation({
            query: (tagData) => ({
                url: '/tags',
                method: 'POST',
                body: tagData,
            }),
            invalidatesTags: ['Tags'],
        }),
        deleteTag: builder.mutation({
            query: (id) => ({
                url: `/tags/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tags'],
        }),
    }),
});

export const {
    // useSignupMutation,
    // useLoginMutation,
    useFetchUserQuery,
    useFetchPostsQuery,
    useCreatePostMutation,
    // useDeletePostMutation,
    useEditPostMutation,
    useCreateTagMutation,
    useDeleteTagMutation,
    useFetchTagsQuery
} = api;