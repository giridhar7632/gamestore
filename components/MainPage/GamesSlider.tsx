import { FC } from 'react'
import { motion } from 'framer-motion'
import Game from '../Cards/Game'
import SliderContainer from '../SliderContainer'
import classes from '../../styles/header.module.scss'
import { Games } from '../../utils/types'

type gamesSliderProps = {
  title: string
  games: Games[]
}

const GamesSlider: FC<gamesSliderProps> = ({ title, games }) => (
  <section className={classes.section}>
    <h2 className={classes.sectionTitle}>{title}</h2>
    <SliderContainer>
      {games.map((game) => (
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
  </section>
)

export default GamesSlider
