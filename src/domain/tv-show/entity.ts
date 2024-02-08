import Entity from "../shared/entity";
import Episode from '../episode/entity'

export default interface TVShow extends Entity {
    title: string
    description: string
    coverImage: string
    episodes: Episode[]
}