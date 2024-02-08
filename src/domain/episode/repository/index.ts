import Repository from "../../shared/repository";
import Episode from "../entity";

export default class Episodes implements Repository<Episode> {
    static convert(data: unknown): Episode {
        if (!(!!data && typeof data === 'object' && 'id' in data && 'name' in data && 'summary' in data && 'image' in data && !!data.image && typeof data.image === 'object' && 'original' in data.image))
            throw new Error('Wrong data format!')
        return {
            id: parseInt(`${data.id}`),
            title: `${data.name}`,
            summary: `${data.summary}`,
            coverImage: `${data.image.original}`
        }
    }

    static adapt(data: unknown): Episode[] {
        if (!Array.isArray(data)) throw new Error('data is not an array!')

        return data.map(Episodes.convert)
    }
}