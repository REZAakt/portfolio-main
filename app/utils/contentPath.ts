export const useContentPath = () => {
  const route = useRoute()

  const normalizeContentPath = (path: string) => {
    if (path === '/') {
      return path
    }

    return path.replace(/\/$/, '')
  }

  const contentPath = computed(() => {
    const path = normalizeContentPath(route.path)

    if (path.startsWith('/en')) {
      return path
    }

    if (path === '/') {
      return '/fa'
    }

    return `/fa${path}`
  })

  const toRoutePath = (path: string) => {
    const routePath = path.replace(/^\/fa/, '') || '/'

    if (routePath === '/') {
      return routePath
    }

    return `${routePath}/`
  }

  return {
    contentPath,
    toRoutePath
  }
}
