import { Game, gamesData, Product } from './types'
import type Stripe from 'stripe'

export const formatProductforCheckOut = ({
  title,
  price,
  backgroundImage,
  quantity,
}: Product): Stripe.Checkout.SessionCreateParams.LineItem => ({
  price_data: {
    currency: 'inr',
    product_data: {
      name: title,
      images: [backgroundImage],
    },
    unit_amount: Math.round(parseFloat(price.toFixed(2)) * 100),
  },
  adjustable_quantity: {
    enabled: true,
    minimum: 1,
  },
  quantity,
})

export function formatGamesData(data): gamesData {
  return {
    prev: data.previous,
    next: data.next,
    games:
      data?.results?.map((game) => ({
        id: game.id,
        backgroundImage: game.background_image,
        title: game.name,
        slug: game.slug,
        genres: game?.genres
          .slice(0, 3)
          .map(({ id, name, slug, games_count, image_background }) => ({
            id,
            name,
            slug,
            games_count,
            image_background,
          })),
        rating: game.rating,
        ratings_count: game.ratings_count,
        ...getPrice(game.id),
      })) || [],
  }
}

export function formatSingleGame(game): Game {
  return {
    title: game.name,
    slug: game.slug,
    description: game.description,
    description_raw: game.description_raw,
    backgroundImage: game.background_image,
    genres: game?.genres.map(({ id, name, slug, games_count, image_background }) => ({
      id,
      name,
      slug,
      games_count,
      image_background,
    })),
    platforms: game.platforms,
    released: game.released,
    rating: game.rating,
    ratings: game.ratings,
    ratings_count: game.ratings_count,
    officialSite: game.website,
    extraImg: game.background_image_additional,
    ...getPrice(game.id),
  }
}

const getPrice = (id: number): { price: number; off: boolean | number } => {
  const less = parseInt(`${id}`.slice(0, 4))
  return {
    price: id < 100 ? id : less / 100,
    off: id > 80 ? parseInt(`${less / 100 - less / 1000}`) : false,
  }
}
