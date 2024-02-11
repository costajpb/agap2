import { configureStore } from '@reduxjs/toolkit'
import { tvShowApi } from './apis/tvshow'
import { setupListeners } from '@reduxjs/toolkit/query'
import { episodeApi } from './apis/episode'

const store = configureStore({
    reducer: {
        [tvShowApi.reducerPath]: tvShowApi.reducer,
        [episodeApi.reducerPath]: episodeApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(tvShowApi.middleware).concat(episodeApi.middleware)
})

setupListeners(store.dispatch)

export default store
