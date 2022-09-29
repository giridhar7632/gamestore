import { FC } from 'react'
import classes from '../styles/progress.module.scss'

export const Progress: FC<{ value: number | string }> = ({ value }) => {
  return (
    <span className={classes.meter}>
      <span style={{ width: `${value}%` }}></span>
    </span>
  )
}
