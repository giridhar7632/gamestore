import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') return <b>Loading...</b>

  return (
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
        {!session ? (
          <Link href="/auth/login">
            <a>Log in</a>
          </Link>
        ) : (
          <div onClick={() => signOut()}>
            <a>Log Out</a>
          </div>
        )}
      </main>
    </div>
  )
}

export default Home
