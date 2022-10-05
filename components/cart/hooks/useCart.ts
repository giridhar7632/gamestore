import { useMemo, useContext } from 'react'

import { CartStateContext } from '../context/cartContext'

export const useCart = () => {
  const context = useContext(CartStateContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return useMemo(() => context, [context])
}
