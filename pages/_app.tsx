import { useState } from 'react'
import { motion } from 'framer-motion'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../styles/globals.scss'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import Meta from '../layout/Meta'
import { CartProvider } from '../components/cart/context/cartContext'

export default function App({ Component, pageProps, router }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CartProvider>
            <motion.div
              initial="pageInitial"
              animate="pageAnimate"
              variants={{
                pageInitial: {
                  opacity: 0,
                },
                pageAnimate: {
                  opacity: 1,
                },
              }}
            >
              <Meta name={'Game Store'} />
              <Toaster position="bottom-center" reverseOrder={false} />
              <Component key={router.route} {...pageProps} />
            </motion.div>
          </CartProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}
