import { FC, useEffect, useState } from 'react'
import classes from '../../styles/header.module.scss'
import { Games } from '../../utils/types'
import Carousel from './Carousel'

type headerProps = {
  games?: Games[]
}

const Header: FC<headerProps> = ({ games }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className={classes.header}>
      <Carousel mounted={mounted} games={games} />
    </header>
  )
}

export default Header
