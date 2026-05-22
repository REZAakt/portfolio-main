<!-- eslint-disable @stylistic/arrow-parens -->
<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => (colorMode.value === 'dark' ? '#020618' : 'white'))

const swipeDirection = useSwipeDirection()

const localeHead = useLocaleHead()

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,

  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color },
    ...(localeHead.value.meta || [])
  ],

  link: [
    { rel: 'icon', href: '/favicon.ico' },

    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png'
    }
  ]
}))

useSeoMeta({
  titleTemplate: '%s - Portfolio',
  twitterCard: 'summary_large_image'
})

const [{ data: navigation }, { data: files }] = await Promise.all([
  useAsyncData(
    'navigation',
    () => {
      return Promise.all([queryCollectionNavigation('blog')])
    },
    {
      transform: (data) => data.flat()
    }
  ),
  useLazyAsyncData(
    'search',
    () => {
      return Promise.all([queryCollectionSearchSections('blog')])
    },
    {
      server: false,
      transform: (data) => data.flat()
    }
  )
])
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator />

    <NuxtLayout>
      <UMain class="relative overflow-hidden" :data-direction="swipeDirection || undefined">
        <NuxtPage
          :transition="{
            name: 'page',
            mode: 'out-in',
            onAfterLeave: () => {
              swipeDirection = null
            }
          }"
        />
      </UMain>
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        shortcut="meta_k"
        :links="navLinks"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>
  </UApp>
</template>
