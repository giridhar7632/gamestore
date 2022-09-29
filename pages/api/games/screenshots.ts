// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { fetcher } from '../../../utils/fetcher'

type Data = {
  image: string
}

type error = {
  message: string
  type: 'error' | 'success' | 'warning' | 'info'
}

export default async function getSceenshots(
  req: NextApiRequest,
  res: NextApiResponse<{ data: Data[] } | error>,
) {
  const { id } = req.body
  try {
    const fetched: any = await fetcher(
      `${process.env.GAMES_API_URL}/games/${id}/screenshots?key=${process.env.GAMES_API_KEY}`,
      { method: 'GET' },
    )
    console.log(id, fetched)
    res.status(200).json({ data: fetched?.results.map((i) => i.image) })
  } catch (error) {
    res.status(500).json({
      message: error?.message || 'Something went wrong! 😅',
      type: 'error',
    })
  }
}
