import type { NextPage } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Layout from '../layout/Layout'
import classes from '../styles/notfound.module.scss'
import { ArrowLeft } from '../utils/icons'

const NotFound: NextPage = (): JSX.Element => (
  <Layout
    meta={{
      name: '404 - Not Found',
      description:
        'Oops! The page you are looking for does not exist. It might have been moved or deleted.',
    }}
    style={{ overflow: 'hidden', height: '130vh' }}
  >
    <motion.div
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      className={classes.bg}
    ></motion.div>
    <motion.div
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: [0.6, 0.01, -0.05, 0.95] }}
      className={classes.textContainer}
    >
      <h1 className={classes.text}>404</h1>
      <p className={classes.desc}>Page not found</p>
      <p className={classes.small_text}>
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link href="/">
        <a className={classes.btn}>
          <ArrowLeft width={24} height={24} style={{ marginRight: 5 }} />
          Go to Home
        </a>
      </Link>
    </motion.div>
  </Layout>
)

export default NotFound
