<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

defineProps<{
  links: NavigationMenuItem[]
}>()

const { y } = useWindowScroll()

const isScrolled = computed(() => y.value > 80)
</script>

<template>
  <Transition name="nav">
    <div
      :key="isScrolled ? 'bottom' : 'top'"
      :class="[
        'fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500',
        isScrolled ? 'bottom-4' : 'top-2 sm:top-4'
      ]"
    >
      <UNavigationMenu
        :items="links"
        variant="link"
        color="neutral"
        class="bg-muted/80 backdrop-blur-sm rounded-full px-2 sm:px-4 border border-muted/50 shadow-lg shadow-neutral-950/5"
        :ui="{
          link: 'px-2 py-1',
          linkLeadingIcon: 'hidden'
        }"
      >
        <!-- <template #list-trailing>
          <ColorModeButton />
        </template> -->
      </UNavigationMenu>
    </div>
  </Transition>
</template>
