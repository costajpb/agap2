import Entity from "../../domain/shared/entity";

type ListProps<T extends Entity> = {
    items: T[]
    testId?: string
}

export default function List<T extends Entity>({ items, testId }: ListProps<T>) {
    return (<ol data-testid={testId}></ol>)
}