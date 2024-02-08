import EventEmitter from "events";
import Entity from "./entity";

export default interface Repository<T extends Entity> {
    find?: (id: T['id']) => Promise<T>
}