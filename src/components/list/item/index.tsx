type ItemProps = {
    link: string
    children: React.ReactNode
}

export default function Item({link, children}: ItemProps) {
    return (
        <li>
            <a href={link}>{children}</a>
        </li>
    )
}