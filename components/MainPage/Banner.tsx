import { FC } from 'react'
import Link from '../CustomLink'
import classes from '../../styles/banner.module.scss'
import Image from '../CustomImage'
import useWindowSize from '../../lib/hooks/useWindowSize'

const Banner: FC = (): JSX.Element => {
  const { width } = useWindowSize()
  return (
    <section className={classes.banner}>
      <div className={classes.bannerBg} style={{ width, height: 'auto' }}>
        <Image src={'/banner.png'} alt="" layout={'fill'} />
      </div>
      <h1 className={classes.bannerTitle}>Games Store</h1>
      <p className={classes.bannerDescription}>Thousands of games, all at one place.</p>
      <Link href={'explore'}>
        <button type={'button'}>Explore all </button>
      </Link>
    </section>
  )
}

export default Banner
