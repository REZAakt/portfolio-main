import type { NavigationMenuItem } from '@nuxt/ui'

export const useNavLinks = () => {
  const { locale } = useI18n()
  const localePath = useLocalePath()

  return computed<NavigationMenuItem[]>(() => {
    // eslint-disable-next-line @stylistic/operator-linebreak
    const labels =
      locale.value === 'fa'
        ? {
            home: 'خانه',
            projects: 'پروژه ها',
            blog: 'بلاگ',
            speaking: 'سخنرانی',
            about: 'درباره'
          }
        : {
            home: 'Home',
            projects: 'Projects',
            blog: 'Blog',
            speaking: 'Speaking',
            about: 'About'
          }

    return [
      {
        label: labels.home,
        icon: 'i-lucide-home',
        to: localePath('/')
      },
      {
        label: labels.projects,
        icon: 'i-lucide-folder',
        to: localePath('/projects')
      },
      {
        label: labels.blog,
        icon: 'i-lucide-file-text',
        to: localePath('/blog')
      },
      {
        label: labels.speaking,
        icon: 'i-lucide-mic',
        to: localePath('/speaking')
      },
      {
        label: labels.about,
        icon: 'i-lucide-user',
        to: localePath('/about')
      }
    ]
  })
}
