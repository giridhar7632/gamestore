import { FC } from 'react'
import { Star, StarHalf } from '../utils/icons'

type ratingProps = {
  value: number
  count?: string | number
}

const Rating: FC<ratingProps> = ({ value, count }) => {
  const total = Math.floor(value)
  const half = Math.ceil(value - total)
  return (
    <div
      style={{
        width: 'max-content',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      {new Array(total).fill(0).map((_, idx) => (
        <Star key={idx} fill={'#f7c705'} style={{ color: '#f7c705', width: 14, marginRight: 5 }} />
      ))}
      {new Array(half).fill(0).map((_, idx) => (
        <StarHalf
          key={idx}
          fill={'#f7c705'}
          style={{ color: '#f7c705', width: 14, marginRight: 5 }}
        />
      ))}
      {new Array(5 - (total + half)).fill(0).map((_, idx) => (
        <Star key={idx} style={{ color: '#C4C4C4', width: 14, marginRight: 5 }} />
      ))}
      {!!count ? (
        <span style={{ marginLeft: 5, color: '#C4C4C4', fontSize: 14 }}>{count}</span>
      ) : null}
    </div>
  )
}

export default Rating
