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
        find: (id: Entity['id']) => Promise.resolve({...data})
    }

    test('details', async () => {
        const episode = new Episode(repository, 1)
        expect(await episode.details).toStrictEqual(data)
    })
})