import { configureStore } from "@reduxjs/toolkit";
import { tvShowApi } from "./tvshow";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [tvShowApi.reducerPath]: tvShowApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tvShowApi.middleware),
})

setupListeners(store.dispatch)