import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import prisma from '../../../lib/prisma'
import { hash } from 'bcryptjs'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { name, email, password } = req.body

  try {
    const session = await getSession({ req })

    if (session) {
      throw new Error('You are already logged in! 😵')
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (user) {
      throw new Error('User already exists! Try logging in.')
    }

    const passwordHash = await hash(password, 12)
    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
        image: `https://api.multiavatar.com/${name}.png`,
      },
    })
    res.status(200).json({
      message: 'User created successfully! ✌️',
      type: 'success',
    })
  } catch (error) {
    res.status(500).json({
      message: error?.message || 'Something went wrong! 😅',
      type: 'error',
    })
  }
}
