import { configureStore } from "@reduxjs/toolkit";
import { tvShowApi } from "./tvshow";
import { setupListeners } from "@reduxjs/toolkit/query";
import { episodeApi } from "./episode";

export const store = configureStore({
    reducer: {
        [tvShowApi.reducerPath]: tvShowApi.reducer,
        [episodeApi.reducerPath]: episodeApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(tvShowApi.middleware)
            .concat(episodeApi.middleware),
})

setupListeners(store.dispatch)