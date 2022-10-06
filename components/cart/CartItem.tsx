import clsx from 'clsx'
import React, { useState } from 'react'
import { Minus, Plus, Trash } from '../../utils/icons'
import type { Product } from '../../utils/types'
import classes from '../../styles/cart.module.scss'
import { useCart } from './hooks/useCart'
import Image from '../CustomImage'
import useWindowSize from '../../lib/hooks/useWindowSize'
import Link from '../CustomLink'

type cartItemProps = {
  item?: Product
  key: any
}

const CartItem = ({ item }: cartItemProps) => {
  const [qty, setQty] = useState<number>(item.quantity || 1)
  const { dispatch } = useCart()
  const { width } = useWindowSize()

  const handleDelete = (product: Product) => {
    dispatch({ type: 'deleteProduct', payload: product })
  }

  const handleUpdateProduct = (id: string, factor: 1 | -1) => {
    dispatch({ type: 'updateProduct', payload: { id, factor, price: item.price * factor } })
  }

  return (
    <div className={classes.cartItem} key={item.id}>
      <div className={classes.cartItemImage}>
        <Image
          src={item.backgroundImage}
          layout={'fill'}
          alt={item.title}
          style={{ borderRadius: 24 }}
        />
      </div>
      <div className={classes.cartItemDesc}>
        <div className={clsx(classes.flex, classes.description)}>
          <Link href={`/game/${item.slug}`} className={classes.title}>
            {item.title}
          </Link>
          <div className={classes.price}>$ {(item.price * item.quantity).toFixed(2)}</div>
        </div>
        <div className={classes.flex}>
          <div>
            <div className={classes.cartItemQuantity}>
              {width > 800 ? <span className={classes.label}>Qty:</span> : null}
              <Minus
                type={'button'}
                width={24}
                className={clsx(classes.iconBtn, qty <= 1 && classes.disabled)}
                onClick={() => {
                  if (qty > 1) {
                    handleUpdateProduct(item.id, -1)
                    setQty((prev) => prev - 1)
                  }
                }}
              />
              <span className={classes.num}>{qty}</span>
              <Plus
                type={'button'}
                width={24}
                className={clsx(classes.iconBtn, qty >= 10 && classes.disabled)}
                onClick={() => {
                  if (qty < 10) {
                    handleUpdateProduct(item.id, 1)
                    setQty((prev) => prev + 1)
                  }
                }}
              />
            </div>
          </div>
          <Trash
            width={30}
            height={30}
            className={classes.iconBtn}
            type={'button'}
            onClick={() => handleDelete(item)}
          />
        </div>
      </div>
    </div>
  )
}

export default CartItem
