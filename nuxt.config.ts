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

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'system', // ← این باعث می‌شود تم اولیه از تنظیمات سیستم کاربر خوانده شود
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

  i18n: {
    defaultLocale: 'fa',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'fa',
        name: 'فارسی',
        file: 'fa.json',
        dir: 'rtl'
      },
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        dir: 'ltr'
      }
    ],
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    },
    bundle: {
      optimizeTranslationDirective: false
    }
  },

  icon: {
    serverBundle: false, // این خیلی مهمه! به Nuxt بگو اصلاً دنبال سرور برای آیکون نباش
    clientBundle: {
      scan: true,
      includeCustomCollections: true
    }
  },

  ogImage: {
    zeroRuntime: true
  }
})
