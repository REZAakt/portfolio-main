type AppConfigLink = {
  'icon'?: string
  'image'?: string
  'to'?: string
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
