import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseUrl';

const token = localStorage.getItem("token");

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/books`, 
    credentials: "include",
    prepareHeaders: (headers) => {
        if (token) headers.set("Authorization", `Bearer ${token}`); 
        return headers;
    }
});

const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery,
    endpoints: (builder) => ({
        fetchAllBooks: builder.query({
            query: () => "/",
            providesTags: ["Books"]
        }),
        fetchBookById: builder.query({
            query: (id) => `/${id}`,
            providesTags: ["Books"]
        }),
        addBook: builder.mutation({
            query: (newBook) => ({
                url: `/create-book`,
                method: "POST",
                body: newBook
            }),
            invalidatesTags: ["Books"]
        }),
        updateBook: builder.mutation({
            query: ({ id, ...body }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: body,
                headers: {
                    "Content-Type": "application/json"
                }
            }),
            invalidatesTags: ["Books"]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Books"]
        })
    })
});

export default booksApi;
export const { 
    useFetchAllBooksQuery, 
    useFetchBookByIdQuery, 
    useAddBookMutation, 
    useUpdateBookMutation, 
    useDeleteBookMutation 
} = booksApi;
