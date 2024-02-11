import { render } from "@testing-library/react"
import Loader from "."

describe('components/loader', () => {
    it('should render', () => {
        const { container } = render(<Loader />)
        expect(container).toMatchSnapshot()
    })
})