import Episode from "."
import Entity from '../../domain/episode/entity'

describe('application/episode', () => {
    const id = 1
    const data: Entity = {
        id,
        title: 'Dummy episode title',
        summary: 'Dummy episode summary',
        coverImage: 'Dummy episode cover image'
    }

    const repository = {
        baseUrl: '',
        find: (id: Entity['id']) => Promise.resolve({...data})
    }

    let episode: Episode

    beforeEach(() => {
        episode = new Episode(repository as any, 1)
    })

    test('details', async () => {
        expect(await episode.details).toStrictEqual(data)
    })

    test('return', (done) => {
        const spy = jest.fn()
        episode.on('episode:return', () => {
            spy()
            done()
        })

        episode.return()

        expect(spy).toHaveBeenCalledTimes(1)
    })
})