import { useLoaderData } from "react-router-dom"
import { useFindEpisodeQuery } from "../../services/episode"
import Page from '../../pages/episode'
import Entity from '../../domain/episode/entity'

export default function Episode() {
    const { id } = useLoaderData() as {id: Entity['id']}
    const { data } = useFindEpisodeQuery(id)
    return !!data
        ? (<Page details={data} />)
        : (<></>)
}