import { EventEmitter } from "stream";
import Repository from "../../shared/repository";
import TVShow from '../entity'
import Episodes from "../../episode/repository";

export default class TVShows implements Repository<TVShow> {
    static convert(data: unknown): TVShow {
        if (!(!!data && typeof data === 'object' && 'id' in data && 'name' in data && 'summary' in data && 'image' in data && !!data.image && typeof data.image === 'object' && 'original' in data.image && '_embedded' in data && !!data._embedded && typeof data._embedded === 'object' && 'episodes' in data._embedded)) {
            throw new Error('invalid data!')
        }
        return {
            id: parseInt(`${data.id}`),
            title: `${data.name}`,
            description: `${data.summary}`,
            coverImage: `${data.image.original}`,
            episodes: Episodes.adapt(data._embedded.episodes)
        }
    }
     
    static adapt(data: unknown): TVShow {
        return this.convert(data)
    }
    
    async find(id: TVShow['id']): Promise<TVShow> {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}?embed=episodes`)
        return TVShows.adapt(await response.json())
    }
}