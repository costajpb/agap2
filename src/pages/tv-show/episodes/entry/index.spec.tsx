import { render } from "@testing-library/react"
import Entry from "."

describe('pages/tv-show/episodes/entry', () => {
    it('should render', () => {
        const episode = {
            id: 1,
            title: 'Dummy title'
        }

        const { container } = render(<Entry episode={episode} />)

        expect(container).toMatchSnapshot()
    })
})