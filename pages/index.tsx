import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { DiscoverGenres } from '../components/Genres'
import Layout from '../layout/Layout'
import GamesSlider from '../components/MainPage/GamesSlider'
import Header from '../components/MainPage/Header'
import Section from '../components/MainPage/Section'
import TrendingSection from '../components/MainPage/Trending'
import { getAllGames, getLatest, getTrending } from '../lib/requests'
import { Games } from '../utils/types'
import genres from '../utils/genres.json'
import Loader from '../components/Loader'

type homeProps = {
  games: Games[]
  latest: Games[]
  trending: Games[]
}

const Home: NextPage = ({ games, latest, trending }: homeProps) => {
  const { data: session, status } = useSession()
  if (status === 'loading') return <Loader size={10} />

  console.log('session', session)

  return (
    <Layout session={session} meta={{ name: 'Discover' }}>
      <Header games={games?.slice(0, 10)} />
      <TrendingSection title={'Trending'} games={trending} />
      <GamesSlider title={'Latest Releases'} games={latest} />
      <Section title={'Genres'}>
        <DiscoverGenres genres={genres?.results} />
      </Section>
    </Layout>
  )
}

export default Home

export async function getStaticProps() {
  const { games } = await getAllGames()
  const { games: trending } = await getTrending()
  const { games: latest } = await getLatest()
  return {
    props: { games, trending, latest },
  }
}
