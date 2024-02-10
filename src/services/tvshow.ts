import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 
import TVShows from '../domain/tv-show/repository'
import TVShowEntity from '../domain/tv-show/entity'
import TVShowUseCase from '../application/tv-show'

const repository = new TVShows()

export const tvShowApi = createApi({
    reducerPath: 'tvShowApi',
    baseQuery: fetchBaseQuery({ baseUrl: repository.baseUrl }),
    endpoints: (builder) => ({
        findTVShow: builder.query<TVShowEntity, TVShowEntity['id']>({
            queryFn: async (id) => {
                const useCase = new TVShowUseCase(repository, id)
                try {
                    const tvShow = await useCase.current
                    return { data: tvShow }
                } catch (error) {
                    return { error: error as any }
                }
            }
        }),
  }),
})

export const { useFindTVShowQuery } = tvShowApi