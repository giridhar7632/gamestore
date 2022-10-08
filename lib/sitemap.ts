import { getAllGames, getLatest, getTrending, getAllGenres } from './requests'
import { globby } from 'globby'
import { SitemapStream, streamToPromise } from 'sitemap'
import { Readable } from 'stream'
import fs from 'fs'

const blocklist = ['/result', '/404']
async function generateSitemap() {
  if (process.env.NODE_ENV === 'development') {
    return
  }
  const baseUrl = process.env.NEXT_PUBLIC_URL
  const pages = await globby([
    'src/pages/**/*{.ts,.tsx}',
    '!src/pages/**/[*',
    '!src/pages/_*.ts',
    '!src/pages/api',
  ])
  // normal page routes
  const pageLinks = pages
    .map((page) => {
      const path = page
        .replace('pages', '')
        .replace('.ts', '')
        .replace('.tsx', '')
        .replace('src/', '')
      return path === '/index'
        ? { url: '/', changefreq: 'daily', priority: 0.7 }
        : { url: path, changefreq: 'daily', priority: 0.7 }
    })
    .filter((page) => !blocklist.includes(page.url))
  // game routes
  const { games: games1 } = await getAllGames()
  const { games: games2 } = await getLatest()
  const { games: games3 } = await getTrending()
  const games = [...games1, ...games2, ...games3]
  const gameLinks = games.map((game) => ({
    url: `/game/${game.slug}`,
    changefreq: 'daily',
    priority: 0.7,
  }))
  // genre routes
  const { results: genres } = await getAllGenres()
  const genreLinks = genres.map((genre) => ({
    url: `/genre/${genre.slug}`,
  }))
  const links = [...pageLinks, ...gameLinks, ...genreLinks]
  const stream = new SitemapStream({ hostname: baseUrl })
  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString(),
  )
  fs.writeFileSync('./public/sitemap.xml', xml)
}
export default generateSitemap
