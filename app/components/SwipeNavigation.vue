<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  links: NavigationMenuItem[]
}>()

const router = useRouter()
const route = useRoute()
const { locale } = useI18n()

// eslint-disable-next-line @stylistic/arrow-parens
const pages = computed(() => props.links.map((link) => link.to).filter(Boolean) as string[])

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

  onSwipeEnd: (_event, dir) => {
    if (!dir) return

    if (Math.abs(lengthY.value) > Math.abs(lengthX.value)) return

    const list = pages.value
    const current = normalize(route.path)
    const index = list.indexOf(current)

    if (index === -1) return

    if (dir === 'left') {
      const next = list[index + 1]
      if (next) router.push(localePath(next))
    }

    if (dir === 'right') {
      const prev = list[index - 1]
      if (prev) router.push(localePath(prev))
    }
  }
})
</script>

<template>
  <!-- ✅ بدون fixed -->
  <div ref="target" class="relative">
    <slot />
  </div>
</template>
