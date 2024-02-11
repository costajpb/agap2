import Repository from '../../shared/repository'
import Episode from '../entity'

export default class Episodes implements Repository<Episode> {
    readonly baseUrl: string
    private adapter: Repository<Episode>['adapt']

    constructor(adapter: Repository<Episode>['adapt']) {
        this.baseUrl = 'https://api.tvmaze.com'
        this.adapter = adapter
    }

    adapt(data: unknown) {
        return this.adapter(data)
    }

    async find(id: Episode['id']): Promise<Episode> {
        const response = await fetch(`${this.baseUrl}/episodes/${id}`)
        return this.adapt(await response.json()) as Episode
    }
}
