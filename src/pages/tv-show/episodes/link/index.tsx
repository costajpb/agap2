import { x } from '@xstyled/styled-components'
import Entity from '../../../../domain/episode/entity'

type LinkProps = {
    episode: Entity
}

export default function Link({ episode }: LinkProps) {
    return (
        <x.a
            transform={{ '&:hover span': 'translateY(0)' }}
            position="absolute"
            h="100%"
            w="100%"
            data-testid="episode"
            data-episode-id={episode.id}
            href={`/episodes/${episode.id}`}
        >
            <x.img
                display={{ '&:before': 'block' }}
                p={{ '&:before': 4 }}
                color="white"
                objectFit="cover"
                w="100%"
                h="100%"
                alt={episode.title}
                src={episode.coverImage}
            />
            <x.span
                transition
                transitionDuration={500}
                // XXX: over 100% to ensure hideaway on certain screen sizes
                transform={'translateY(105%)'}
                py="2"
                px="4"
                fontWeight="semibold"
                textAlign="right"
                color="white"
                bg="gray-700"
                display="block"
                w="100%"
                position="absolute"
                bottom="0"
            >
                {episode.title}
            </x.span>
        </x.a>
    )
}
