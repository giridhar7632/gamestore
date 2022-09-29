import { FC } from 'react'
import classes from '../../styles/cards.module.scss'
import { Star } from '../../utils/icons'
import { Games } from '../../utils/types'

type trendingCardProps = {
  game: Games
  [x: string]: any
}

const TrendingCard: FC<trendingCardProps> = ({ game, ...props }) => {
  return (
    <div className={classes.trending} {...props}>
      <div className={classes.rating}>
        <Star fill={'#f7c705'} style={{ color: '#f7c705', width: 14, marginRight: 5 }} />
        {game?.rating}
      </div>
      <h2 className={classes.title}>{game?.title}</h2>
      {game?.price ? (
        <div className={classes.controls}>
          <div className={classes.price}>${game?.price}</div>
          <button className={classes.cart}>Buy Now</button>
        </div>
      ) : null}
    </div>
  )
}

export default TrendingCard
