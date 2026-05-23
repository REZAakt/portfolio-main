export const useContentPath = () => {
  const route = useRoute()

  const contentPath = computed(() => {
    if (route.path.startsWith('/en')) {
      return route.path
    }

    if (route.path === '/') {
      return '/fa'
    }

    return `/fa${route.path}`
  })

  const toRoutePath = (path: string) => {
    return path.replace(/^\/fa/, '')
  }

  return {
    contentPath,
    toRoutePath
  }
}
