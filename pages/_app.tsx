import { useState } from 'react'
import { motion } from 'framer-motion'
import type { AppProps } from 'next/app'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Meta from '../components/Meta'
import '../styles/globals.scss'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps, router }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
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
            <Meta />
            <Toaster position="bottom-center" reverseOrder={false} />
            <Component key={router.route} {...pageProps} />
          </motion.div>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  )
}
