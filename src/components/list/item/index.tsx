type ItemProps = {
    children: React.ReactNode
}

export default function Item({children}: ItemProps) {
    return (<li>{children}</li>)
}