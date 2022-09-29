import clsx from 'clsx'
import { CSSProperties } from 'react'
import classes from '../styles/Footer.module.scss'
import Link from '../components/CustomLink'
import { Github, Instagram, Linkedin } from '../utils/icons'

type footerProps = {
  backgroundColor?: string
  color?: string
  style?: CSSProperties
  [x: string]: any
}

export default function Footer({ backgroundColor, color, style, ...props }: footerProps) {
  return (
    <footer
      className={classes.footer}
      style={{
        ...style,
        ...(backgroundColor && color ? { backgroundColor, color } : {}),
      }}
      {...props}
    >
      <div className={classes.footerBar}>
        <div className={classes.copyright}>
          Copyright © {new Date().getFullYear()} Game Store Pvt Ltd.
        </div>
        <div className={classes.footerNav}>
          <Link href={'about'} external className={classes.navItem}>
            About
          </Link>
          <span className={classes.divider} />
          <Link href={'policy'} external className={classes.navItem}>
            Privacy Policy
          </Link>
          <span className={classes.divider} />
          <Link href={'faq'} external className={classes.navItem}>
            FAQ
          </Link>
        </div>
      </div>
      <div className={classes.social}>
        <Link href="https://facebook.com/" external className={classes.socialIcon}>
          <Github className={clsx(classes.icon, classes.gh)} style={color ? { color } : {}} />
        </Link>
        <Link href="https://instagram.com/" external className={classes.socialIcon}>
          <Instagram className={clsx(classes.icon, classes.ig)} style={color ? { color } : {}} />
        </Link>
        <Link href="https://linkedin.com/" external className={classes.socialIcon}>
          <Linkedin className={clsx(classes.icon, classes.in)} style={color ? { color } : {}} />
        </Link>
      </div>
      <small style={{ alignSelf: 'flex-start' }}>
        Data source:{' '}
        <Link href="https://rawg.io/apidocs" external>
          RAWG
        </Link>
      </small>
    </footer>
  )
}
