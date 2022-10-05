import type Stripe from 'stripe'
import type { Product } from '../../../utils/types'

export const transformProduct = ({
  title,
  price,
  backgroundImage,
  quantity,
}: Product): Stripe.Checkout.SessionCreateParams.LineItem => ({
  price_data: {
    currency: 'inr',
    product_data: {
      name: title,
      description: `${title} - purchasing from Game Store.`,
      images: [backgroundImage],
    },
    unit_amount: price / quantity,
  },
  adjustable_quantity: {
    enabled: true,
    minimum: 1,
  },
  quantity,
})

// {
//   name: title,
//   description: `${title} - purchasing from Game Store.`,
//   amount: price,
//   currency: 'INR',
//   images: [backgroundImage],
//   quantity
// }
