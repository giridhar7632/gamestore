import { fetcher } from '../../../utils/fetcher'
import { formatProductforCheckOut } from '../../../utils/formatting'
import type { Product } from '../../../utils/types'

export const checkoutCart = async (products: Array<Product>) => {
  const stripeItems = products.map((product) => formatProductforCheckOut(product))

  return await fetcher(`/api/checkout/products/`, {
    method: 'POST',
    body: stripeItems,
  })
}
