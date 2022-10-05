import toast from 'react-hot-toast'
import { fetcher } from '../../../utils/fetcher'
import type { Product } from '../../../utils/types'
import { transformProduct } from '../utils/transforms'

export const checkoutCart = async (products: Array<Product>) => {
  const stripeItems = products.map((product) => transformProduct(product))
  toast.loading('Redirecting...')

  return await fetcher(`/api/checkout/products/`, {
    method: 'POST',
    body: stripeItems,
  })
}
