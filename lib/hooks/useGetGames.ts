import { useQuery } from '@tanstack/react-query'
import { gamesData } from '../../utils/types'
import { getAllGames, getGameScreenshots, getLatest, getTrending } from '../requests'

type getGamesArgs = { page?: number; keyword?: string; genre?: string; [x: string]: any }

export const useTrendingGames = () => useQuery<gamesData, Error>(['trending'], getTrending)

export const useLatestGames = () => useQuery<gamesData, Error>(['latest'], getLatest)

export const useGetGameScreenshots = (id: string) =>
  useQuery<string[], Error>(['scrennshots', id], () => getGameScreenshots(id))

export const useGetGames = ({ page, keyword, genre }: getGamesArgs) => {
  return useQuery<gamesData, Error>(['games', page, keyword, genre], () =>
    getAllGames({ page, keyword, genre }),
  )
}
