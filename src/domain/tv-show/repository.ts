import { EventEmitter } from "stream";
import Repository from "../shared/repository";
import TVShow from './entity'

export default class TVShows implements Repository<TVShow> {
    async find(id: TVShow['id']): Promise<TVShow> {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`)
        return await response.json()
    }
}