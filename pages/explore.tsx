import { useRouter } from 'next/router'
import Game from '../components/Cards/Game'
import Section from '../components/MainPage/Section'
import genres from '../utils/genres.json'
import Layout from '../layout/Layout'
import { ExploreGenres } from '../components/Genres'
import useWindowSize from '../lib/hooks/useWindowSize'
import { useGetGames } from '../lib/hooks/useGetGames'
import Loader from '../components/Loader'
import classes from '../styles/explore.module.scss'
import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from '../utils/icons'
import { removeUndefined } from '../utils/removeUndefined'

const Explore = () => {
  const router = useRouter()
  const { pathname, query } = router
  const [page, setPage] = useState<number>(parseInt(`${query?.page}`) || 1)
  const { isLoading, isError, data, error } = useGetGames({ page })
  const { width } = useWindowSize()
  const changeQuery = (page) =>
    router.push({
      pathname,
      query: removeUndefined({
        page,
      }),
    })

  useEffect(() => {
    changeQuery(page)
  }, [page])

  return (
    <Layout meta={{ name: 'Explore' }}>
      <div className={classes.explore}>
        <Section title={'Genres'} style={{ marginTop: 30 }}>
          <ExploreGenres genres={genres?.results} />
        </Section>
        <Section title={'Games'}>
          <div className={classes.container}>
            {isLoading ? (
              <Loader size={5} containerStyles={{ height: '80vh' }} />
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

export default Explore
