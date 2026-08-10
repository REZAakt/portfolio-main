/* eslint-disable @stylistic/quote-props */
export default defineAppConfig({
  global: {
    picture: {
      dark: '/images/23.png',
      light: '/images/me_dark.avif',
      alt: 'My profile picture'
    },
    meetingLink: 'https://cal.com/',
    email: 'rreza.aak@gmail.com',
    phone: '+989114461400',
    telegram: 'https://t.me/REZA_akT',
    linkedin: 'https://www.linkedin.com/in/reza-akbarpour-64ab3b217/',
    instagram: 'https://www.instagram.com/reza.akbarpourr/',
    available: false
  },
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'neutral'
    },
    pageHero: {
      slots: {
        container: 'py-18 sm:py-24 lg:py-32',
        title: 'mx-auto max-w-xl text-pretty text-3xl sm:text-4xl lg:text-5xl',
        description: 'mt-2 text-md mx-auto max-w-2xl text-pretty sm:text-md text-muted'
      }
    }
  },
  footer: {
    creditsKey: 'footer.credits',
    colorMode: false,
    links: [
      {
        icon: 'i-simple-icons-telegram',
        to: 'https://t.me/REZA_akT',
        appTo: 'tg://resolve?domain=REZA_akT',
        fallbackTo: 'https://t.me/REZA_akT',
        target: '_blank',
        'aria-label': 'Me on Telegram',
        tooltipKey: 'social.telegram'
      },
      {
        image: '/Icons/bale.png',
        to: 'https://web.bale.ai/chat?uid=44933076',
        target: '_blank',
        'aria-label': 'Me on Bale',
        tooltipKey: 'social.bale'
      },
      {
        icon: 'i-simple-icons-gmail',
        to: 'https://mail.google.com/mail/?view=cm&fs=1&to=rreza.aak%40gmail.com',
        appTo: 'mailto:rreza.aak@gmail.com',
        fallbackTo: 'mailto:rreza.aak@gmail.com',
        target: '_blank',
        'aria-label': 'Me on Gmail',
        tooltipKey: 'social.gmail'
      },
      {
        icon: 'i-simple-icons-linkedin',
        to: 'https://www.linkedin.com/in/reza-akbarpour-64ab3b217/',
        target: '_blank',
        'aria-label': 'Me on LinkedIn',
        tooltipKey: 'social.linkedin'
      },
      {
        icon: 'i-simple-icons-github',
        to: 'https://github.com/REZAakt',
        target: '_blank',
        'aria-label': 'Me on GitHub',
        tooltipKey: 'social.github'
      }
    ]
  }
})
