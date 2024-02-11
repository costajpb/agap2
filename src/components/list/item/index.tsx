import { x } from "@xstyled/styled-components"

type ItemProps = {
    children: React.ReactNode
}

export default function Item({children}: ItemProps) {
    return (<x.li h={{_: 24, sm: 32, md: 24, lg: 32}} bg="gray-200" borderRadius="2xl" position="relative" overflow="hidden">{children}</x.li>)
}