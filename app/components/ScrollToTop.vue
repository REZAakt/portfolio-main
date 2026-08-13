<script setup lang="ts">
const isVisible = ref(false)
const isPulsing = ref(false)
let pulseTimer: number | undefined

function updateVisibility() {
  isVisible.value = window.scrollY > 280
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })

  pulseTimer = window.setInterval(() => {
    if (!isVisible.value) return

    isPulsing.value = true
    window.setTimeout(() => {
      isPulsing.value = false
    }, 900)
  }, 4000)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateVisibility)

  if (pulseTimer) {
    window.clearInterval(pulseTimer)
  }
})
</script>

<template>
  <ClientOnly>
    <Transition name="scroll-top">
      <UButton
        v-if="isVisible"
        aria-label="Scroll to top"
        title="Scroll to top"
        color="primary"
        variant="solid"
        class="scroll-top-button fixed right-4 bottom-24 z-40 size-12 rounded-full shadow-lg shadow-primary/25 sm:right-6 sm:bottom-6"
        :class="{ 'is-pulsing': isPulsing }"
        @click="scrollToTop"
      >
        <span class="scroll-top-icon">
          <UIcon name="i-lucide-chevron-up" class="size-7" />
        </span>
      </UButton>
    </Transition>
  </ClientOnly>
</template>

<style scoped>
.scroll-top-button {
  isolation: isolate;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease;
}

@media (min-width: 1024px) {
  .scroll-top-button {
    right: max(1.5rem, calc((100vw - var(--ui-container)) / 2 - 4.5rem));
  }
}

.scroll-top-button::before {
  position: absolute;
  z-index: -1;
  inset: -5px;
  border: 1px solid color-mix(in srgb, var(--ui-primary) 55%, transparent);
  border-radius: inherit;
  opacity: 0;
  content: '';
  transform: scale(0.7);
}

.scroll-top-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 28px color-mix(in srgb, var(--ui-primary) 35%, transparent);
}

.scroll-top-icon {
  display: grid;
  place-items: center;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}

.scroll-top-button:hover .scroll-top-icon {
  transform: translateY(-2px);
}

.scroll-top-button.is-pulsing {
  animation: button-pulse 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.scroll-top-button.is-pulsing::before {
  animation: ripple 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}

.scroll-top-enter-active,
.scroll-top-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.scroll-top-enter-from,
.scroll-top-leave-to {
  opacity: 0;
  transform: translateY(18px) scale(0.72);
}

@keyframes button-pulse {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }

  35% {
    transform: translateY(-3px) scale(1.08);
  }

  65% {
    transform: translateY(0) scale(0.96);
  }
}

@keyframes ripple {
  0% {
    opacity: 0.8;
    transform: scale(0.7);
  }

  100% {
    opacity: 0;
    transform: scale(1.45);
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-top-button,
  .scroll-top-icon,
  .scroll-top-enter-active,
  .scroll-top-leave-active {
    transition: none;
  }

  .scroll-top-button.is-pulsing,
  .scroll-top-button.is-pulsing::before {
    animation: none;
  }
}
</style>
