import clsx from 'clsx'
import { useRouter } from 'next/router'
import Image from '../components/CustomImage'
import Link from '../components/CustomLink'
import { useEffect, useState } from 'react'
import classes from '../styles/Navbar.module.scss'
import { Cart, Heart, Logo, Search } from '../utils/icons'
import { getTime } from '../lib/requests'
import useWindowSize from '../lib/hooks/useWindowSize'

const Navbar = () => {
  const [time, setTime] = useState(getTime())
  const [active, setActive] = useState(false)
  const { width } = useWindowSize()
  const { pathname } = useRouter()
  const cartItems = 0
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return width > 960 ? (
    <div className={classes.navbar}>
      <Link href="/" className={classes.logo}>
        <Logo size={30} />
        <span className={classes.logoText}>Game Store</span>
      </Link>
      <nav role={'navigation'} className={classes.navigation}>
        <div className={classes.left}>
          <Link
            className={clsx(classes.navItem, classes.navLink, pathname === '/' && classes.active)}
            href={'/'}
          >
            Discover
          </Link>
          <Link
            className={clsx(
              classes.navItem,
              classes.navLink,
              pathname === '/explore' && classes.active,
            )}
            href={'/explore'}
          >
            Explore
          </Link>
          {pathname === '/' && (
            <Link className={clsx(classes.navItem, classes.navLink)} href={'/#deals'}>
              Deals
            </Link>
          )}
          <Link
            className={clsx(
              classes.navItem,
              classes.navLink,
              pathname === '/browse' && classes.active,
            )}
            href={'/browse'}
          >
            Browse
          </Link>
        </div>
        <div className={classes.right}>
          <div className={classes.navList}>
            <span className={clsx(classes.navItem, classes.icon)}>
              <Search size={30} />
            </span>
            <span className={clsx(classes.navItem, classes.icon)}>
              <Heart size={30} />
            </span>
            <span className={clsx(classes.navItem, classes.icon, classes.badgeContainer)}>
              <Cart size={30} />
              {cartItems ? <div className={classes.badge}>{cartItems}</div> : null}
            </span>
            <span className={clsx(classes.navItem, classes.profile)}>
              <Image
                src="https://api.multiavatar.com/thv.svg"
                alt="giridhar"
                width={40}
                height={40}
                style={{ display: 'inline-flex', alignSelf: 'center' }}
              />
            </span>
          </div>
          <div>
            <p>{time}</p>
          </div>
        </div>
      </nav>
    </div>
  ) : (
    <div className={classes.mobileNav}>
      <Link href="" className={classes.logo}>
        <Logo size={30} />
        {width > 720 ? <span className={classes.logoText}>Game Store</span> : null}
      </Link>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className={classes.icons}>
          <Heart className={classes.navItem} size={30} />
          <Cart className={classes.navItem} size={30} />
          <Image
            className={classes.navItem}
            src="https://api.multiavatar.com/giridhar.svg"
            alt="giridhar"
            width={40}
            height={40}
          />
        </div>

        <div
          onClick={() => setActive((prev) => !prev)}
          className={clsx(classes.toggle, active && classes.active)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={clsx(classes.sidebar, active && classes.show)}>
          <nav className={classes.sidebarMenu}>
            <Link className={classes.mobileNavItem} href="/">
              Discover
            </Link>
            <Link className={classes.mobileNavItem} href="/explore">
              Explore
            </Link>
            {pathname === '/' ? (
              <Link className={classes.mobileNavItem} href="/#deals">
                Deals
              </Link>
            ) : null}
            <Link className={classes.mobileNavItem} href="/browse">
              Search
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
