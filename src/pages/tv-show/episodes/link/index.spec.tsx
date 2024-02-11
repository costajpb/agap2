import { render } from "@testing-library/react"
import Link from "."

describe('pages/tv-show/episodes/link', () => {
    const episode = {
        id: 1,
        title: 'Dummy title'
    }

    it('should render without image', () => {
        const { container } = render(<Link episode={episode} />)
        expect(container).toMatchSnapshot()
    })

    it('should render with image', () => {
        const { container } = render(<Link episode={{
            ...episode,
            coverImage: 'image-src'
        }} />)
        expect(container).toMatchSnapshot()
    })
})