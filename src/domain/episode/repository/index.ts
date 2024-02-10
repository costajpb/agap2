import Repository from "../../shared/repository";
import Episode from "../entity";

export default class Episodes implements Repository<Episode> {
    readonly baseUrl: string;

    constructor() {
        this.baseUrl = 'https://api.tvmaze.com'
    }

    static convert(data: unknown): Episode {
        if (!(!!data && typeof data === 'object' && 'id' in data && 'name' in data)) {
            throw new Error('Wrong data format!')
        }
        return {
            id: parseInt(`${data.id}`),
            title: `${data.name}`,
            summary: 'summary' in data && !!data.summary ? `${data.summary}` : undefined,
            coverImage: 'image' in data && !!data.image && typeof data.image === 'object' && 'original' in data.image ? `${data.image.original}` : undefined
        }
    }

    static adapt(data: unknown): Episode | Episode[] {
        return Array.isArray(data)
            ? data.map(Episodes.convert)
            : Episodes.convert(data)
    }

    async find(id: Episode['id']): Promise<Episode> {
        const response = await fetch(`${this.baseUrl}/episodes/${id}`)
        return Episodes.adapt(await response.json()) as Episode
    }
}