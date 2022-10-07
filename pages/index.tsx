import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { DiscoverGenres } from '../components/Genres'
import Layout from '../layout/Layout'
import GamesSlider from '../components/MainPage/GamesSlider'
import Header from '../components/MainPage/Header'
import Section from '../components/MainPage/Section'
import TrendingSection from '../components/MainPage/Trending'
import { getAllGames } from '../lib/requests'
import { Games } from '../utils/types'
import genres from '../utils/genres.json'
import Loader from '../components/Loader'
import generateSitemap from '../lib/sitemap'
import generateRssFeed from '../lib/rss'
// import Cart from '../components/cart/Cart'

type homeProps = {
  games: Games[]
  latest: Games[]
  trending: Games[]
}

const Home: NextPage = ({ games }: homeProps) => {
  const { data: session, status } = useSession()
  if (status === 'loading') return <Loader size={5} containerStyles={{ height: '100vh' }} />

  console.log('session', session)

  return (
    <Layout session={session} meta={{ name: 'Discover' }}>
      <Header games={games?.slice(0, 10)} />
      <TrendingSection title={'Trending'} />
      <GamesSlider title={'Latest Releases'} />
      <Section title={'Genres'}>
        <DiscoverGenres genres={genres?.results} />
      </Section>
    </Layout>
  )
  // return <Cart />
}

export default Home

export async function getStaticProps() {
  const { games } = await getAllGames()
  // await generateRssFeed()
  // await generateSitemap()
  return {
    props: { games },
  }
}
