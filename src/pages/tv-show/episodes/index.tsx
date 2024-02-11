import { x } from '@xstyled/styled-components'
import Entity from '../../../domain/episode/entity'
import Entry from './entry'

type EpisodesProps = {
    data: Entity[]
    gridArea?: string
}

const Episodes = ({data, gridArea}: EpisodesProps) => (
    <x.div {...(gridArea ? {gridArea} : {})}>
        <x.h2 fontSize="2xl" textAlign={{_: 'initial', md: 'right'}} mb="4" color="emerald-600" fontWeight="bold">
            Episodes
        </x.h2>
        <x.ol
            maxHeight="60vh"
            overflow="auto"
            display="grid"
            gridTemplateColumns={{_: 1, sm: 2}}
            gap="4"
            data-testid="episodes"
        >
            {
                data.map(episode => (
                    <Entry key={episode.id} episode={episode} />
                ))
            }
        </x.ol>
    </x.div>
)

export default Episodes