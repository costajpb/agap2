import Episode from '../../domain/episode/entity';
import Repository from '../../domain/shared/repository';
import TVShowEntity from '../../domain/tv-show/entity'
import UseCase from '../shared/use-case';

export default class TVShow extends UseCase<TVShowEntity> {
    private showId: TVShowEntity['id']
    private _current?: Promise<TVShowEntity>

    constructor(repository: Repository<TVShowEntity>, show: TVShowEntity['id']) {
        super(repository)
        this.showId = show
    }

    get current() {
        if (!this._current) this._current = this.repository.find(this.showId)
        return this._current
    }
    
    display(episode: Episode) {
        this.emit('tvshow:display', episode)
    }
}