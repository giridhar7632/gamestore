import { getAllGames, getLatest, getTrending } from './requests'
import genres from '../utils/genres.json'
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
  // post routes
  const { games: posts1 } = await getAllGames()
  const { games: posts2 } = await getLatest()
  const { games: posts3 } = await getTrending()
  const posts = [...posts1, ...posts2, ...posts3]
  const postLinks = posts.map((post) => ({
    url: `/game/${post.slug}`,
    changefreq: 'daily',
    priority: 0.7,
  }))
  // tag routes
  const tags = await genres.results
  const tagLinks = tags.map((tag) => ({
    url: `/genre/${tag.slug}`,
  }))
  const links = [...pageLinks, ...postLinks, ...tagLinks]
  const stream = new SitemapStream({ hostname: baseUrl })
  const xml = await streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString(),
  )
  fs.writeFileSync('./public/sitemap.xml', xml)
}
export default generateSitemap
