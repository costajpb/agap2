import { useEffect, useRef } from 'react';
import Episode from '../../domain/episode/entity';
import { Outlet, useNavigate } from 'react-router-dom';

function Root() {
  const ref = useRef<HTMLDivElement | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    ref.current?.addEventListener('tvshow:display', (event) => {
      const { id } = (event as CustomEvent).detail as Episode
      navigate(`/episodes/${id}`)
    })
  }, [ref.current])

  return (
    <div ref={ref}>
      <Outlet />
    </div>
  );
}

export default Root;
