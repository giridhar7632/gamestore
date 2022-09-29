import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Rating from '../../components/Rating'
import Image from '../../components/CustomImage'
import Link from '../../components/CustomLink'
import Layout from '../../layout/Layout'
import { getAllGames, getSingleGame, getSingleGameScreenshots } from '../../lib/requests'
import SliderContainer from '../../components/SliderContainer'
import { Star } from '../../utils/icons'
import { Progress } from '../../components/Progress'
import classes from '../../styles/game.module.scss'
import { NextPage } from 'next'
import { Game } from '../../utils/types'
import { fetcher } from '../../utils/fetcher'
import Loader from '../../components/Loader'

type singleGame = {
  game: Game
}

export const Section: FC<PropsWithChildren<{ [x: string]: any }>> = ({ children, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 300 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{
      y: { type: 'spring', stiffness: 300, damping: 30 },
      duration: 0.2,
    }}
    {...props}
  >
    {children}
  </motion.div>
)

const SingleGame: NextPage = ({ game }: singleGame) => {
  const [screenshots, setScreenshots] = useState([])
  useEffect(() => {
    ;(async () => {
      const { data: ss }: { data: string[] } = await fetcher('/api/games/screenshots', {
        method: 'POST',
        body: {
          id: game.slug,
        },
      })
      setScreenshots(ss)
    })()
  }, [])

  console.log(screenshots)

  return (
    <Layout meta={{ name: game.title, description: game.description_raw }}>
      <div
        className={classes.bg}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(17, 17, 17, 0.35), rgba(17, 17, 17, 0.4)), url(${game.extraImg})`,
        }}
      />
      <main className={classes.game}>
        <div className={classes.gameContainer}>
          <Section className={classes.details}>
            <div className={classes.image}>
              <Image src={game.backgroundImage} alt={''} layout="fill" />
            </div>
            <div className={classes.text}>
              <h1 className={classes.title}>{game.title}</h1>
              <div className={classes.extra}>
                <span>{new Date(game.released).getFullYear()}</span>
                {' · '}
                <Link href={game.officialSite} external>
                  Official Website
                </Link>
              </div>
              <Rating value={parseInt(`${game.rating}`)} count={game.ratings_count} />
              <div className={classes.btnContainer}>
                <button type="button" className={`${classes.secondary} ${classes.btn}`}>
                  Add To Cart
                </button>
                <button type="button" className={`${classes.primary} ${classes.btn}`}>
                  Add To Cart
                </button>
              </div>
            </div>
          </Section>
          <div className={classes.genres}>
            {game?.genres?.map((i) => (
              <span className={classes.genre} key={i.id}>
                {i.name}
              </span>
            ))}
          </div>
          {/* <div className={classes.genres}>
            {game?.genres?.map((i) => (
              <Link
                href={`/genre/${i.slug}`}
                className={classes.genre}
                key={i.id}
              >
                {i.name}
              </Link>
            ))}
          </div> */}
          <Section className={classes.section}>
            <h2>ScreenShots</h2>
            <div className={classes.slider}>
              {screenshots.length ? (
                <SliderContainer>
                  {screenshots?.map((i, idx) => (
                    <div key={idx} className={classes.sliderItemImage}>
                      <Image src={i} alt={''} layout={'fill'} style={{ borderRadius: 10 }} />
                    </div>
                  ))}
                </SliderContainer>
              ) : (
                <div
                  style={{
                    height: 281.25,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Loader size={10} />
                </div>
              )}
            </div>
          </Section>

          <Section className={classes.section}>
            <h2>Description</h2>
            <div dangerouslySetInnerHTML={{ __html: game.description }}></div>
          </Section>
          <Section className={classes.section}>
            <h2>Ratings & Reviews</h2>
            <div className={classes.ratingReview}>
              <div className={classes.rating}>
                <div className={classes.number}>{game.rating}</div>
                <p className={classes.count}>{game.ratings_count + ' '} Ratings</p>
              </div>
              <div className={classes.reviews}>
                {game?.ratings?.map((item) => (
                  <div key={item.id} className={classes.review}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                      {item.id}{' '}
                      <Star
                        fill={'#f7c705'}
                        style={{
                          color: '#f7c705',
                          width: 12,
                          margin: '0 10px',
                        }}
                      />{' '}
                    </span>
                    <Progress value={item.percent} />
                    <span style={{ marginLeft: 10, fontSize: 14 }}>
                      {item.count + ' · ' + item.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {game?.platforms.length ? (
            <Section className={classes.section}>
              <h2>Platforms</h2>
              <div className={classes.slider}>
                <SliderContainer>
                  {game.platforms?.map((i, idx) => (
                    <div
                      key={idx}
                      className={classes.sliderItemPlatform}
                      style={{
                        backgroundImage: `linear-gradient(rgba(17, 17, 17, 0.5), rgba(17, 17, 17, 0.6)), url(${i.platform?.image_background})`,
                      }}
                    >
                      <span className={classes.name}>{i?.platform?.name}</span>
                    </div>
                  ))}
                </SliderContainer>
              </div>
            </Section>
          ) : null}
        </div>
      </main>
    </Layout>
  )
}

export default SingleGame

export async function getStaticProps({ params }) {
  const game = await getSingleGame(params.slug)
  return {
    props: {
      game,
    },
  }
}

export async function getStaticPaths() {
  const { games } = await getAllGames()
  return {
    paths: games.map((game) => {
      return {
        params: {
          slug: game.slug,
        },
      }
    }),
    fallback: false,
  }
}
