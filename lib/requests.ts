import { stringify } from 'qs'
import { fetcher } from '../utils/fetcher'
import { formatGamesData, formatSingleGame } from '../utils/formatting'
import { removeUndefined } from '../utils/removeUndefined'
import { gamesData, Genres, genresData } from '../utils/types'

export function getTime(): string {
  const date = new Date()
  let hours: number = date.getHours()
  let minutes: string | number = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = minutes < 10 ? `0${minutes}` : minutes
  return `${hours} : ${minutes} ${ampm}`
}

export const getAllGames = async (query?: any): Promise<gamesData> => {
  const qs = stringify(removeUndefined({ ...query, key: process.env.NEXT_PUBLIC_GAMES_API_KEY }))
  const data = await fetcher(`${process.env.NEXT_PUBLIC_GAMES_API_URL}/games?${qs}`, {
    method: 'GET',
  })
  return formatGamesData(data)
}

export const getAllGenres = async (): Promise<genresData> => {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_GAMES_API_URL}/genres?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`,
    {
      method: 'GET',
    },
  )
  return data
}

// https://rawg.io/api/games/lists/recent-games-past
export const getLatest = async () => {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_GAMES_API_URL}/games/lists/recent-games-past?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`,
    { method: 'GET' },
  )

  return formatGamesData(data)
}

// https://rawg.io/api/games/lists/popular
export const getTrending = async () => {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_GAMES_API_URL}/games/lists/popular?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`,
    { method: 'GET' },
  )
  return formatGamesData(data)
}

export const getSingleGame = async (id: string | number) => {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_GAMES_API_URL}/games/${id}?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`,
    { method: 'GET' },
  )
  return formatSingleGame(data)
}

export const getGenreData = async (id: string | number) => {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_GAMES_API_URL}/genres/${id}?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`,
    { method: 'GET' },
  )
  return data
}

// https://api.rawg.io/api/games/portal-2/screenshots?key=0b540e1257c341d49497411930f43686
export const getGameScreenshots = async (id): Promise<string[]> => {
  const data: any = await fetcher(
    `${process.env.NEXT_PUBLIC_GAMES_API_URL}/games/${id}/screenshots?key=${process.env.NEXT_PUBLIC_GAMES_API_KEY}`,
    { method: 'GET' },
  )
  return data?.results.map((i) => i.image)
}
