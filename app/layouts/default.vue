<script setup lang="ts">
const navLinks = useNavLinks()
</script>

<template>
  <div>
    <AppHeader :links="navLinks" />

    <AppMode />
    <ScrollToTop />
    <SwipeNavigation :links="navLinks">
      <UContainer class="sm:border-x border-default pt-10">
        <slot />
        <AppFooter />
      </UContainer>
    </SwipeNavigation>
  </div>
</template>
