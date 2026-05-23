<!-- eslint-disable @stylistic/arrow-parens -->
<script setup lang="ts">
const { contentPath, toRoutePath } = useContentPath()

const { data: page } = await useAsyncData(
  () => `blog-page-${contentPath.value}`,
  () => queryCollection('pages').path(contentPath.value).first(),
  {
    watch: [contentPath]
  }
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Blog page not found: ${contentPath.value}`,
    fatal: true
  })
}

const { data: posts } = await useAsyncData(
  () => `blogs-${contentPath.value}`,
  async () => {
    const allPosts = await queryCollection('blog').order('date', 'DESC').all()

    // console.table(
    //   allPosts.map((post) => ({
    //     title: post.title,
    //     path: post.path,
    //     id: post.id,
    //     stem: post.stem
    //   }))
    // )

    return allPosts.filter((post) => post.path.startsWith(`${contentPath.value}/`))
  },
  {
    watch: [contentPath]
  }
)

if (!posts.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'blogs posts not found',
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
      :links="page.links"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    />

    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <UBlogPosts orientation="vertical">
        <Motion
          v-for="(post, index) in posts"
          :key="post.path"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.2 * index }"
          :in-view-options="{ once: true }"
        >
          <UBlogPost
            variant="naked"
            orientation="horizontal"
            :to="toRoutePath(post.path)"
            v-bind="post"
            :ui="{
              root: 'md:grid md:grid-cols-2 group overflow-visible transition-all duration-300',
              image:
                'group-hover/blog-post:scale-105 rounded-lg shadow-lg border-4 border-muted ring-2 ring-default',
              header:
                index % 2 === 0 ? 'sm:-rotate-1 overflow-visible' : 'sm:rotate-1 overflow-visible'
            }"
          />
        </Motion>
      </UBlogPosts>
    </UPageSection>
  </UPage>
</template>
