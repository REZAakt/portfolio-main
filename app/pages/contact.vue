<script setup lang="ts">
const { contentPath } = useContentPath()

const { data: page } = await useAsyncData(
  () => `contact-${contentPath.value}`,
  () => queryCollection('contact').path(contentPath.value).first(),
  {
    watch: [contentPath]
  }
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page not found: ${contentPath.value}`,
    fatal: true
  })
}

const title = computed(() => page.value?.seo?.title || page.value?.title)
const description = computed(() => page.value?.seo?.description || page.value?.description)

useSeoMeta({
  title: () => title.value,
  ogTitle: () => title.value,
  description: () => description.value,
  ogDescription: () => description.value
})

defineOgImage('Portfolio', {
  title: title.value,
  description: description.value
})
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :ui="{
        title: 'mx-0! text-start',
        description: 'mx-0! text-start',
        links: 'justify-start'
      }"
    >
      <template #links>
        <UButton
          v-if="page.links?.[0]"
          :to="`mailto:${page.email}`"
          v-bind="page.links[0]"
        />
      </template>
    </UPageHero>

    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <div class="grid gap-8 md:grid-cols-2">
        <div class="space-y-2">
          <p class="text-sm font-medium text-muted">
            Email
          </p>
          <ULink
            :to="`mailto:${page.email}`"
            class="text-lg font-semibold text-highlighted hover:text-primary"
          >
            {{ page.email }}
          </ULink>
        </div>

        <div
          v-if="page.location"
          class="space-y-2"
        >
          <p class="text-sm font-medium text-muted">
            Location
          </p>
          <p class="text-lg font-semibold text-highlighted">
            {{ page.location }}
          </p>
        </div>
      </div>
    </UPageSection>
  </UPage>
</template>
