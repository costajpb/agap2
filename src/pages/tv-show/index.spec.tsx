import { render, findByRole, findByTestId } from "@testing-library/react"
import TVShow from "."
import nock from "nock"
import data from '../../domain/tv-show/repository/__fixtures__/tvshow.json'

describe('src/pages/tv-show', () => {
    beforeEach(() => {
        nock.cleanAll()
    })

    it('should show title, description, cover image and episode list', async () => {
        nock('https://api.tvmaze.com')
        .defaultReplyHeaders({
            'access-control-allow-origin': '*',
            'access-control-allow-credentials': 'true' 
          })
            .get(`/shows/1`)
            .query({
                embed: 'episodes'
            })
            .reply(200, data)

        const { container } = render(<TVShow id={1} />)
        expect((await findByRole(container, 'heading')).textContent).toBe(data.name)
        // expect((await findByTestId(container, 'description')).textContent).toBe(data.summary)
        expect((await findByRole(container, 'img')).getAttribute('src')).toBe(data.image.original)
        expect((await findByTestId(container, 'episodes'))).toBeTruthy()
        // expect(() => getByTestId(container, 'episode-list')).not.toThrow()
    })
})