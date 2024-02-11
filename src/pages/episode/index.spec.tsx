import {
    findByRole,
    findByTestId,
    fireEvent,
    getByText,
    render,
    waitFor
} from '@testing-library/react'
import Episode from '.'
import data from '../../domain/tv-show/repository/__fixtures__/tvshow.json'
import Entity from '../../domain/episode/entity'

const mockReturn = jest.fn()

jest.mock('../../application/episode/index', () => {
    return class {
        return() {
            mockReturn()
        }
    }
})

const rawEpisode = data._embedded.episodes[0]

describe('pages/episode', () => {
    const episode: Entity = {
        id: rawEpisode.id,
        title: rawEpisode.name,
        summary: rawEpisode.summary,
        coverImage: rawEpisode.image.original
    }

    it('should show title, summary and cover image', async () => {
        const { container } = render(<Episode details={episode} />)

        expect((await findByRole(container, 'heading')).textContent).toBe(episode.title)
        expect((await findByTestId(container, 'summary')).textContent !== '').toBeTruthy()
        expect((await findByRole(container, 'img')).getAttribute('src')).toBe(episode.coverImage)
    })

    it('should render with a message when summary is not available', () => {
        const { container } = render(<Episode details={{ ...episode, summary: undefined }} />)

        expect(container).toMatchSnapshot()
    })

    test('return to show page', async () => {
        const { container } = render(<Episode details={episode} />)
        const anchor = getByText(container, /return/i)

        fireEvent.click(anchor)

        await waitFor(() => expect(mockReturn).toHaveBeenCalledTimes(1))
    })
})
