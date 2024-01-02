import NextAuth, { NextAuthOptions } from 'next-auth'
import type { NextApiHandler } from 'next'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import prisma from '../../../lib/prisma'

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions)
export default authHandler
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
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

          if (!user) {
            throw new Error('User not found! Try signing up. 😕')
          }

          if (!user.password) {
            throw new Error(`You don't have any password! Try using Google 😅`)
          }
          const isMatch = await compare(password, user.password)
          if (!isMatch) {
            throw new Error('Incorrect Password! ⚠️')
          }

          return user
        } catch (error) {
          throw new Error(error.message)
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
}
