import { render } from '@testing-library/react'
import PageTitle from '.'

describe('components/page-title', () => {
    it('should render', () => {
        const { container } = render(<PageTitle>Page title</PageTitle>)
        expect(container).toMatchSnapshot()
    })
})
