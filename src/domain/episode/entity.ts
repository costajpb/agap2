import Entity from "../shared/entity";

export default interface Episode extends Entity {
    title: string
    summary: string
    coverImage: string
}