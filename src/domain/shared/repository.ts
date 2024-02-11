import Entity from "./entity";

export default interface Repository<T extends Entity> {
    adapt(data: unknown): T | T[]
    readonly baseUrl: string
    find?: (id: T['id']) => Promise<T>
}