import { FC } from 'react'
import classes from '../styles/loader.module.scss'

const Loader: FC<{ size: number }> = ({ size }) => {
  const dotStyle = { border: `${size} solid #ecf0f1`, margin: size * 2 }
  return (
    <div className={classes.loader}>
      <span className={classes.loaderElement} style={dotStyle}></span>
      <span className={classes.loaderElement} style={dotStyle}></span>
      <span className={classes.loaderElement} style={dotStyle}></span>
    </div>
  )
}

export default Loader
