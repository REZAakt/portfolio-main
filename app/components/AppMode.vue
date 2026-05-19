<script setup lang="ts">
import LanguageSwitchButton from './LanguageSwitchButton.vue'
</script>

<template>
  <div
    class="sticky top-4 mx-auto w-fit z-50 bg-muted/80 backdrop-blur-sm rounded-full px-3 py-1 border border-muted/50 shadow-lg shadow-neutral-950/5 flex items-center gap-2"
  >
    <LanguageSwitchButton />
    <ColorModeButton />
  </div>
</template>
