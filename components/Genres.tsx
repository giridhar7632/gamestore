import { FC } from 'react'
import classes from '../styles/genres.module.scss'
import { Genres } from '../utils/types'
import SliderContainer from './SliderContainer'

export const ExploreGenres: FC<{ genres: Genres[] }> = ({ genres }) => (
  <div className={classes.genresContainer}>
    <SliderContainer>
      {genres.map((i, idx) => (
        <div
          key={idx}
          className={classes.genreItem}
          style={{
            backgroundImage: `radial-gradient(rgba(17, 17, 17, 0.4), rgba(17, 17, 17, 0.3)), url(${i?.image_background})`,
          }}
        >
          <a
            href={`/genre/${i.slug}`}
            style={{ zIndex: 5, position: 'relative' }}
            className={classes.name}
          >
            {i?.name}
          </a>
          <p className={classes.count}>{i?.games_count} games</p>
        </div>
      ))}
    </SliderContainer>
  </div>
)

export const DiscoverGenres: FC<{ genres: Genres[] }> = ({ genres }) => (
  <div className={classes.genresFlexContainer}>
    {genres.map((i, idx) => (
      <a href={`/genre/${i.slug}`} key={idx}>
        <div
          className={classes.genreItem}
          style={{
            backgroundImage: `radial-gradient(rgba(17, 17, 17, 0.4), rgba(17, 17, 17, 0.2)), url(${i?.image_background})`,
          }}
        >
          <p className={classes.name}>{i?.name}</p>
          <p className={classes.count}>{i?.games_count} games</p>
        </div>
      </a>
    ))}
  </div>
)
