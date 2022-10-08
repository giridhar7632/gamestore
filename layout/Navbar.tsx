import clsx from 'clsx'
import { useRouter } from 'next/router'
import Image from '../components/CustomImage'
import Link from '../components/CustomLink'
import { useEffect, useState } from 'react'
import classes from '../styles/Navbar.module.scss'
import { Cart as CartIcon, Heart, Logo, Search } from '../utils/icons'
import { getTime } from '../lib/requests'
import useWindowSize from '../lib/hooks/useWindowSize'
import { useAuth } from '../lib/hooks/useAuth'
import { useCart } from '../components/cart/hooks/useCart'

const Navbar = () => {
  const { session, signOut } = useAuth()
  const [time, setTime] = useState(getTime())
  const [active, setActive] = useState(false)
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const { width } = useWindowSize()
  const { pathname } = useRouter()
  const {
    state: { cart },
    dispatch,
  } = useCart()
  const handleOpenMenu = () => {
    console.log('open')
    dispatch({ type: 'openMenu' })
  }
  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false)
      } else {
        setShow(true)
      }
      setLastScrollY(window.scrollY)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastScrollY])

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
          {/* <Link
            className={clsx(
              classes.navItem,
              classes.navLink,
              pathname === '/browse' && classes.active,
            )}
            href={'/browse'}
          >
            Browse
          </Link> */}
        </div>
        <div className={classes.right}>
          {session ? (
            <div className={classes.navList}>
              {/* <span className={clsx(classes.navItem, classes.icon)}>
                <Search size={30} />
              </span> */}
              {/* <span className={clsx(classes.navItem, classes.icon)}>
                <Heart size={30} />
              </span> */}
              <span
                className={clsx(classes.navItem, classes.icon, classes.badgeContainer)}
                onClickCapture={handleOpenMenu}
              >
                <CartIcon size={30} />
                {cart ? <div className={classes.badge}>{cart}</div> : null}
              </span>
              <span className={clsx(classes.navItem, classes.profile)}>
                <Image
                  src={session.user.image}
                  alt={session.user.name}
                  width={40}
                  height={40}
                  style={{ display: 'inline-flex', alignSelf: 'center' }}
                />
              </span>
              <button
                className={clsx(classes.navItem, classes.btn, classes.btnSecondary)}
                type={'button'}
                onClick={() => signOut()}
              >
                Log out
              </button>
            </div>
          ) : (
            <Link href="/auth/login">
              <button className={clsx(classes.btn, classes.btnPrimary)} type={'button'}>
                Log in
              </button>
            </Link>
          )}
          <div>
            <p>{time}</p>
          </div>
        </div>
      </nav>
    </div>
  ) : (
    <div className={clsx(classes.mobileNav, !show && classes.hide)}>
      <Link href="" className={classes.logo}>
        <Logo size={30} />
        {width > 720 ? <span className={classes.logoText}>Game Store</span> : null}
      </Link>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {session ? (
          <div className={classes.icons}>
            {/* <Heart className={classes.navItem} size={30} /> */}
            <span
              className={clsx(classes.navItem, classes.icon, classes.badgeContainer)}
              onClickCapture={handleOpenMenu}
            >
              <CartIcon size={30} />
              {cart ? <div className={classes.badge}>{cart}</div> : null}
            </span>
            <span className={clsx(classes.navItem, classes.profile)}>
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={40}
                height={40}
                style={{ display: 'inline-flex', alignSelf: 'center' }}
              />
            </span>
          </div>
        ) : (
          <Link href="/auth/login">
            <button className={clsx(classes.btn, classes.btnPrimary)} type={'button'}>
              Log in
            </button>
          </Link>
        )}

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
            <button
              className={clsx(classes.mobileNavItem, classes.btn, classes.btnSecondary)}
              type={'button'}
              onClick={() => signOut()}
            >
              Log out
            </button>
            {/* <Link className={classes.mobileNavItem} href="/browse">
              Search
            </Link> */}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
