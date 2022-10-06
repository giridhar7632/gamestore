import type { NextPage } from 'next'
import { useEffect } from 'react'
import Stripe from 'stripe'
import Layout from '../layout/Layout'
import { runConfetti } from '../utils/confetti'
import classes from '../styles/result.module.scss'
import Link from '../components/CustomLink'

type resultProps = {
  status: string
}

const Result: NextPage = ({ status }: resultProps) => {
  useEffect(() => {
    status === 'complete' && runConfetti()
  }, [status])

  return (
    <Layout meta={{ name: status === 'complete' ? 'Order Successful' : 'Order Cancelled' }}>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <h2>Thank you for your order!</h2>
          <p className={classes.emailMsg}>Check your email inbox for the reciept</p>
          <p className={classes.description}>
            If you have any questions, please contact us at{' '}
            <a className={classes.email} href="mailto:giridhar.talla2002@gmail.com">
              contact@gamestore.com
            </a>
          </p>
          <Link href="/">
            <button type="button" className={classes.btn}>
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default Result

export async function getServerSideProps(context) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2022-08-01',
  })
  const paySession = await stripe.checkout.sessions.retrieve(context.query.session_id)
  if (paySession.status === 'open') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }

  return {
    props: {
      status: paySession.status,
    },
  }
}
