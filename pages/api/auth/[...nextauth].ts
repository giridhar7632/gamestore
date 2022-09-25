import NextAuth, { NextAuthOptions } from 'next-auth'
import type { NextApiHandler } from 'next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import prisma from '../../../lib/prisma'
import { getEnv } from '../../../utils/env'

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler

const options: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  secret: getEnv('SECRET'),
  providers: [
    GoogleProvider({
      clientId: getEnv('GOOGLE_ID'),
      clientSecret: getEnv('GOOGLE_SECRET'),
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, _req: Record<string, string>): Promise<any> {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          })

          console.log(user)

          if (!user) {
            throw new Error('User not found! Try signing up. 😕')
          }

          if (!user.password) {
            throw new Error(`You don't have any password! Try using Google 😅`)
          }
          console.log(user.password, password)
          if (!compare(user.password, password)) {
            throw new Error('Incorrect Password! ⚠️')
          }

          return user
        } catch (error) {
          throw new Error(error.message)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user?.name
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        name: token?.name,
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
}
