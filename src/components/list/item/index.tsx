import { x } from "@xstyled/styled-components"

type ItemProps = {
    children: React.ReactNode
}

export default function Item({children}: ItemProps) {
    return (<x.li h="32" borderRadius="2xl" position="relative" overflow="hidden">{children}</x.li>)
}