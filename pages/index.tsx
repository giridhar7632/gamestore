import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>GameStore</title>
      <meta
        name="description"
        content="A place where you can explore and buy exciting video games online."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className={styles.title}>
        Game<a>Store</a>
      </h1>

      <p className={styles.description}>
        A place where you can explore and buy exciting video games online.
      </p>
    </main>
  </div>
)

export default Home
