import EventEmitter from 'events';
import Episode from '../../domain/episode/entity';
import TVShowEntity from '../../domain/tv-show/entity'
import TVShows from '../../domain/tv-show/repository';
import UseCase, { Emitter } from '../shared/use-case';

export default class TVShow implements UseCase<TVShowEntity> {
    readonly repository: TVShows
    private showId: TVShowEntity['id']
    private _current?: Promise<TVShowEntity>
    private emitter: Emitter

    constructor(repository: TVShows, show: TVShowEntity['id'], emitter: Emitter = new EventEmitter) {
        this.repository = repository
        this.showId = show
        this.emitter = emitter
    }

    get current() {
        if (!this._current) this._current = (this.repository as TVShows).find(this.showId)
        return this._current
    }

    emit(event: string, data: unknown) {
        this.emitter.emit(event, data)
    }

    on(event: string, handler: (data: unknown) => void) {
        this.emitter.on(event, handler)
    }
    
    display(episode: Episode) {
        this.emit('tvshow:display', episode)
    }
}