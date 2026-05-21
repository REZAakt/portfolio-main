<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  links: NavigationMenuItem[]
}>()

const route = useRoute()

const navRef = useTemplateRef('navRef')

const indicatorStyle = ref({
  width: '0px',
  transform: 'translateX(0px)',
  opacity: '0'
})

function updateIndicator() {
  nextTick(() => {
    const navEl = navRef.value as HTMLElement

    if (!navEl) return

    const activeEl = navEl.querySelector(
      '[data-slot="link"][aria-current="page"]'
    ) as HTMLElement | null

    if (!activeEl) return

    indicatorStyle.value = {
      width: `${activeEl.offsetWidth - 16}px`,
      transform: `translateX(${activeEl.offsetLeft + 25}px)`,
      opacity: '1'
    }
  })
}

onMounted(updateIndicator)

watch(() => route.path, updateIndicator)
</script>

<template>
  <div class="fixed bottom-14 left-1/2 -translate-x-1/2 z-50">
    <div ref="navRef" class="relative">
      <!-- indicator -->
      <div
        class="pointer-events-none absolute bottom-[8px] left-0 z-50 h-[3px] rounded-full bg-white shadow-[0_0_14px_rgba(255,255,255,0.95)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        :style="indicatorStyle"
      />

      <UNavigationMenu
        :items="props.links"
        variant="link"
        style="padding: 5px 15px"
        color="neutral"
        class="bg-muted/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5 overflow-visible"
        :ui="{
          link: 'px-2 py-1 transition-all duration-300',
          linkLeadingIcon: 'hidden'
        }"
      />
    </div>
  </div>
</template>
