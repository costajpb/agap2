import Entity from '../../domain/episode/entity'
import Repository from '../../domain/episode/repository'
import useUseCase from '../../hooks/use-use-case'
import UseCase from '../../application/episode/index'
import { useEffect, useState } from 'react'
import { useFindEpisodeQuery } from '../../services/episode'

type EpisodeProps = {
    id: Entity['id']
}

export default function Episode({id}: EpisodeProps) {
    const { data: details } = useFindEpisodeQuery(id)

    return !!details ? (
        <article>
            <h1>{details.title}</h1>
            <div data-testid="summary" dangerouslySetInnerHTML={{__html: details.summary}} />
            <img src={details.coverImage} alt={details.title} />
        </article>
    ) : (<></>)
}