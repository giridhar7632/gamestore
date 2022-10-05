import React from 'react'
import CartItem from './CartItem'
import classes from '../../styles/cart.module.scss'

const CartItems = ({ items }) => {
  return (
    <div className={classes.cartItemContainer}>
      {items.map((item, idx) => (
        <CartItem key={idx} item={item} />
      ))}
    </div>
  )
}

export default CartItems
