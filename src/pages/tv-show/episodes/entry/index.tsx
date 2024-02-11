import { x } from '@xstyled/styled-components'
import Entity from '../../../../domain/episode/entity'
import Link from '../link'

type EntryProps = {
    episode: Entity
}

export default function Entry({ episode }: EntryProps) {
    return (
        <x.li
            h={{ _: 24, sm: 32, md: 24, lg: 32 }}
            bg="gray-200"
            borderRadius="2xl"
            position="relative"
            overflow="hidden"
        >
            <Link episode={episode} />
        </x.li>
    )
}
