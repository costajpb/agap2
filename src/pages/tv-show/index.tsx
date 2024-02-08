import TVShowEntity from '../../domain/tv-show/entity'
import useUseCase from './use-use-case'
import TVShowUseCase from '../../application/tv-show/index'
import Repository from '../../domain/tv-show/repository'
import { useEffect, useMemo, useRef, useState } from 'react'
import List from '../../components/list'
import Episode from '../../domain/episode/entity'

type TVShowProps = {
    id: TVShowEntity['id']
}

const repository = new Repository()

export default function TVShow({ id }: TVShowProps) {
    const useCase = useMemo(() => new TVShowUseCase(repository, id), [id])

    const [tvShow, setTVShow] = useState<TVShowEntity | null>(null)

    useEffect(() => {
        const aw = async () => {
            const current = await useCase.current
            setTVShow(current)
        }
        aw()
    }, [useCase])

    return !!tvShow ? (
        <article>
            <h1>{tvShow.title}</h1>
            <div data-testid="description" dangerouslySetInnerHTML={{__html: tvShow.description}} />
            <img src={tvShow.coverImage} alt={tvShow.title} />
            <List<Episode> testId="episodes" items={tvShow.episodes} />
        </article>
    ) : (<></>)
}