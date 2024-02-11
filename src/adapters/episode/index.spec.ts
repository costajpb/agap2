import adapter from '.'
import data from './__fixtures__/data.json'

describe('adapters/episodes', () => {
    it('should adapt a single resource', () => {
        expect(adapter(data)).toStrictEqual({
            id: data.id,
            title: data.name,
            summary: data.summary,
            coverImage: data.image.original
        })
    })

    it('should adapt an array of resources', () => {
        expect(adapter([data])).toStrictEqual([
            {
                id: data.id,
                title: data.name,
                summary: data.summary,
                coverImage: data.image.original
            }
        ])
    })
})