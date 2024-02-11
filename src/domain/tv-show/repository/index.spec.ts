import nock from 'nock'
import TVShows from "."
import data from './__fixtures__/tvshow.json'

jest.mock('../../../adapters/episode', () => () => [])

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

        const response = {
            foo: 'bar'
        }

        const adapter = jest.fn().mockReturnValue(response)

        const tvshows = new TVShows(adapter)
        const show = await tvshows.find(1)
        
        expect(adapter).toHaveBeenCalledTimes(1)
        expect(adapter).toHaveBeenCalledWith(data)
        expect(show).toStrictEqual(response)
    })
})