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
            contact: 'تماس',
            about: 'درباره'
          }
        : {
            home: 'Home',
            projects: 'Projects',
            blog: 'Blog',
            contact: 'Contact',
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
        label: labels.contact,
        icon: 'i-lucide-mail',
        to: localePath('/contact')
      },
      {
        label: labels.about,
        icon: 'i-lucide-user',
        to: localePath('/about')
      }
    ]
  })
}
