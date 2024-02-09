import Entity from '../../domain/episode/entity'
import Repository from '../../domain/episode/repository'
import useUseCase from '../../hooks/use-use-case'
import UseCase from '../../application/episode/index'
import { useEffect, useState } from 'react'

type EpisodeProps = {
    id: Entity['id']
}

export default function Episode({id}: EpisodeProps) {
    const useCase = useUseCase(UseCase, new Repository, id) as (UseCase | undefined)
    const [details, setDetails] = useState<Entity | undefined>(undefined)

    useEffect(() => {
        if (!useCase) return
        const waitForUsecase = async () => {
            const details = await useCase.details
            setDetails(details)
        }
        waitForUsecase()
    }, [useCase])

    return !!details ? (
        <article>
            <h1>{details.title}</h1>
            <div data-testid="summary" dangerouslySetInnerHTML={{__html: details.summary}} />
            <img src={details.coverImage} alt={details.title} />
        </article>
    ) : (<></>)
}