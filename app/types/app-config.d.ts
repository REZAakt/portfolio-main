type AppConfigLink = {
  'icon'?: string
  'image'?: string
  'to'?: string
  'appTo'?: string
  'fallbackTo'?: string
  'target'?: '_blank' | '_self'
  'aria-label'?: string
  'tooltipKey'?: string
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
      phone?: string
      telegram?: string
      linkedin?: string
      instagram?: string
      available: boolean
    }

    footer: {
      creditsKey: string
      colorMode: boolean
      links: AppConfigLink[]
    }
  }
}

export {}
