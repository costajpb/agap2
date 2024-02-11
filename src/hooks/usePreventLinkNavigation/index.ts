import { useState } from 'react'

export default function usePreventLinkNavigation(element?: HTMLElement) {
    const [target, setTarget] = useState<HTMLAnchorElement | undefined>(undefined)

    element?.addEventListener('click', async (event) => {
        const target = event.target as HTMLElement
        if (target.tagName === 'A') {
            event.preventDefault()
            setTarget(target as HTMLAnchorElement)
        }
    })

    return target
}
