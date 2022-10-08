import { useState } from 'react'
import { NextPage } from 'next'
import Router from 'next/router'
import toast from 'react-hot-toast'
import { FieldValues } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import AuthForm from '../../components/AuthForm'
import classes from '../../styles/auth.module.scss'
import { useAuth } from '../../lib/hooks/useAuth'
import { fetcher } from '../../utils/fetcher'
import Meta from '../../layout/Meta'
import { getProviders, getSession } from 'next-auth/react'

const Login: NextPage = ({ providers }: any): JSX.Element => {
  const { signIn } = useAuth()
  const [signin, setSignin] = useState(true)
  const [loading, setLoading] = useState(false)
  const handleCredentials = async (data: FieldValues) => {
    setLoading(true)
    const res = await signIn('credentials', {
      ...data,
      redirect: false,
    })
    if (res.ok) {
      toast.success('Sign in successful! 😁')
      Router.replace('/')
    } else {
      toast.error(res.error)
    }

    setLoading(false)
  }
  const handleProvider = async (id) => {
    try {
      await signIn(id, { callbackUrl: '/' })
    } catch (error) {
      
    }
  }
  const handleSignUp = async (data: FieldValues) => {
    setLoading(true)
    try {
      const res = await fetcher('/api/auth/signup', {
        method: 'POST',
        body: data,
      })
      toast.success('User created successfully! 😁')
      setSignin(true)
    } catch (error) {
      toast.error(error?.message)
    }
    setLoading(false)
  }

  return (
    <div className={classes.authContainer}>
      <Meta name={'Log in'} />
      <div className={classes.image}>
        <motion.img
          src={'/auth.png'}
          alt={''}
          key={signin ? 'signin' : 'register'}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        />
      </div>
      <div className={classes.text}>
        <AnimatePresence mode={'wait'} initial={false}>
          <motion.div
            key={signin ? 'signin' : 'register'}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {signin ? (
              <div className={classes.info}>
                <span>Don&apos;t have an account?</span>
                <span className={classes.btn} onClick={() => setSignin(false)}>
                  Sign Up
                </span>
              </div>
            ) : (
              <div className={classes.info}>
                <span>Already have an account?</span>
                <span className={classes.btn} onClick={() => setSignin(true)}>
                  Sign In
                </span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className={classes.formWrapper}>
          <AnimatePresence mode={'wait'} initial={false}>
            <motion.div
              key={signin ? 'signin' : 'register'}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {signin ? (
                <AuthForm
                  type={'login'}
                  btn={'Sign In'}
                  onFormSubmit={handleCredentials}
                  providers={Object.values(providers)}
                  handleProvider={handleProvider}
                  loading={loading}
                  loadingText={'Signing in...'}
                />
              ) : (
                <AuthForm
                  type={'register'}
                  btn={'Sign Up'}
                  onFormSubmit={handleSignUp}
                  providers={Object.values(providers)}
                  handleProvider={handleProvider}
                  loading={loading}
                  loadingText={'Signing up...'}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
  return {
    props: {
      providers: await getProviders(),
    },
  }
}

export default Login
