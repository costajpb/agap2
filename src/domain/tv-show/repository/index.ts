import Repository from '../../shared/repository'
import TVShow from '../entity'

export default class TVShows implements Repository<TVShow> {
    readonly baseUrl: string
    private adapter: Repository<TVShow>['adapt']

    constructor(adapter: Repository<TVShow>['adapt']) {
        this.baseUrl = 'https://api.tvmaze.com'
        this.adapter = adapter
    }

    adapt(data: unknown) {
        return this.adapter(data)
    }

    async find(id: TVShow['id']): Promise<TVShow> {
        const response = await fetch(`${this.baseUrl}/shows/${id}?embed=episodes`)
        return this.adapt(await response.json()) as TVShow
    }
}
