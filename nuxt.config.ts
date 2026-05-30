export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-og-image',
    'motion-v/nuxt',
    '@nuxtjs/i18n'
  ],

  devtools: {
    enabled: process.env.NODE_ENV !== 'production'
  },

  app: {
    baseURL: '/'
  },

  css: ['~/assets/css/main.css'],

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
        '/blog/from-mockup-to-market/',
        '/blog/how-i-built-my-own-design-system-from-scratch/',
        '/blog/psychology-of-color-in-ui-design/',
        '/blog/slow-design-in-fast-paced-digital-world/',
        '/contact/',
        '/projects/',
        '/en/',
        '/en/about/',
        '/en/blog/',
        '/en/blog/from-mockup-to-market/',
        '/en/blog/how-i-built-my-own-design-system-from-scratch/',
        '/en/blog/psychology-of-color-in-ui-design/',
        '/en/blog/slow-design-in-fast-paced-digital-world/',
        '/en/contact/',
        '/en/projects/'
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

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false
    }
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
  }
})
