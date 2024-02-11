import nock from "nock"
import Episodes from "."
import data from './__fixtures__/episodes.json'

describe('domain/episode/repository', () => {
    beforeEach(() => {
        nock.cleanAll()
    })
    
    test('find', async () => {
        const id = 1

        nock('https://api.tvmaze.com')
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'access-control-allow-credentials': 'true' 
            })
                .get(`/episodes/${id}`)
                .reply(200, data)

        const response = {
            foo: 'bar'
        }

        const adapter = jest.fn().mockReturnValue(response)
        
        const episodes = new Episodes(adapter)

        const episode = await episodes.find(id)

        expect(adapter).toHaveBeenCalledTimes(1)
        expect(adapter).toHaveBeenCalledWith(data)
        expect(episode).toStrictEqual(response)
    })
})