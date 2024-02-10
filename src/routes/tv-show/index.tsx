import { useFindTVShowQuery } from "../../services/tvshow"
import Page from '../../pages/tv-show'

export default function TVShow() {
    const { data } = useFindTVShowQuery(6771)
    return !!data
        ? (<Page details={data} />)
        : (<></>)
}