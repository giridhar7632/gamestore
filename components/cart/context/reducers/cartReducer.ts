import { Product } from '../../../../utils/types'
import type { Action, State } from '../types'

const calculateTotalPrice = (products: Array<Product>) => {
  return products.reduce((acc, curr) => acc + curr.price, 0)
}

export const cartReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'addProduct': {
      const products = [...state.products]
      const prevTotalPrice = state.totalPrice
      const newProduct = action.payload
      const isTheNewProductInCart = products.find((product) => product.id === newProduct.id)

      if (!isTheNewProductInCart) {
        const newProducts = [newProduct, ...products]
        return {
          ...state,
          products: newProducts,
          totalPrice: prevTotalPrice + newProduct.price,
          cart: state.cart + 1,
        }
      }

      if (isTheNewProductInCart) {
        const newProductArray = products.map((product) => {
          if (product.id === newProduct.id) {
            const modifiedProduct = {
              ...product,
              quantity: product.quantity + 1,
            }

            return modifiedProduct
          }

          return product
        })
        return {
          ...state,
          products: newProductArray,
          totalPrice: prevTotalPrice + newProduct.price,
          cart: state.cart + 1,
        }
      }
    }
    case 'deleteProduct': {
      const products = [...state.products]
      const productToDelete = action.payload

      const newProducts = products.filter((product) => product.id !== productToDelete.id)

      const totalPrice = calculateTotalPrice(newProducts)

      return {
        ...state,
        products: [...newProducts],
        totalPrice,
        cart: state.cart - productToDelete.quantity,
      }
    }

    case 'updateProduct': {
      const products = [...state.products]
      const prevTotalPrice = state.totalPrice
      const newProduct = action.payload
      const isTheNewProductInCart = products.find((product) => product.id === newProduct.id)

      if (isTheNewProductInCart) {
        const newProductArray = products.map((product) => {
          if (product.id === newProduct.id) {
            const modifiedProduct = {
              ...product,
              quantity: product.quantity + newProduct.factor,
            }

            return modifiedProduct
          }

          return product
        })

        return {
          ...state,
          products: newProductArray,
          totalPrice: prevTotalPrice + newProduct.price,
          cart: state.cart + newProduct.factor,
        }
      }
    }

    case 'openMenu': {
      return {
        ...state,
        isOpen: true,
      }
    }
    case 'closeMenu': {
      return {
        ...state,
        isOpen: false,
      }
    }

    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}
