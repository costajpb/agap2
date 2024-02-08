import EventEmitter from "events";
import Entity from "../../domain/shared/entity";
import Repository from "../../domain/shared/repository";

export default abstract class UseCase<T extends Entity> extends EventEmitter {
    readonly repository: Repository<T>

    constructor(repository: Repository<T>) {
        super()
        this.repository = repository
    }
}