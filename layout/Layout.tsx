import React from 'react'
import Cart from '../components/cart/Cart'
import { useCart } from '../components/cart/hooks/useCart'
import Footer from './Footer'
import Meta, { MetaProps } from './Meta'
import Navbar from './Navbar'

type layoutProps = {
  meta?: MetaProps
  children?: React.ReactNode
  [x: string]: any
}

function Layout({ meta, children, ...props }: layoutProps): JSX.Element {
  const {
    state: { isOpen },
  } = useCart()

  return (
    <div className="main-container" {...props}>
      <Meta {...meta} />
      {isOpen && <Cart />}

      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
