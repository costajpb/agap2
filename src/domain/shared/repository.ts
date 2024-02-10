import Entity from "./entity";

export default interface Repository<T extends Entity> {
    readonly baseUrl: string
    find?: (id: T['id']) => Promise<T>
}