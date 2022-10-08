import React from 'react'
import Section from '../components/MainPage/Section'
import Layout from '../layout/Layout'
import { DiscoverGenres } from '../components/Genres'
import { getAllGenres } from '../lib/requests'

const Browse = ({ genres }) => {
  return (
    <Layout meta={{ name: 'Browse' }}>
      <Section title={'Genres'}>
        <DiscoverGenres genres={genres} />
      </Section>
    </Layout>
  )
}

export default Browse

export async function getStaticProps() {
  const { results: genres } = await getAllGenres()
  // await generateRssFeed()
  // await generateSitemap()
  return {
    props: { genres },
  }
}
