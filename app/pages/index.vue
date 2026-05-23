<script setup lang="ts">
const route = useRoute()
const { locale } = useI18n()

const possiblePaths = computed(() => {
  if (locale.value === 'en') {
    return ['/en', '/en/index']
  }

  return ['/', '/fa', '/fa/index']
})

const { data: page } = await useAsyncData(
  () => `index-${route.path}-${locale.value}`,
  async () => {
    const allPages = await queryCollection('index').all()

    // console.table(
    //   // eslint-disable-next-line @stylistic/arrow-parens
    //   allPages.map((item) => ({
    //     title: item.title,
    //     path: item.path,
    //     id: item.id,
    //     stem: item.stem
    //   }))
    // )

    // eslint-disable-next-line @stylistic/arrow-parens
    return allPages.find((item) => possiblePaths.value.includes(item.path)) || null
  },
  {
    watch: [() => route.path, locale]
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
    locale.value === 'fa'
      ? 'https://rezaakbarpour.ir/og-fa.jpg'
      : 'https://rezaakbarpour.ir/og-en.jpg',
  twitterImage: 'https://rezaakbarpour.ir/og-fa.jpg',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UPage v-if="page">
    <LandingHero :page="page" />

    <UPageSection
      :ui="{
        container: 'pt-0! lg:grid lg:grid-cols-2 lg:gap-8'
      }"
    >
      <LandingAbout :page="page" />
      <LandingWorkExperience :page="page" />
    </UPageSection>

    <LandingBlog :page="page" />
    <LandingTestimonials :page="page" />
    <LandingFAQ :page="page" />
  </UPage>
</template>
