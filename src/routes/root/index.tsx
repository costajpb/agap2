import { useEffect, useRef } from 'react'
import Episode from '../../domain/episode/entity'
import { Outlet, useNavigate } from 'react-router-dom'
import Container from '../../components/container'

function Root() {
    const ref = useRef<HTMLDivElement | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        ref.current?.addEventListener('tvshow:display', (event) => {
            const { id } = (event as CustomEvent).detail as Episode
            navigate(`/episodes/${id}`)
        })

        ref.current?.addEventListener('episode:return', (event) => {
            navigate('/')
        })
    }, [navigate])

    return (
        <div data-testid="root" ref={ref}>
            <Container>
                <Outlet />
            </Container>
        </div>
    )
}

export default Root
