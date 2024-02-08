import Episodes from "."
import data from './__fixtures__/episodes.json'

describe('domain/episode/repository', () => {
    test('adapt', () => {
        const episode = data[0]
        expect(Episodes.adapt(data)).toStrictEqual([
            {
                title: episode.name,
                summary: episode.summary,
                coverImage: episode.image.original
            }
        ])
    })
})