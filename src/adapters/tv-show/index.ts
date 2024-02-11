import TVShow from "../../domain/tv-show/entity";
import episodesAdapter from '../episode'

export default (data: unknown): TVShow => {
    if (!(!!data && typeof data === 'object' && 'id' in data && 'name' in data && 'summary' in data && 'image' in data && !!data.image && typeof data.image === 'object' && 'original' in data.image && '_embedded' in data && !!data._embedded && typeof data._embedded === 'object' && 'episodes' in data._embedded)) {
        throw new Error('invalid data!')
    }
    return {
        id: parseInt(`${data.id}`),
        title: `${data.name}`,
        description: `${data.summary}`,
        coverImage: `${data.image.original}`,
        episodes: episodesAdapter(data._embedded.episodes) as TVShow['episodes']
    }
}