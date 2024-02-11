import { x } from '@xstyled/styled-components'
import { ReactNode } from 'react'

type ContainerProps = {
    children: ReactNode
}

export default function Container({ children }: ContainerProps) {
    return (
        <x.div
            maxWidth={{ _: 'auto', md: '5xl' }}
            mx="auto"
            bg="white"
            my={{ _: 0, lg: 8 }}
            boxShadow="lg"
            borderRadius="lg"
            p="8"
        >
            {children}
        </x.div>
    )
}
