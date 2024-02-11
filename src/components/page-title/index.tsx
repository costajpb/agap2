import { ReactNode } from "react"
import { x } from "@xstyled/styled-components"

type PageTitleProps = {
    children: ReactNode
    textAlign?: string
    gridArea?: string
}

export default function PageTitle({children, textAlign, gridArea}: PageTitleProps) {
    return (
        <x.h1 fontSize="3xl" {...(textAlign ? {textAlign} : {})} {...(gridArea ? {gridArea} : {})} color="emerald-600" fontWeight="bold">
            <x.span borderBottomWidth="8">{children}</x.span>
        </x.h1>
    )
}