import { findByRole, findByTestId, render } from "@testing-library/react"
import Episode from "."
import data from '../../domain/tv-show/repository/__fixtures__/tvshow.json'
import Entity from "../../domain/episode/entity"

const rawEpisode = data._embedded.episodes[0]

describe('pages/episode', () => {
    it('should show title, summary and cover image', async () => {
        const episode: Entity = {
            id: rawEpisode.id,
            title: rawEpisode.name,
            summary: rawEpisode.summary,
            coverImage: rawEpisode.image.original
        }

        const { container } = render(<Episode details={episode} />)

        expect((await findByRole(container, 'heading')).textContent).toBe(episode.title)
        expect((await findByTestId(container, 'summary')).textContent != '').toBeTruthy()
        expect((await findByRole(container, 'img')).getAttribute('src')).toBe(episode.coverImage)
    })
})