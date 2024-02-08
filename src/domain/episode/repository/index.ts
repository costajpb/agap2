import Repository from "../../shared/repository";
import Episode from "../entity";

export default class Episodes implements Repository<Episode> {
    static convert(data: unknown): T {
        if (!(!!data && typeof data === 'object' && 'name' in data && 'summary' in data && 'image' in data && !!data.image && typeof data.image === 'object' && 'original' in data.image))
            throw new Error('Wrong data format!')
        return {
            title: data.name,
            summary: data.summary,
            coverImage: data.image.original
        }
    }

    static adapt(data: unknown): T[] {
        if (!Array.isArray(data)) throw new Error('data is not an array!')

        return data.map(Episodes.convert)
    }
}