import { TodoList } from '@/models/TodoList'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper';

export const todoListAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com/" }),
  tagTypes: ['TodoList'],
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getTodoLists: builder.query<TodoList[], number | void>({
      query: (page) => `todos?_page=${page}&_limit=10`,
      providesTags: ['TodoList']
    }),
    addTodoList: builder.mutation<TodoList, Partial<TodoList>>({
      query: ({ userId, title, completed }) => ({
        url: `todos`,
        method: 'POST',
        body: {
          userId, title, completed
        },
      }),
      invalidatesTags: ['TodoList'],
    }),
    getTodoList: builder.query<TodoList, string>({
      query: (id) => `posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'TodoList', id }],
    }),
  })
})

// Export hooks for usage in functional components
export const {
  useGetTodoListsQuery,
  useGetTodoListQuery,
  useAddTodoListMutation,
  util: { getRunningQueriesThunk },
} = todoListAPI;

// export endpoints for use in SSR
export const { getTodoLists } = todoListAPI.endpoints;