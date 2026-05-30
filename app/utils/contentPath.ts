export const useContentPath = () => {
  const route = useRoute()

  const normalizeContentPath = (path: string) => {
    if (path === '/') {
      return path
    }

    return path.replace(/\/$/, '')
  }

  const contentLocale = computed(() => {
    const path = normalizeContentPath(route.path)

    return path.startsWith('/en') ? 'en' : 'fa'
  })

  const contentLocalePrefix = computed(() => `/${contentLocale.value}`)

  const contentPath = computed(() => {
    const path = normalizeContentPath(route.path)

    if (contentLocale.value === 'en') {
      return path
    }

    if (path === '/') {
      return '/fa'
    }

    return `/fa${path}`
  })

  const toRoutePath = (path: string) => {
    const routePath = path.replace(/^\/fa(?=\/|$)/, '') || '/'

    if (routePath === '/') {
      return routePath
    }

    return `${routePath}/`
  }

  function toRouteContentItem<T>(item: T): T {
    if (!item || typeof item !== 'object') {
      return item
    }

    if (Array.isArray(item)) {
      return item.map(toRouteContentItem) as T
    }

    const normalized = { ...item } as Record<string, unknown>

    if (typeof normalized.path === 'string') {
      normalized.path = toRoutePath(normalized.path)
    }

    if (typeof normalized.to === 'string') {
      normalized.to = toRoutePath(normalized.to)
    }

    if (Array.isArray(normalized.children)) {
      normalized.children = normalized.children.map(toRouteContentItem)
    }

    return normalized as T
  }

  return {
    contentLocale,
    contentLocalePrefix,
    contentPath,
    toRoutePath,
    toRouteContentItem
  }
}
