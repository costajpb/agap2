import { render, findByTestId, fireEvent, waitFor, findAllByRole, getAllByTestId } from "@testing-library/react"
import TVShow from "."
import data from '../../domain/tv-show/repository/__fixtures__/tvshow.json'
import StoreProvider from "../../store/provider"
import Entity from '../../domain/tv-show/entity'

const mockDisplay = jest.fn()
const mockEpisode = data._embedded.episodes[0]

jest.mock('../../application/tv-show/index', () => {
    return class {
        get current() {
            return {
                episodes: [
                    {
                        id: mockEpisode.id,
                        title: mockEpisode.name,
                        summary: mockEpisode.summary,
                        coverImage: mockEpisode.image.original
                    }
                ]
            }
        }

        display(...args: any[]) {
            mockDisplay(...args)
        }
    }
})

describe('src/pages/tv-show', () => {
    const wrapper = ({ children }: { children: any }) => (
        <StoreProvider>{children}</StoreProvider>
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
        expect((await findAllByRole(container, 'heading'))[0].textContent).toBe(details.title)
        expect((await findByTestId(container, 'description')).textContent !== '').toBeTruthy()
        expect((await findByTestId(container, 'cover-image')).getAttribute('src')).toBe(details.coverImage)
        expect(((await findByTestId(container, 'episodes')).textContent)).toBe(details.episodes[0].title)
    })

    test('every episode in the list should link to a details page for that specific episode', async () => {
        const { container } = render(<TVShow details={details} />)
        const anchor = getAllByTestId(container, 'episode')[0]

        fireEvent.click(anchor)

        await waitFor(() => expect(mockDisplay).toHaveBeenCalledTimes(1))
        await waitFor(() => expect(mockDisplay).toHaveBeenCalledWith(details.episodes[0]))
    })
})