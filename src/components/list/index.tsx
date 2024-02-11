import { x } from '@xstyled/styled-components'

type ListProps = {
    testId?: string
    children: React.ReactElement<HTMLOListElement>[]
}

const List = ({testId, children}: ListProps) => (
    <x.ol
        maxHeight="60vh"
        overflow="auto"
        display="grid"
        gridTemplateColumns={{_: 1, sm: 2}}
        gap="4"
        data-testid={testId}
    >
        {children}
    </x.ol>
)

export default List