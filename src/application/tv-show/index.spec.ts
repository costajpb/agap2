import TVShow from "."
import TVShowEntity from '../../domain/tv-show/entity'

describe('application/tv-show', () => {
    let show: TVShow
    const id = 1
    const data: TVShowEntity = {
        id,
        title: 'Dummy title',
        description: 'Dummy description',
        coverImage: 'dummy cover image',
        episodes: [{
            id: 1,
            title: 'Dummy episode title',
            summary: 'Dummy episode summary',
            coverImage: 'Dummy episode cover image'
        }]
    }

    const repository = {
        baseUrl: '',
        find: (id: TVShowEntity['id']) => Promise.resolve({...data})
    }

    beforeEach(() => {
        show = new TVShow(repository, 1)
    })

    test('current', async () => {
        expect(await show.current).toStrictEqual(data)
    })

    test('display', (done) => {
        const spy = jest.fn()
        show.on('tvshow:display', data => {
            spy(data)
            done()
        })

        const episode = data.episodes[0]

        show.display(episode)

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(episode)
    })
})