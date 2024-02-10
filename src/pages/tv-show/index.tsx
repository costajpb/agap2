import TVShowEntity from '../../domain/tv-show/entity'
import TVShowUseCase from '../../application/tv-show/index'
import Repository from '../../domain/tv-show/repository'
import { useEffect, useRef, useState } from 'react'
import List from '../../components/list'
import Item from '../../components/list/item'

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
        <article ref={articleRef}>
            {
                !!details
                ? (
                    <>
                    <h1>{details.title}</h1>
                    <div data-testid="description" dangerouslySetInnerHTML={{__html: details.description}} />
                    <img src={details.coverImage} alt={details.title} />
                    <List testId="episodes">
                        {
                            details.episodes.map(episode => (
                                <Item key={episode.id}>
                                    <a data-testid="episode" data-episode-id={episode.id} href={`/episodes/${episode.id}`}>
                                        {episode.title}
                                    </a>
                                </Item>
                            ))
                        }
                    </List>
                    </>
                )
                : <></>
            }
        </article>
    )
}