import React from 'react'
import NextLink from 'next/link'

type linkProps = {
  href: string
  external?: boolean
  children?: React.ReactNode
  [x: string]: any
}

export default function Link({ href, external, children, ...props }: linkProps): JSX.Element {
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <NextLink href={href}>
      <a {...externalProps} {...props}>
        {children}
      </a>
    </NextLink>
  )
}
