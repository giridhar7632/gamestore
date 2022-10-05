import clsx from 'clsx'
import React, { FC } from 'react'
import { motion } from 'framer-motion'
import classes from '../../styles/cart.module.scss'
import { ArrowLeft } from '../../utils/icons'
import { useCart } from './hooks/useCart'
import { useCheckout } from './hooks/useCheckout'
import EmpytCart from './EmpytCart'
import CartItems from './CartItems'

const Cart: FC = () => {
  const {
    state: { totalPrice, products, cart, isOpen },
    dispatch,
  } = useCart()
  const { mutate } = useCheckout()

  const handleCloseMenu = () => dispatch({ type: 'closeMenu' })

  const handleCheckout = () => mutate(products)

  return (
    <motion.div className={classes.cartWrapper}>
      <motion.aside
        initial={{ width: 0 }}
        animate={{
          width: 600,
        }}
        exit={{
          width: 0,
        }}
        className={classes.cartContainer}
      >
        <button type="button" className={classes.cartHeading} onClick={handleCloseMenu}>
          <ArrowLeft height={24} width={24} style={{ color: '#f5f5f5' }} />
          <span className={classes.cartHeadingTitle}>Your Cart</span>
          {cart > 0 ? (
            <span className={classes.cartHeadingNum}>{`(${cart} ${
              cart > 1 ? 'items' : 'item'
            })`}</span>
          ) : null}
        </button>

        {cart < 1 && <EmpytCart closeMenu={handleCloseMenu} />}

        {cart >= 1 && <CartItems items={products} />}

        {cart >= 1 && (
          <div className={classes.cartBottom}>
            <div className={classes.total}>
              <span>Subtotal:</span>
              <span>$ {totalPrice.toFixed(2)}</span>
            </div>
            <div className={classes.btnContainer}>
              <button
                type="button"
                className={clsx(classes.btn, classes.btnCheckout)}
                onClick={handleCheckout}
              >
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </motion.aside>
    </motion.div>
  )
}

export default Cart
