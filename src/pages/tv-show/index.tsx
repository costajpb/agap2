import TVShowEntity from '../../domain/tv-show/entity'
import TVShowUseCase from '../../application/tv-show/index'
import Repository from '../../domain/tv-show/repository'
import { useEffect, useRef, useState } from 'react'
import Episodes from './episodes'
import { x } from '@xstyled/styled-components'
import PageTitle from '../../components/page-title'
import adapter from '../../adapters/tv-show'

type TVShowProps = {
    details: TVShowEntity
}

const repository = new Repository(adapter)

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
                gridTemplateAreas='"a b" "a c" "a d"'
                gap="8"
                ref={articleRef}
            >
                <PageTitle textAlign={{_: 'initial', md: 'right'}} gridArea="b">{details.title}</PageTitle>
                <x.div gridArea="c" textAlign="justify" data-testid="description" dangerouslySetInnerHTML={{__html: details.description}} />
                <x.img order="1" data-testid="cover-image" maxWidth="100%" gridArea="a"  src={details.coverImage} alt={details.title} />
                <Episodes data={details.episodes} gridArea="d" />
            </x.article>
        )
}