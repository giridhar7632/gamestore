import { FC } from 'react'
import { motion } from 'framer-motion'
import Game from '../Cards/Game'
import SliderContainer from '../SliderContainer'
import classes from '../../styles/header.module.scss'
import Loader from '../Loader'
import { useLatestGames } from '../../lib/hooks/useGetGames'

type gamesSliderProps = {
  title: string
}

const GamesSlider: FC<gamesSliderProps> = ({ title }) => {
  const { isLoading, isError, data, error } = useLatestGames()
  return (
    <section className={classes.section}>
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
              key={game.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Game game={game} />
            </motion.div>
          ))}
        </SliderContainer>
      )}
    </section>
  )
}

export default GamesSlider
