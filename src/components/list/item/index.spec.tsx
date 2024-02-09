import { getByRole, render } from "@testing-library/react"
import Item from "."

describe('components/list/item', () => {
    it('should contain a link', () => {
        const href = "/test"
        const label = "label"

        const { container } = render(<Item link={href}>{label}</Item>)

        const link = getByRole(container, 'link')
        expect(link.textContent).toBe(label)
        expect(link.getAttribute('href')).toBe(href)
    })
})