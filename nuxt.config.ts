export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap'
  ],

  devtools: {
    enabled: process.env.NODE_ENV !== 'production'
  },

  app: {
    baseURL: '/'
  },

  css: ['~/assets/css/main.css'],
  site: {
    url: 'https://rezaakbarpour.ir',
    name: 'Reza Akbarpour',
    trailingSlash: true
  },

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: ''
  },

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  compatibilityDate: '2026-05-19',

  nitro: {
    preset: 'static',
    prerender: {
      routes: [
        '/',
        '/about/',
        '/blog/',
        '/contact/',
        '/projects/',
        '/en/',
        '/en/about/',
        '/en/blog/',
        '/en/contact/',
        '/en/projects/',
        '/sitemap.xml'
      ],
      crawlLinks: true
    }
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    baseUrl: 'https://rezaakbarpour.ir',

    defaultLocale: 'fa',
    strategy: 'prefix_except_default',
    trailingSlash: true,

    locales: [
      { code: 'fa', language: 'fa-IR', name: 'فارسی', file: 'fa.json', dir: 'rtl' },
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json', dir: 'ltr' }
    ],

    lazy: true,
    langDir: 'locales/',

    detectBrowserLanguage: false
  },

  icon: {
    serverBundle: 'local',
    clientBundle: {
      scan: true,
      includeCustomCollections: true
    }
  },

  ogImage: {
    zeroRuntime: true
  },
  sitemap: {
    sitemaps: false
  }

})
