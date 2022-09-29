import type { HTTPMethod } from './types'

type FetcherConfig = {
  readonly method: HTTPMethod
  readonly body?: object
  readonly config?: RequestInit
}

export async function fetcher(path: string, { method, body, config }: FetcherConfig): Promise<null>

export async function fetcher(path: string, { method, body, config }: FetcherConfig)

export async function fetcher(path: string, { method, body, config }: FetcherConfig) {
  try {
    const res = await fetch(path, {
      ...config,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method,
      ...(body && { body: JSON.stringify(body) }),
    })
    const data = await res.json()
    if (!res.ok) {
      throw new Error(data?.message)
    }
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}
