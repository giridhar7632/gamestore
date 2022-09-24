type NameToType = {
  readonly ENV: 'production' | 'staging' | 'development' | 'test'
  readonly NEXTAUTH_URL: string
  readonly NODE_ENV: 'production' | 'development'
  readonly DATABASE_URL: string
  readonly GOOGLE_SECRET: string
  readonly GOOGLE_ID: string
  readonly SECRET: string
  readonly SENTRY_DSN: string
  readonly NEXTAUTH_CALLBACK_URL: string
  readonly NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string
  readonly STRIPE_SECRET_KEY: string
  readonly NEXT_PUBLIC_STRIPE_SUCCESS_REDIRECT_URL: string
  readonly NEXT_PUBLIC_STRIPE_ERROR_REDIRECT_URL: string
  readonly ABC: number
}

export function getEnv<Env extends keyof NameToType>(name: Env): NameToType[Env]
export function getEnv(name: keyof NameToType): NameToType[keyof NameToType] {
  const val = process.env[name]

  if (!val) {
    throw new Error(`Cannot find environmental variable: ${name}`)
  }

  return val
}
