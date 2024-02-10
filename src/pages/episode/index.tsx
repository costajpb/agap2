import Entity from '../../domain/episode/entity'

type EpisodeProps = {
    details: Entity
}

export default function Episode({details}: EpisodeProps) {

    return (
        <article>
            <h1>{details.title}</h1>
            <div data-testid="summary" dangerouslySetInnerHTML={{__html: details.summary}} />
            <img src={details.coverImage} alt={details.title} />
        </article>
    )
}