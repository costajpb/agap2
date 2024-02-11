import adapter from '.'
import data from './__fixtures__/data.json'

jest.mock('../episode/index', () => () => [])

describe('adapters/tv-show', () => {
    it('should adapt a single resource', () => {
        expect(adapter(data)).toStrictEqual({
            id: 1,
            title: data.name,
            description: data.summary,
            coverImage: data.image.original,
            episodes: []
        })
    })

    // it('should adapt an array of resources', () => {
    //     expect(adapter([data])).toStrictEqual([{
    //         id: 1,
    //         title: data.name,
    //         description: data.summary,
    //         coverImage: data.image.original,
    //         episodes: []
    //     }])
    // })
})