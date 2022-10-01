import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Rating from '../../components/Rating'
import Image from '../../components/CustomImage'
import Link from '../../components/CustomLink'
import Layout from '../../layout/Layout'
import { getAllGames, getLatest, getSingleGame, getTrending } from '../../lib/requests'
import SliderContainer from '../../components/SliderContainer'
import { Star } from '../../utils/icons'
import { Progress } from '../../components/Progress'
import { NextPage } from 'next'
import { Game } from '../../utils/types'
import Loader from '../../components/Loader'
import { useGetGameScreenshots } from '../../lib/hooks/useGetGames'
import classes from '../../styles/game.module.scss'
import tags from '../../styles/tag.module.scss'

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
  const { isLoading, isError, data: screenshots, error } = useGetGameScreenshots(game.slug)

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
              <div className={classes.price}>
                <div className={classes.cost}>$ {game.price} </div>
                {game.off ? <div className={tags.bigTag}>{`-${game.off}%`}</div> : null}
              </div>
            </div>
          </Section>
          <div className={classes.btnContainer}>
            <button type="button" className={`${classes.secondary} ${classes.btn}`}>
              Add To Cart
            </button>
            <button type="button" className={`${classes.primary} ${classes.btn}`}>
              Buy Now
            </button>
          </div>
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
              {isLoading ? (
                <Loader size={5} containerStyles={{ height: 281.25 }} />
              ) : isError ? (
                <div
                  style={{
                    height: 100,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    fontWeight: 'bold',
                    opacity: 0.3,
                    color: '#f5f5f5',
                  }}
                >
                  {error ? error.message : 'Something went wrong! 😕'}
                </div>
              ) : (
                <SliderContainer>
                  {screenshots?.map((i, idx) => (
                    <div key={idx} className={classes.sliderItemImage}>
                      <Image src={i} alt={''} layout={'fill'} style={{ borderRadius: 10 }} />
                    </div>
                  ))}
                </SliderContainer>
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
                    <span className={classes.ratingItem}>{item.count + ' · ' + item.title}</span>
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
  const { games: trending } = await getTrending()
  const { games: latest } = await getLatest()
  return {
    paths: [...games, ...trending, ...latest].map((game) => {
      return {
        params: {
          slug: game.slug,
        },
      }
    }),
    fallback: true,
  }
}
