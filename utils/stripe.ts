import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

export const redirectToCheckout = async (session: Pick<Stripe.Checkout.Session, 'id'>) => {
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  return stripe.redirectToCheckout({
    sessionId: session.id,
  })
}
