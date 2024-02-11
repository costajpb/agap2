import TVShow from "../../domain/tv-show/entity";
import episodesAdapter from '../episode'

// const adaptSingleResource = (data: unknown): TVShow => {
//     if (!(!!data && typeof data === 'object' && 'id' in data && 'name' in data && 'summary' in data && 'image' in data && !!data.image && typeof data.image === 'object' && 'original' in data.image && '_embedded' in data && !!data._embedded && typeof data._embedded === 'object' && 'episodes' in data._embedded)) {
//         throw new Error('invalid data!')
//     }
//     return {
//         id: parseInt(`${data.id}`),
//         title: `${data.name}`,
//         description: `${data.summary}`,
//         coverImage: `${data.image.original}`,
//         episodes: episodesAdapter(data._embedded.episodes) as TVShow['episodes']
//     }
// }

// const adaptArrayOfResources = (data: unknown[]) => {
//     return data.map(adaptSingleResource)
// }

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
    // if (Array.isArray(data)) {
    //     return adaptArrayOfResources(data)
    // }
    // return adaptSingleResource(data)
}