<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  links: NavigationMenuItem[]
}>()

const swipeDirection = useSwipeDirection()
const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

// eslint-disable-next-line @stylistic/arrow-parens
const pages = computed(() => props.links.map((link) => link.to).filter(Boolean) as string[])

function normalize(path: string) {
  const prefix = `/${locale.value}`
  let normalized = path.split(/[?#]/)[0] || '/'

  if (normalized === prefix) {
    normalized = '/'
  } else if (normalized.startsWith(`${prefix}/`)) {
    normalized = normalized.slice(prefix.length) || '/'
  }

  if (normalized.length > 1) {
    normalized = normalized.replace(/\/+$/, '')
  }

  if (normalized.startsWith('/blog/')) {
    return '/blog'
  }

  if (normalized.startsWith('/projects/')) {
    return '/projects'
  }

  return normalized
}

const target = ref<HTMLElement | null>(null)

const localePath = useLocalePath()

function shouldIgnoreSwipe(event: TouchEvent) {
  return event
    .composedPath()
    .some(target => target instanceof HTMLElement && target.dataset.swipeNavigationIgnore !== undefined)
}

const { lengthX, lengthY } = useSwipe(target, {
  threshold: 80,
  passive: true,

  onSwipeEnd: async (event, dir) => {
    if (!dir) return

    if (shouldIgnoreSwipe(event)) return

    if (Math.abs(lengthY.value) > Math.abs(lengthX.value)) return

    const list = pages.value.map(normalize)
    const current = normalize(route.path)
    const index = list.indexOf(current)

    if (index === -1) return

    const isRtl = locale.value === 'fa'

    let targetPath: string | undefined
    if (dir === 'left') {
      targetPath = isRtl ? list[index - 1] : list[index + 1]
    }

    if (dir === 'right') {
      targetPath = isRtl ? list[index + 1] : list[index - 1]
    }

    if (!targetPath) return

    if (dir !== 'left' && dir !== 'right') return

    swipeDirection.value = dir

    await nextTick()
    await router.push(localePath(targetPath))
  }
})
</script>

<template>
  <div
    ref="target"
    class="relative"
  >
    <slot />
  </div>
</template>
