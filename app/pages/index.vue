<script setup lang="ts">
const route = useRoute()
const { contentLocale } = useContentPath()

const pagePath = computed(() => (contentLocale.value === 'en' ? '/en' : '/fa'))

const { data: page } = await useAsyncData(
  () => `index-${route.path}-${contentLocale.value}`,
  () => queryCollection('index').path(pagePath.value).first(),
  {
    watch: [() => route.path, contentLocale]
  }
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page not found: ${route.path}`,
    fatal: true
  })
}

useSeoMeta({
  title: () => page.value?.seo?.title || page.value?.title,
  ogTitle: () => page.value?.seo?.title || page.value?.title,
  description: () => page.value?.seo?.description || page.value?.description,
  ogDescription: () => page.value?.seo?.description || page.value?.description,
  ogImage: () =>
    contentLocale.value === 'fa'
      ? 'https://rezaakbarpour.ir/og-fa.jpg'
      : 'https://rezaakbarpour.ir/og-en.jpg',
  twitterImage: () =>
    contentLocale.value === 'fa'
      ? 'https://rezaakbarpour.ir/og-fa.jpg'
      : 'https://rezaakbarpour.ir/og-en.jpg',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page="page" />

    <UPageSection
      class="relative z-10 -mt-24 sm:-mt-28 lg:-mt-36"
      :ui="{
        container: 'pt-0! lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <LandingAbout :page="page" />
      <LandingWorkExperience :page="page" />
    </UPageSection>

    <LandingBlog :page="page" />
    <LandingCompanyIconviewer :page="page" />
    <!-- <LandingTestimonials :page="page" /> -->
    <LandingFAQ :page="page" />
  </UPage>
</template>
