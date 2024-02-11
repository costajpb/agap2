import TVShowEntity from '../../domain/tv-show/entity'
import TVShowUseCase from '../../application/tv-show/index'
import Repository from '../../domain/tv-show/repository'
import { useEffect, useRef, useState } from 'react'
import List from '../../components/list'
import Item from '../../components/list/item'
import { x } from '@xstyled/styled-components'
import PageTitle from '../../components/page-title'

type TVShowProps = {
    details: TVShowEntity
}

const repository = new Repository()

export class Emitter {
    private element?: HTMLElement

    constructor(element?: HTMLElement) {
        this.element = element
    }

    emit(event: string, data?: object) {
        this.element?.dispatchEvent(new CustomEvent(event, {
            bubbles: true,
            detail: data
        }))
    }

    on(event: string, handler: (data: object) => void) {
        this.element?.addEventListener(event, handler)
    }
}

export default function TVShow({ details }: TVShowProps) {
    const articleRef = useRef<HTMLElement | null>(null)
    const [useCase, setUseCase] = useState<TVShowUseCase | undefined>(undefined)

    useEffect(() => {
        setUseCase(new TVShowUseCase(repository, details.id, new Emitter(articleRef.current ?? undefined)))
    }, [details.id, articleRef])

    useEffect(() => {
        if (!useCase) return
        articleRef.current?.addEventListener('click', async (event): Promise<void> => {
            const target = event.target as HTMLElement
            if (target.tagName === 'A') {
                event.preventDefault()
                const episode = (await useCase.current).episodes.find(({id}) => id === parseInt(`${target.dataset.episodeId}`))
                if (!episode) throw new Error('episode not found!')
                useCase.display(episode)
            }
        })
    }, [useCase, articleRef])

    return (
        <x.article
            display={{_: 'flex', md: 'grid'}}
            flexDirection="column"
            gridTemplateColumns={2}
            gridTemplateAreas='"a b" "a c" "a d" "a e"'
            gap="8"
            ref={articleRef}
        >
            {
                !!details
                ? (
                    <>
                        <PageTitle textAlign={{_: 'initial', md: 'right'}} gridArea="b">{details.title}</PageTitle>
                        <x.div gridArea="c" textAlign="justify" data-testid="description" dangerouslySetInnerHTML={{__html: details.description}} />
                        <x.img order="1" data-testid="cover-image" maxWidth="100%" gridArea="a"  src={details.coverImage} alt={details.title} />
                        <x.h2 fontSize="2xl" textAlign={{_: 'initial', md: 'right'}} gridArea="d" color="emerald-600" fontWeight="bold">
                            Episodes
                        </x.h2>
                        <List testId="episodes">
                            {
                                details.episodes.map(episode => (
                                    <Item key={episode.id}>
                                        <x.a transform={{'&:hover span': 'translateY(0)'}} position="absolute" h="100%" w="100%" data-testid="episode" data-episode-id={episode.id} href={`/episodes/${episode.id}`}>
                                            <x.img maxWidth="100%" position="absolute" top="0" left="0" alt={episode.title} src={episode.coverImage} />
                                            <x.span
                                                transition
                                                transitionDuration={500}
                                                transform={'translateY(100%)'}
                                                py="2" px="4" fontWeight="semibold" textAlign="right" color="white" bg="gray-700" display="block" w="100%" position="absolute" bottom="0"
                                            >{episode.title}</x.span>
                                        </x.a>
                                    </Item>
                                ))
                            }
                        </List>
                    </>
                )
                : <></>
            }
        </x.article>
    )
}