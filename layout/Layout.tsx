import React from 'react'
import Footer from './Footer'
import Meta, { MetaProps } from './Meta'
import Navbar from './Navbar'

type layoutProps = {
  meta?: MetaProps
  children?: React.ReactNode
  [x: string]: any
}

function Layout({ meta, children, ...props }: layoutProps): JSX.Element {
  return (
    <div className="main-container" {...props}>
      <Meta {...meta} />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
