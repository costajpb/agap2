import { useEffect, useRef, useState } from 'react'
import PageTitle from '../../components/page-title'
import Entity from '../../domain/episode/entity'
import { x } from '@xstyled/styled-components'
import UseCase from '../../application/episode'
import Repository from '../../domain/episode/repository'
import { Emitter } from '../tv-show'
import adapter from '../../adapters/episode'

type EpisodeProps = {
    details: Entity
}

export default function Episode({details}: EpisodeProps) {
    const articleRef = useRef<HTMLElement | null>(null)
    const [useCase, setUseCase] = useState<UseCase | undefined>(undefined)

    useEffect(() => {
        setUseCase(new UseCase(new Repository(adapter), details.id, new Emitter(articleRef.current ?? undefined)))
    }, [details.id, articleRef])

    useEffect(() => {
        if (!useCase) return
        articleRef.current?.addEventListener('click', async (event): Promise<void> => {
            const target = event.target as HTMLElement
            if (target.tagName === 'A') {
                event.preventDefault()
                useCase.return()
            }
        })
    }, [useCase, articleRef])

    return (
        <x.article
            display="flex"
            flexDirection="column"
            gap="8"
            ref={articleRef}
        >
            <PageTitle>{details.title}</PageTitle>
            {
                !!details.summary
                ? (<x.div order="1" data-testid="summary" dangerouslySetInnerHTML={{__html: details.summary}} />)
                : (<p>There is no summary for this episode.</p>)
            }
            {!!details.coverImage && (<x.img order="0" src={details.coverImage} alt={details.title} />)}
            <x.a className="arrow" order="1" alignSelf="start" borderWidth="2" transition fontWeight="bold" color={{_: 'emerald-600', '&:hover': 'white'}} bg={{_: 'transparent', '&:hover': 'gray-500'}} textDecoration="none" href="/">Return</x.a>
        </x.article>
    )
}