import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Game from '../../components/Cards/Game'
import Section from '../../components/MainPage/Section'
import Layout from '../../layout/Layout'
import useWindowSize from '../../lib/hooks/useWindowSize'
import { useGetGames } from '../../lib/hooks/useGetGames'
import Loader from '../../components/Loader'
import classes from '../../styles/genre.module.scss'
import { ChevronLeft, ChevronRight } from '../../utils/icons'
import { removeUndefined } from '../../utils/removeUndefined'
import { getAllGenres, getGenreData } from '../../lib/requests'

const Genre = ({ genre }) => {
  const router = useRouter()
  const { pathname, query } = router
  const [page, setPage] = useState<number>(parseInt(`${query?.page}`) || 1)
  const [showMore, setShowMore] = useState<boolean>(false)
  const { isLoading, isError, data, error } = useGetGames({ page, genre: genre.slug })
  const { width } = useWindowSize()
  const changeQuery = (page) =>
    router.push({
      pathname,
      query: removeUndefined({
        ...query,
        page,
      }),
    })
  useEffect(() => {
    page > 1 && changeQuery(page)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <Layout meta={{ name: genre.name, description: genre.description }}>
      <div
        className={classes.bg}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(17, 17, 17, 0.35), rgba(17, 17, 17, 0.4)), url(${genre.image_background})`,
        }}
      />
      <div className={classes.description}>
        <div className={classes.title}>
          <div className={classes.background}>{genre.name}</div>
          <div className={classes.text}>{genre.name}</div>
        </div>
        <div className={classes.games}>{genre.games_count} Games</div>
        <div
          className={clsx(classes.genreDescription, showMore && classes.showMore)}
          dangerouslySetInnerHTML={{ __html: genre.description }}
        ></div>
        <div className={classes.btn} onClick={() => setShowMore((prev) => !prev)}>
          show {showMore ? 'less' : 'more'}
        </div>
      </div>
      <div className={classes.genre}>
        <Section title={'Games'}>
          <div className={classes.container}>
            {isLoading ? (
              <Loader size={5} containerStyles={{ height: '40vh' }} />
            ) : isError ? (
              <div className={classes.error} style={{ height: '100%' }}>
                {error ? error.message : 'Something went wrong! 😕'}
              </div>
            ) : (
              data?.games.map((game) => (
                <div style={{ flex: 1 }} key={game.id}>
                  <Game
                    game={game}
                    style={{
                      width: width < 720 ? '95%' : width > 800 && width < 1080 ? '95%' : 225,
                      maxWidth: '95vw',
                      margin: width < 720 ? '5px auto' : '10px auto',
                    }}
                    imgStyle={{ height: 100, minWidth: 150 }}
                  />
                </div>
              ))
            )}
          </div>
        </Section>
      </div>
      <div className={classes.pagination}>
        <button
          className={`${classes.paginationBtn}`}
          onClick={() => setPage((prev) => prev - 1)}
          disabled={data?.prev === null || isLoading}
        >
          <ChevronLeft height={24} color={'#fff'} style={{ marginRight: 10 }} />
          Prev
        </button>
        <button
          className={`${classes.paginationBtn}`}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={data?.next === null || isLoading}
        >
          Next
          <ChevronRight height={24} color={'#fff'} style={{ marginLeft: 10 }} />
        </button>
      </div>
    </Layout>
  )
}

export default Genre

export async function getStaticProps({ params }) {
  const genre = await getGenreData(params.slug)
  return {
    props: {
      genre,
    },
  }
}

export async function getStaticPaths() {
  const { results: genres } = await getAllGenres()
  return {
    paths: genres.map((game) => {
      return {
        params: {
          slug: game.slug,
        },
      }
    }),
    fallback: false,
  }
}
