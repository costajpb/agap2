import { getByTestId, render } from "@testing-library/react"
import TVShow from "."

describe('src/pages/tv-show', () => {
    it.skip('should show title, description, cover image and episode list', () => {
        const { container } = render(<TVShow id={1} />)
        expect(() => getByTestId(container, 'title')).not.toThrow()
        expect(() => getByTestId(container, 'description')).not.toThrow()
        expect(() => getByTestId(container, 'cover-image')).not.toThrow()
        expect(() => getByTestId(container, 'episode-list')).not.toThrow()
    })
})