<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()
</script>

<template>
  <UPageSection
    :title="page.about.title"
    :ui="{
      container: 'p-0!',
      title: 'text-start text-xl sm:text-xl lg:text-2xl font-medium'
    }"
  >
    <template #description>
      <div class="text-start mt-3 space-y-4 text-sm sm:text-md lg:text-sm text-muted leading-7">
        <p
          v-for="paragraph in page.about.description.split('\n\n')"
          :key="paragraph"
        >
          {{ paragraph }}
        </p>
      </div>
    </template>
  </UPageSection>
</template>
