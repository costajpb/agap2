import Entity from "../../domain/shared/entity";
import Repository from "../../domain/shared/repository";

export interface Emitter {
    emit: (event: string, data: any) => void
    on: (event: string, handler: (data: any) => void) => void
}

export default interface UseCase<T extends Entity> extends Emitter {
    readonly repository: Repository<T>
}