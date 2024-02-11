import EventEmitter from 'events'
import Episode from '../../domain/episode/entity'
import TVShowEntity from '../../domain/tv-show/entity'
import TVShows from '../../domain/tv-show/repository'
import UseCase, { Emitter } from '../shared/use-case'

export default class TVShow extends UseCase<TVShowEntity> {
    private showId: TVShowEntity['id']
    private _current?: Promise<TVShowEntity>

    constructor(
        repository: TVShows,
        show: TVShowEntity['id'],
        emitter: Emitter = new EventEmitter()
    ) {
        super(repository, emitter)
        this.showId = show
    }

    get current() {
        if (!this._current) this._current = (this.repository as TVShows).find(this.showId)
        return this._current
    }

    display(episode: Episode) {
        this.emit('tvshow:display', episode)
    }
}
