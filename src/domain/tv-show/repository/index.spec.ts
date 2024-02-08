import nock from 'nock'
import TVShows from "."
import data from './__fixtures__/tvshow.json'
import TVShow from '../entity'
import Episodes from '../../episode/repository'
import Episode from '../../episode/entity'

describe('domain/tv-show/repository', () => {
    beforeEach(() => {
        nock.cleanAll()
    })

    test('find', async () => {
        nock('https://api.tvmaze.com')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true' 
          })
            .get(`/shows/1`)
            .query({
                embed: 'episodes'
            })
            .reply(200, data)
        const episodes: Episode[] = []
        jest.spyOn(Episodes, 'adapt').mockReturnValue(episodes)
        const tvshows = new TVShows()
        const show = await tvshows.find(1)
        expect(show).toStrictEqual({
            id: 1,
            title: data.name,
            description: data.summary,
            coverImage: data.image.original,
            episodes
        } as TVShow)
    })
})