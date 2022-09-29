import React from 'react'
import Section from '../components/MainPage/Section'
import genres from '../utils/genres.json'
import Layout from '../layout/Layout'
import { DiscoverGenres } from '../components/Genres'

const Browse = () => {
  return (
    <Layout meta={{ name: 'Browse' }}>
      <Section title={'Genres'}>
        <DiscoverGenres genres={genres?.results} />
      </Section>
    </Layout>
  )
}

export default Browse
