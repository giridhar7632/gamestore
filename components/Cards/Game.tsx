import { FC, PropsWithChildren } from 'react'
import Image from '../CustomImage'
import Rating from '../Rating'
import { Games } from '../../utils/types'
import classes from '../../styles/cards.module.scss'
import tags from '../../styles/tag.module.scss'
import Link from '../CustomLink'

type gameCardProps = {
  game: Games
  imgStyle?: any
  [x: string]: any
}

const GameCard: FC<PropsWithChildren<gameCardProps>> = ({ game, imgStyle, ...props }) => {
  return (
    <div className={classes.game} {...props}>
      <div className={classes.gameDiscount}>
        {game?.off ? <span className={tags.smallTag}>{`-${game?.off}%`}</span> : null}
      </div>

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
              <Link href={`/genre/${i.slug}`} className={classes.genre} key={i.slug}>
                {i.name}
              </Link>
            ))}
        </p>
        <Link href={`/game/${game.slug}`}>
          <button className={classes.btn} type="button">
            $ {game.price}
          </button>
        </Link>
      </div>
    </div>
  )
}

export default GameCard
