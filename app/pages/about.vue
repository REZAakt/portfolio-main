<script setup lang="ts">
const { contentPath } = useContentPath()

const { data: page } = await useAsyncData(
  () => `about-${contentPath.value}`,
  () => queryCollection('about').path(contentPath.value).first(),
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

const { global } = useAppConfig()

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
      orientation="horizontal"
      :ui="{
        container: 'lg:flex sm:flex-row items-center',
        title: 'mx-0! text-start',
        description: 'mx-0! text-start',
        links: 'justify-start'
      }"
    >
      <UColorModeAvatar
        class="sm:rotate-4 size-36 rounded-lg ring ring-default ring-offset-3 ring-offset-bg"
        :light="global.picture?.light!"
        :dark="global.picture?.dark!"
        :alt="global.picture?.alt!"
      />
    </UPageHero>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <MDC
        :value="page.content"
        unwrap="p"
      />
      <div class="flex flex-row justify-center items-center py-10 -space-x-8 rtl:space-x-reverse">
        <PolaroidItem
          v-for="(image, index) in page.images"
          :key="index"
          :image="image"
          :index
        />
      </div>
    </UPageSection>
  </UPage>
</template>
