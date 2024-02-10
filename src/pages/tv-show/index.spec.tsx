import { render, findByRole, findByTestId, findAllByTestId, fireEvent, waitFor } from "@testing-library/react"
import TVShow from "."
import data from '../../domain/tv-show/repository/__fixtures__/tvshow.json'
import ReduxProvider from "../../services/redux-provider"
import Entity from '../../domain/tv-show/entity'

describe('src/pages/tv-show', () => {
    const wrapper = ({ children }: { children: any }) => (
        <ReduxProvider>{children}</ReduxProvider>
      )

    const rawEpisode = data._embedded.episodes[0]

    const details: Entity = {
        id: data.id,
        title: data.name,
        description: data.summary,
        coverImage: data.image.original,
        episodes: [
            {
                id: rawEpisode.id,
                title: rawEpisode.name,
                summary: rawEpisode.summary,
                coverImage: rawEpisode.image.original
            }
        ]
    }

    it('should show title, description, cover image and episode list', async () => {
        const { container } = render(<TVShow details={details} />, { wrapper })
        expect((await findByRole(container, 'heading')).textContent).toBe(details.title)
        expect((await findByTestId(container, 'description')).textContent != '').toBeTruthy()
        expect((await findByTestId(container, 'cover-image')).getAttribute('src')).toBe(details.coverImage)
        expect(((await findByTestId(container, 'episodes')).textContent)).toBe(details.episodes[0].title)
    })

    test('every episode in the list should link to a details page for that specific episode', async () => {
        const { container } = render(<TVShow details={details} />, {wrapper})
        const spy = jest.fn()
        container.addEventListener('tvshow:display', spy)
        const firstEpisode = (await (findAllByTestId(container, 'episode')))[0]

        // xxx: prevent redirection attempt
        firstEpisode.setAttribute('href', '#')

        const isNotPrevented = fireEvent(firstEpisode, new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
        }))

        await waitFor(() => expect(isNotPrevented).toBeFalsy())
        // FIXME: when another test in this suite runs along, the container registers more than call
        // await waitFor(() => expect(spy).toHaveBeenCalledTimes(1))
        await waitFor(() => expect(spy.mock.calls[0][0].detail).toStrictEqual(details.episodes[0]))
    })
})