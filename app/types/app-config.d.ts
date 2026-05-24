type AppConfigLink = {
  'icon'?: string
  'to'?: string
  'target'?: '_blank' | '_self'
  'aria-label'?: string
}

declare module 'nuxt/schema' {
  interface AppConfig {
    global: {
      picture?: {
        dark?: string
        light?: string
        alt?: string
      }
      meetingLink: string
      email: string
      available: boolean
    }

    footer: {
      credits: string
      colorMode: boolean
      links: AppConfigLink[]
    }
  }
}

export {}
