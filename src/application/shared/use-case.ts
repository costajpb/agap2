import EventEmitter from 'events'
import Entity from '../../domain/shared/entity'
import Repository from '../../domain/shared/repository'

export interface Emitter {
    emit: (event: string, data: any) => void
    on: (event: string, handler: (data: any) => void) => void
}

export default abstract class UseCase<T extends Entity> implements Emitter {
    readonly repository: Repository<T>
    protected emitter: Emitter

    constructor(repository: Repository<T>, emitter: Emitter = new EventEmitter()) {
        this.repository = repository
        this.emitter = emitter
    }

    emit(event: string, data?: unknown) {
        this.emitter.emit(event, data)
    }

    on(event: string, handler: (data: unknown) => void) {
        this.emitter.on(event, handler)
    }
}
