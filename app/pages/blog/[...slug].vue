<!-- eslint-disable @stylistic/arrow-parens -->
<script setup lang="ts">
const route = useRoute()
const { contentPath, toRoutePath } = useContentPath()

// console.group('🔥 BLOG POST DEBUG')
// console.log('route.path:', route.path)
// console.log('contentPath:', contentPath.value)

const { data: page } = await useAsyncData(
  () => `blog-post-${contentPath.value}`,
  async () => {
    const allPosts = await queryCollection('blog').all()

    // console.table(
    //   allPosts.map((post) => ({
    //     title: post.title,
    //     path: post.path,
    //     id: post.id,
    //     stem: post.stem
    //   }))
    // )

    const matchedPost = allPosts.find((post) => post.path === contentPath.value)

    // console.log('matchedPost:', matchedPost)
    // console.groupEnd()

    return matchedPost || null
  },
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

const { data: surround } = await useAsyncData(
  () => `${contentPath.value}-surround`,
  () =>
    queryCollectionItemSurroundings('blog', contentPath.value, {
      fields: ['description']
    }),
  {
    watch: [contentPath]
  }
)

const localizedSurround = computed(() => {
  return surround.value?.map((item) => {
    if (!item) return item

    return {
      ...item,
      path: item.path ? toRoutePath(item.path) : item.path
    }
  })
})

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  description,
  ogDescription: description,
  ogTitle: title
})

if (page.value.image) {
  useSeoMeta({ ogImage: page.value.image })
} else {
  defineOgImage('Portfolio', {
    title,
    description,
    headline: 'Blog'
  })
}

const articleLink = computed(() => {
  if (import.meta.client) {
    return window.location.href
  }

  return ''
})

const backLink = computed(() => {
  return route.path.startsWith('/en') ? '/en/blog' : '/blog'
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer class="relative min-h-screen">
      <UPage v-if="page">
        <ULink
          :to="backLink"
          class="text-sm flex items-center gap-1"
        >
          <UIcon name="i-lucide-chevron-left" />
          Blog
        </ULink>

        <div class="flex flex-col gap-3 mt-8">
          <div class="flex text-xs text-muted items-center justify-center gap-2">
            <span v-if="page.date">
              {{ formatDate(page.date) }}
            </span>
            <span v-if="page.date && page.minRead"> - </span>
            <span v-if="page.minRead"> {{ page.minRead }} MIN READ </span>
          </div>

          <NuxtImg
            v-if="page.image"
            :src="page.image"
            :alt="page.title"
            class="rounded-lg w-full h-[300px] object-cover object-center"
          />

          <h1 class="text-4xl text-center font-medium max-w-3xl mx-auto mt-4">
            {{ page.title }}
          </h1>

          <p class="text-muted text-center max-w-2xl mx-auto">
            {{ page.description }}
          </p>

          <div class="flex items-center justify-center gap-2 mt-2">
            <UUser
              orientation="vertical"
              color="neutral"
              variant="outline"
              class="justify-center items-center text-center"
              v-bind="page.author"
            />
          </div>
        </div>

        <UPageBody class="max-w-3xl mx-auto">
          <ContentRenderer
            v-if="page.body"
            :value="page"
          />

          <div class="flex items-center justify-end gap-2 text-sm text-muted">
            <UButton
              size="sm"
              variant="link"
              color="neutral"
              label="Copy link"
              @click="copyToClipboard(articleLink, 'Article link copied to clipboard')"
            />
          </div>

          <UContentSurround :surround="localizedSurround" />
        </UPageBody>
      </UPage>
    </UContainer>
  </UMain>
</template>
