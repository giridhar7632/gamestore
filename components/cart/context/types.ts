import type { Product } from '../../../utils/types'

export type Action =
  | { type: 'addProduct'; payload: Product }
  | { type: 'deleteProduct'; payload: Product }
  | { type: 'updateProduct'; payload: { id: string; factor: 1 | -1; price: number } }
  | { type: 'openMenu' }
  | { type: 'closeMenu' }

export type State = {
  readonly products: Array<Product>
  readonly totalPrice: number
  readonly isOpen: boolean
  readonly cart: number
}
