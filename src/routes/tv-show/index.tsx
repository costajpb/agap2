import { useFindTVShowQuery } from '../../store/apis/tvshow'
import Page from '../../pages/tv-show'
import Loader from '../../components/loader'

export default function TVShow() {
    const { data } = useFindTVShowQuery(6771)
    return !!data ? <Page details={data} /> : <Loader />
}
