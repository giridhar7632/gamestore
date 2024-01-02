import type { HTTPMethod } from './types'

type FetcherConfig = {
  readonly method: HTTPMethod
  readonly body?: object
  readonly config?: RequestInit
  [x: string]: any
}

export async function fetcher(path: string, { method, body, config }: FetcherConfig): Promise<null>

export async function fetcher(path: string, { method, body, config }: FetcherConfig)

export async function fetcher(path: string, { method, body, config, ...args }: FetcherConfig) {
  try {
    const res = await fetch(path, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
      },
      method,
      ...(body && { body: JSON.stringify(body) }),
      ...args,
    })
    const data = await res.json()
    if (!res.ok) {
      if (res.status === 500 || res.status === 400) {
        throw new Error('Something went wrong! 😕')
      }
      throw new Error(res.statusText)
    }
    return data
  } catch (err) {
    console.log(err)
    throw new Error(err.message)
  }
}
