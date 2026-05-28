<script setup lang="ts">
const { footer } = useAppConfig()
</script>

<template>
  <UFooter class="z-10 bg-default" :ui="{ left: 'text-muted text-xs' }" style="margin-bottom: 4rem">
    <template #left>
      {{ footer.credits }}
    </template>

    <template #right>
      <template v-if="footer?.links">
        <UButton
          v-for="(link, index) of footer?.links"
          :key="index"
          size="xs"
          color="neutral"
          variant="ghost"
          :icon="link.image ? undefined : link.icon"
          :to="link.to"
          :target="link.target"
          :aria-label="link['aria-label']"
        >
          <template v-if="link.image" #leading>
            <img
              :src="link.image"
              :alt="link['aria-label']"
              class="size-4 object-contain dark:invert"
            >
          </template>
        </UButton>
      </template>
    </template>
  </UFooter>
</template>
