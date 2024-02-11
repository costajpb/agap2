import { render } from '@testing-library/react'
import Container from '.'

describe('components/container', () => {
    it('should render', () => {
        const { container } = render(<Container>Dummy text</Container>)
        expect(container).toMatchSnapshot()
    })
})
