import React, { FC } from 'react'
import Head from 'next/head'

const makeTitle = (title: string, name: string) =>
  title === name || !name ? title : `${title} | ${name}`

export type MetaProps = {
  title?: string
  name?: string
  description?: string
  image?: string
  url?: string
  keywords?: string
  children?: React.ReactNode
}

const Meta: FC<MetaProps> = ({
  title = 'Game Store',
  name = '',
  description = 'A place to buy amazing games for different platforms at best prices in the world.',
  image = `/og-image`,
  url = process.env.NEXT_PUBLIC_URL,
  keywords = 'playstation,ecommerce,games',
  children,
}) => (
  <Head>
    <meta name="keywords" content={keywords} />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="language" content="English" />
    <meta key="og_locale" property="og:locale" content="en_US" />
    <meta key="og_type" property="og:type" content="website" />
    <meta key="og_site" property="og:site_name" content={name} />

    <title key="title">{makeTitle(title, name)}</title>
    <meta key="og_title" property="og:title" content={makeTitle(title, name)} />
    <meta key="tw_title" name="twitter:title" content={makeTitle(title, name)} />

    <meta key="desc" name="description" content={description} />
    <meta key="og_desc" property="og:description" content={description} />
    <meta key="tw_desc" name="twitter:description" content={description} />

    <meta key="og_img" property="og:image" content={url + image} />
    <meta key="tw_card" name="twitter:card" content="summary_large_image" />
    <meta key="tw_img" name="twitter:image" content={url + image} />
    <meta key="theme_color" name="theme-color" content={'#f5f5f5'} />
    <meta key="tile_color" name="msapplication-TileColor" content={'#2d89ef'} />

    <link
      key="safari_icon"
      rel="mask-icon"
      href={`${url}/safari-pinned-tab.svg`}
      color={'#5bbad5'}
    />
    <link
      key="apple_icon"
      rel="apple-touch-icon"
      sizes="180x180"
      href={`${url}/apple-touch-icon.png`}
    />
    <link
      key="favicon_32"
      rel="icon"
      type="image/png"
      sizes="32x32"
      href={`${url}/favicon-32x32.png`}
    />
    <link
      key="favicon_16"
      rel="icon"
      type="image/png"
      sizes="16x16"
      href={`${url}/favicon-16x16.png`}
    />
    <link key="manifest" rel="manifest" href={`${url}/site.webmanifest`} />
    {children}
  </Head>
)

export default Meta
