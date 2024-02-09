import { useEffect, useRef } from 'react';
import TVShow from './pages/tv-show';
import Episode from './domain/episode/entity';
import { redirect } from 'react-router-dom';

function App() {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    ref.current?.addEventListener('tvshow:display', (event) => {
      const { id } = (event as CustomEvent).detail as Episode
      redirect(`/episodes/${id}`)
    })
  }, [ref.current])

  return (
    <div ref={ref}>
      <TVShow id={1} />
    </div>
  );
}

export default App;
