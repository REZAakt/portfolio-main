<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  links: NavigationMenuItem[]
}>()

const swipeDirection = useSwipeDirection()
const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

const pages = computed(() => props.links.map(link => link.to).filter(Boolean) as string[])

function normalize(path: string) {
  const prefix = `/${locale.value}`

  if (path.startsWith(prefix)) {
    return path.replace(prefix, '') || '/'
  }

  return path
}

const target = ref<HTMLElement | null>(null)

const localePath = useLocalePath()

const { lengthX, lengthY } = useSwipe(target, {
  threshold: 80,
  passive: true,

  onSwipeEnd: async (_event, dir) => {
    if (!dir) return

    if (Math.abs(lengthY.value) > Math.abs(lengthX.value)) return

    const list = pages.value.map(normalize)
    const current = normalize(route.path)
    const index = list.indexOf(current)

    if (index === -1) return

    const isRtl = locale.value === 'fa'

    if (dir === 'left' || dir === 'right') {
      swipeDirection.value = dir

      await nextTick()
    }

    if (dir === 'left') {
      const target = isRtl ? list[index - 1] : list[index + 1]
      if (target) router.push(localePath(target))
    }

    if (dir === 'right') {
      const target = isRtl ? list[index + 1] : list[index - 1]
      if (target) router.push(localePath(target))
    }
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
