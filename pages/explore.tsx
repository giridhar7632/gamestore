import Game from '../components/Cards/Game'
import Section from '../components/MainPage/Section'
import genres from '../utils/genres.json'
import Layout from '../layout/Layout'
import { ExploreGenres } from '../components/Genres'
import { getAllGames } from '../lib/requests'
import { useState } from 'react'
import { Games } from '../utils/types'
import useWindowSize from '../lib/hooks/useWindowSize'

const Explore = () => {
  const [games, setGames] = useState<Games[]>([])
  const { width } = useWindowSize()
  return (
    <Layout meta={{ name: 'Explore' }}>
      <Section title={'Genres'} style={{ marginTop: 30 }}>
        <ExploreGenres genres={genres?.results} />
      </Section>
      <Section title={'Games'}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}
        >
          {games.map((game) => (
            <Game
              key={game.id}
              game={game}
              style={{
                width: width < 720 ? 150 : 225,
                margin: width < 720 ? 0 : '10px 5px',
                marginBottom: 10,
              }}
              imgStyle={{ height: 100, minWidth: 150 }}
            />
          ))}
        </div>
      </Section>
    </Layout>
  )
}

export default Explore
