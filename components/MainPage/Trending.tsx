import { FC } from 'react'
import { motion } from 'framer-motion'
import Trending from '../Cards/Trending'
import SliderContainer from '../SliderContainer'
import classes from '../../styles/header.module.scss'
import { Games } from '../../utils/types'

type tendingSliderProps = {
  title: string
  games: Games[]
}

const TrendingSection: FC<tendingSliderProps> = ({ title, games }) => (
  <section className={classes.section} style={{ zIndex: 6, position: 'relative' }}>
    <h2 className={classes.sectionTitle}>{title}</h2>
    <SliderContainer>
      {games.map((game) => (
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
  </section>
)

export default TrendingSection
