import Entity from '../../domain/episode/entity'

type EpisodeProps = {
    id: Entity['id']
}

export default function Episode({id}: EpisodeProps) {
    return (<>Hello world!</>)
}