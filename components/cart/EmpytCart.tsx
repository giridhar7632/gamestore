import React from 'react'
import clsx from 'clsx'
import classes from '../../styles/cart.module.scss'
import { Bag } from '../../utils/icons'
import Link from '../CustomLink'

const EmpytCart = ({ closeMenu }) => {
  return (
    <div className={classes.cartEmpty}>
      <Bag width={80} />
      <p className={classes.desc}>Your cart is empty</p>
      <Link href="/">
        <a>
          <button
            type="button"
            className={clsx(classes.btn, classes.btnSecondary)}
            onClick={closeMenu}
          >
            Continue Shopping
          </button>
        </a>
      </Link>
    </div>
  )
}

export default EmpytCart
