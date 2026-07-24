<script setup lang="ts">
const companyIcons = [
  { src: '/Icons/companyicons/Aran.ico', alt: 'Aran' },
  { src: '/Icons/companyicons/Group%2069.ico', alt: 'Group 69' },
  { src: '/Icons/companyicons/Logo.ico', alt: 'Company logo' },
  { src: '/Icons/companyicons/DarTheme.ico', alt: 'DarTheme' },
  { src: '/Icons/companyicons/aran%20logo%20-%20Copy.ico', alt: 'Aran' },
  { src: '/Icons/companyicons/AMA.ico', alt: 'AMA' },
  { src: '/Icons/companyicons/karizlab.ico', alt: 'karizlab' }
]
</script>

<template>
  <UMarquee class="mb-[100px]">
    <img
      v-for="icon in companyIcons"
      :key="icon.src"
      :src="icon.src"
      :alt="icon.alt"
      class="size-12 shrink-0 object-contain"
    />
  </UMarquee>
</template>
