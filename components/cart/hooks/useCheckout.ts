import { useMutation } from '@tanstack/react-query'
import type { Product } from '../../../utils/types'
import { checkoutCart } from '../api/checkoutCart'
import { redirectToCheckout } from '../../../utils/stripe'

export const useCheckout = () => {
  return useMutation((products: Array<Product>) => checkoutCart(products), {
    onSuccess: redirectToCheckout,
  })
}
