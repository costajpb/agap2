import TVShowEntity from '../../domain/tv-show/entity'
import TVShowUseCase from '../../application/tv-show/index'
import Repository from '../../domain/tv-show/repository'
import { useEffect, useRef, useState } from 'react'
import Episodes from './episodes'
import { x } from '@xstyled/styled-components'
import PageTitle from '../../components/page-title'
import adapter from '../../adapters/tv-show'
import { Emitter } from '../shared/emitter'
import usePreventLinkNavigation from '../../hooks/usePreventLinkNavigation'

type TVShowProps = {
    details: TVShowEntity
}

const repository = new Repository(adapter)

export default function TVShow({ details }: TVShowProps) {
    const articleRef = useRef<HTMLElement | null>(null)
    const [useCase, setUseCase] = useState<TVShowUseCase | undefined>(undefined)

    useEffect(() => {
        if (!!articleRef.current) setUseCase(new TVShowUseCase(repository, details.id, new Emitter(articleRef.current)))
    }, [details.id, articleRef])

    const target = usePreventLinkNavigation(articleRef.current ?? undefined)

    useEffect(() => {
        (async () => {
            if (target && useCase) {
                const episode = (await useCase.current).episodes.find(({id}) => id === parseInt(`${target.dataset.episodeId}`))
                if (!episode) throw new Error('episode not found!')
                useCase.display(episode)
            }
        })()
    }, [target, useCase])

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