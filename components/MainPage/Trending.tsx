import { FC } from 'react'
import { motion } from 'framer-motion'
import Trending from '../Cards/Trending'
import SliderContainer from '../SliderContainer'
import classes from '../../styles/header.module.scss'
import { useTrendingGames } from '../../lib/hooks/useGetGames'
import Loader from '../Loader'

type tendingSliderProps = {
  title: string
}

const TrendingSection: FC<tendingSliderProps> = ({ title }) => {
  const { isLoading, isError, data, error } = useTrendingGames()
  return (
    <section className={classes.section} style={{ zIndex: 6, position: 'relative' }}>
      <h2 className={classes.sectionTitle}>{title}</h2>
      {isLoading ? (
        <Loader size={2} containerStyles={{ height: 100 }} />
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
          {data?.games.map((game) => (
            <motion.div
              className={classes.trendingItem}
              key={game.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Trending
                style={{
                  backgroundImage: `url(${game.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
                game={game}
              />
            </motion.div>
          ))}
        </SliderContainer>
      )}
    </section>
  )
}
export default TrendingSection
