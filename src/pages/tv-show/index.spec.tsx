import { render, findByRole, findByTestId, findAllByTestId, fireEvent, waitFor } from "@testing-library/react"
import TVShow from "."
import nock from "nock"
import data from '../../domain/tv-show/repository/__fixtures__/tvshow.json'

describe('src/pages/tv-show', () => {
    beforeEach(() => {
        nock.cleanAll()

        nock('https://api.tvmaze.com')
        .persist()
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true' 
          })
            .get(`/shows/1`)
            .query({
                embed: 'episodes'
            })
            .reply(200, data)
    })

    it('should show title, description, cover image and episode list', async () => {
        const { container } = render(<TVShow id={1} />)
        expect((await findByRole(container, 'heading')).textContent).toBe(data.name)
        expect((await findByTestId(container, 'description')).textContent != '').toBeTruthy()
        expect((await findByRole(container, 'img')).getAttribute('src')).toBe(data.image.original)
        expect((await findByTestId(container, 'episodes'))).toBeTruthy()
    })

    test('every episode in the list should link to a details page for that specific episode', async () => {
        const id = 1
        const { container } = render(<TVShow id={id} />)
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
        await waitFor(() => expect(spy).toHaveBeenCalledTimes(1))
        await waitFor(() => expect(spy.mock.calls[0][0].detail).toMatchObject({id}))
    })
})