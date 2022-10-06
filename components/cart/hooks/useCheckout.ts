import Stripe from 'stripe'
import { useMutation } from '@tanstack/react-query'
import type { Product } from '../../../utils/types'
import { checkoutCart } from '../api/checkoutCart'
import { redirectToCheckout } from '../../../utils/stripe'
import toast from 'react-hot-toast'

export const useCheckout = () => {
  return useMutation((products: Array<Product>) => checkoutCart(products), {
    onSuccess: (data: { session: Stripe.Checkout.Session; [x: string]: any }) => {
      toast.loading(`Redirecting...`)
      redirectToCheckout(data.session)
    },
  })
}
