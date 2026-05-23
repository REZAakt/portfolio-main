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
    enabled: true
  },

  // app: {
  //   pageTransition: { name: 'page', mode: 'out-in' }
  // },

  app: {
    baseURL: '/'
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'dark', // ← این باعث می‌شود تم اولیه از تنظیمات سیستم کاربر خوانده شود
    fallback: 'dark', // ← اگر سیستم کاربر را نشناخت، از light استفاده می‌کند
    classSuffix: '' // ← کلاس‌ها مثلاً "dark" و "light" بدون suffix خواهند بود
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
      routes: ['/'],
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

  // nuxt.config.ts
  i18n: {
    baseUrl: 'https://rezaakbarpour.ir',

    defaultLocale: 'fa',
    strategy: 'prefix_except_default',

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
      alwaysRedirect: true
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
