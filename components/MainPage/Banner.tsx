import { FC } from 'react'
import Link from '../CustomLink'
import classes from '../../styles/banner.module.scss'
import { ArrowRight } from '../../utils/icons'

const Banner: FC = (): JSX.Element => {
  return (
    <section className={classes.banner}>
      <h1 className={classes.bannerTitle}>Games Store</h1>
      <p className={classes.bannerDescription}>Thousands of games, all at one place.</p>
      <Link href={'explore'}>
        <div className={classes.bannerLink}>
          <span className={classes.text}>Explore all</span>
          <span className={classes.icon}>
            <ArrowRight width={24} />
          </span>
        </div>
      </Link>
    </section>
  )
}

export default Banner
