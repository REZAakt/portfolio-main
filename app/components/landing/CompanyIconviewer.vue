<script setup lang="ts">
const companyIcons = [
  { src: '/Icons/companyicons/Aran.ico', alt: 'Aran' },
  { src: '/Icons/companyicons/Rayan.ico', alt: 'Rayan' },
  { src: '/Icons/companyicons/Logo.ico', alt: 'Company logo' },
  { src: '/Icons/companyicons/DarTheme.ico', alt: 'DarTheme' },
  { src: '/Icons/companyicons/aran%20logo%20-%20Copy.ico', alt: 'Aran' },
  { src: '/Icons/companyicons/AMA.ico', alt: 'AMA' },
  { src: '/Icons/companyicons/Poyandegan.ico', alt: 'Poyandehgan school' },
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
