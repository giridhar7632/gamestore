import { FC } from 'react'
import classes from '../styles/loader.module.scss'

const Loader: FC<{ size: number; containerStyles: any }> = ({ size = 5, containerStyles }) => {
  const dotStyle = { border: `${size}px solid #ecf0f1`, margin: `calc(${size}px * 2)` }
  return (
    <div className={classes.container} style={containerStyles}>
      <div className={classes.loader}>
        <span className={classes.loaderElement} style={dotStyle}></span>
        <span className={classes.loaderElement} style={dotStyle}></span>
        <span className={classes.loaderElement} style={dotStyle}></span>
      </div>
    </div>
  )
}

export default Loader
