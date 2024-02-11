import { render } from '@testing-library/react'
import Episodes from '.'

describe('pages/tv-show/episodes', () => {
    it('should render', () => {
        const data = [
            {
                id: 1,
                title: 'Dummy title'
            }
        ]

        const { container } = render(<Episodes data={data} />)

        expect(container).toMatchSnapshot()
    })
})
