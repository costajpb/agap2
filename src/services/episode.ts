import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react' 
import Entity from '../domain/episode/entity'
import UseCase from '../application/episode'
import Episodes from '../domain/episode/repository'
import adapter from '../adapters/episode'

const repository = new Episodes(adapter)

export const episodeApi = createApi({
    reducerPath: 'episodeApi',
    baseQuery: fetchBaseQuery({ baseUrl: repository.baseUrl }),
    endpoints: (builder) => ({
        findEpisode: builder.query<Entity, Entity['id']>({
            queryFn: async (id) => {
                const useCase = new UseCase(repository, id)
                try {
                    const episode = await useCase.details
                    return { data: episode }
                } catch (error) {
                    return { error: error as any }
                }
            }
        }),
  }),
})

export const { useFindEpisodeQuery } = episodeApi