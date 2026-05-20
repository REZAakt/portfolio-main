<script setup lang="ts"></script>

<template>
  <div>
    <AppHeader :links="navLinks" />

    <!-- این فاصله باعث میشه AppMode اول پایین‌تر باشه -->
    <div class="h-24 sm:h-35" />

    <AppMode />
    <SwipeNavigation :links="navLinks">
      <UContainer class="sm:border-x border-default pt-10">
        <slot />
        <AppFooter />
      </UContainer>
    </SwipeNavigation>
  </div>
</template>
