import UseCase from "../shared/use-case";
import EpisodeEntity from '../../domain/episode/entity'
import Episodes from "../../domain/episode/repository";

export default class Episode extends UseCase<EpisodeEntity> {
    private id: EpisodeEntity['id']
    private _details?: Promise<EpisodeEntity>

    constructor(repository: Episodes, episode: EpisodeEntity['id']) {
        super(repository)
        this.id = episode
    }

    get details() {
        if (!this._details) this._details = (this.repository as Episodes).find(this.id)
        return this._details
    }
}