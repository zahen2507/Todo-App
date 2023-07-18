import { configureStore } from '@reduxjs/toolkit'
import { todoListAPI } from './../pages/api/api'
import { createWrapper } from "next-redux-wrapper";

export const store = () => configureStore({
    reducer: {
        [todoListAPI.reducerPath]: todoListAPI.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todoListAPI.middleware)
})

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: true });