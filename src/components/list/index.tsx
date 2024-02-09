import Entity from "../../domain/shared/entity";
import Item from './item'

type ListProps = {
    testId?: string
    children: React.ReactElement<typeof Item>[]
}

export default function List({ children, testId }: ListProps) {
    return (
        <ol data-testid={testId}>
            {children}
        </ol>
    )
}