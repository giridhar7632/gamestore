export type userData = {
  username?: string
  email: string
  password: string
}

export type Nil<T> = T | null | undefined

export type HTTPMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH'

export type Genres = {
  id: number | string
  name: string
  slug: string
  games_count?: number
  image_background?: string
  games?: any
}

export type GenreData = {
  id: number | string
  name: string
  slug: string
  games_count?: number
  image_background?: string
  description?: string
}

export type genresData = {
  count: number | string
  next: null
  previous: null
  results: Genres[]
}

export type Ratings = {
  id: number
  title: string
  count?: number
  percent?: number
}

export type Product = {
  id: string
  backgroundImage?: string
  title: string
  slug: string
  price: number
  quantity: number
}

export type Games = {
  id: string
  backgroundImage?: string
  title: string
  slug: string
  genres: Genres[]
  price: number
  rating: number | string
  ratings_count: number
  off?: number
}

export type Game = {
  title: string
  slug?: string
  description?: string
  description_raw?: string
  backgroundImage: string
  genres?: Genres[]
  platforms?: any
  price?: number
  off?: number | boolean
  released: Date
  rating: number | string
  ratings: Ratings[]
  ratings_count: number
  officialSite: string
  extraImg: string
}

export type gamesData = {
  prev: string | null
  next: string | null
  games: Games[]
}
