import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { DiscoverGenres } from '../components/Genres'
import Layout from '../layout/Layout'
import GamesSlider from '../components/MainPage/GamesSlider'
import Header from '../components/MainPage/Header'
import Section from '../components/MainPage/Section'
import TrendingSection from '../components/MainPage/Trending'
import { getAllGames, getAllGenres } from '../lib/requests'
import { Games, Genres } from '../utils/types'
import Loader from '../components/Loader'
import generateSitemap from '../lib/sitemap'
import generateRssFeed from '../lib/rss'
// import Cart from '../components/cart/Cart'

type homeProps = {
  games: Games[]
  genres: Genres[]
  latest: Games[]
  trending: Games[]
}

const Home: NextPage = ({ games, genres }: homeProps) => {
  const { data: session, status } = useSession()
  if (status === 'loading') return <Loader size={5} containerStyles={{ height: '100vh' }} />

  return (
    <Layout session={session} meta={{ name: 'Discover' }}>
      <Header games={games?.slice(0, 10)} />
      <TrendingSection title={'Trending'} />
      <GamesSlider title={'Latest Releases'} />
      <Section title={'Genres'}>
        <DiscoverGenres genres={genres} />
      </Section>
    </Layout>
  )
  // return <Cart />
}

export default Home

export async function getStaticProps() {
  const { games } = await getAllGames()
  const { results: genres } = await getAllGenres()
  // await generateRssFeed()
  // await generateSitemap()
  return {
    props: { games, genres },
  }
}
