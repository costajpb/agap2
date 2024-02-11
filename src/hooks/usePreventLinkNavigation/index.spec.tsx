import { fireEvent, getByTestId, render, renderHook, waitFor } from "@testing-library/react"
import usePreventLinkNavigation from "."
import UseCase from "../../application/shared/use-case"
import Entity from "../../domain/shared/entity"

describe('hooks/usePreventLinkNavigation', () => {
    function Element() {
        return (<div><a data-testid="anchor" href="#">Click me!</a></div>)
    }

    it('should prevent default', async () => {
        const { container } = render(<Element />)

        const anchor = getByTestId(container, 'anchor')

        renderHook(() => usePreventLinkNavigation(container))

        const isNotDefaultPrevented = fireEvent.click(anchor)

        await waitFor(() => expect(isNotDefaultPrevented).toBeFalsy())
    })

    it('should return the clicked link', async () => {
        const { container } = render(<Element />)

        const anchor = getByTestId(container, 'anchor')

        const { result } = renderHook(() => usePreventLinkNavigation(container))

        fireEvent.click(anchor)

        await waitFor(() => expect(result.current).toBe(anchor))
    })
})  