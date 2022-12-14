import { Feed } from 'feed'
import fs from 'fs'
import { getAllGames, getLatest, getTrending } from './requests'

async function generateRssFeed() {
  if (process.env.NODE_ENV === 'development') {
    return
  }
  const baseUrl = process.env.NEXT_PUBLIC_URL
  const date = new Date()
  const author = {
    name: 'Giridhar Talla',
    email: 'giridhar.talla2002@gmail.com',
    link: 'https://twitter.com/giridhar_talla',
  }
  const feed = new Feed({
    title: `Game Store`,
    description:
      'A place to buy amazing games for different platforms at best prices in the world.',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: `${baseUrl}/og-image.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Giridhar Talla`,
    updated: date,
    generator: 'Next.js using Feed for Node.js',
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author,
  })
  const { games: games1 } = await getAllGames()
  const { games: games2 } = await getLatest()
  const { games: games3 } = await getTrending()
  const games = [...games1, ...games2, ...games3]
  games.forEach((game) => {
    const url = `${baseUrl}/game/${game.slug}`
    feed.addItem({
      title: game.title,
      id: url,
      link: url,
      description: `${game.title} on Game Store for ${game.price} with a discount of ${game.off}%`,
      content: `${game.title} on Game Store for ${game.price} with a discount of ${game.off}%`,
      author: [author],
      contributor: [author],
      date: new Date('07-10-2022'),
    })
  })
  fs.mkdirSync('./public/rss', { recursive: true })
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2())
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1())
  fs.writeFileSync('./public/rss/feed.json', feed.json1())
}
export default generateRssFeed
