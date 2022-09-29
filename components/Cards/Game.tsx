import { FC, PropsWithChildren } from 'react'
import Image from '../CustomImage'
import classes from '../../styles/cards.module.scss'
import Rating from '../Rating'
import { Games } from '../../utils/types'

type gameCardProps = {
  game: Games
  imgStyle?: any
  [x: string]: any
}

const GameCard: FC<PropsWithChildren<gameCardProps>> = ({ game, imgStyle, ...props }) => {
  return (
    <div className={classes.game} {...props}>
      <div className={classes.gameImage} style={imgStyle}>
        <Image src={game.backgroundImage} alt={game.title} layout={'fill'} />
      </div>
      <div className={classes.gameContent}>
        <h1 className={classes.title}>{game.title}</h1>
        <div className={classes.rating}>
          <Rating value={parseInt(`${game.rating}`)} count={game?.ratings_count} />
        </div>
        <p className={classes.description}>
          {game?.genres &&
            game?.genres.map((i) => (
              <a href={`/genre/${i.slug}`} className={classes.genre} key={i.slug}>
                {i.name}
              </a>
            ))}
        </p>
        <button className={classes.btn} type="button">
          $ {game.price} {game?.off ? `-${game?.off}%` : null}
        </button>
      </div>
    </div>
  )
}

export default GameCard
