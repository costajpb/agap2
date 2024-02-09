import { findByRole, findByTestId, render } from "@testing-library/react"
import Episode from "."
import data from '../../domain/episode/repository/__fixtures__/episodes.json'
import nock from "nock"

describe('pages/episode', () => {
    it('should show title, summary and cover image', async () => {
        const id = 1
        const episode = data[0]
        nock('https://api.tvmaze.com')
            .persist()
            .defaultReplyHeaders({
                'access-control-allow-origin': '*',
                'access-control-allow-credentials': 'true' 
            })
                .get(`/episodes/${id}`)
                .reply(200, episode)

        const { container } = render(<Episode id={id} />)

        expect((await findByRole(container, 'heading')).textContent).toBe(episode.name)
        expect((await findByTestId(container, 'summary')).textContent != '').toBeTruthy()
        expect((await findByRole(container, 'img')).getAttribute('src')).toBe(episode.image.original)
    })
})