type ListProps = {
    testId?: string
    children: React.ReactElement<HTMLOListElement>[]
}

const List = ({testId, children}: ListProps) => (
    <ol data-testid={testId}>
        {children}
    </ol>
)

export default List