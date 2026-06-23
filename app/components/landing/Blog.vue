<!-- eslint-disable @stylistic/arrow-parens -->
<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { contentLocale, contentLocalePrefix, toRoutePath } = useContentPath()

const blogPathPrefix = computed(() => {
  return `${contentLocalePrefix.value}/blog/`
})

const projectsStemPrefix = computed(() => {
  return `${contentLocale.value}/projects/`
})

const isEnglish = computed(() => contentLocale.value === 'en')

const projectsTitle = computed(() => (isEnglish.value ? 'Latest Projects' : 'آخرین پروژه‌ها'))
const projectsDescription = computed(() =>
  isEnglish.value ? 'A selection of recent work' : 'چند نمونه از کارهای اخیر من'
)
const projectLinkLabel = computed(() => (isEnglish.value ? 'View Project' : 'مشاهده پروژه'))
const articleLinkLabel = computed(() => (isEnglish.value ? 'Read Article' : 'خواندن مقاله'))

const { data: posts } = await useAsyncData(
  () => `index-blogs-${contentLocale.value}`,
  async () => {
    const allPosts = await queryCollection('blog').order('date', 'DESC').all()

    return allPosts.filter((post) => post.path.startsWith(blogPathPrefix.value)).slice(0, 2)
  },
  {
    watch: [blogPathPrefix]
  }
)

const { data: projects } = await useAsyncData(
  () => `index-projects-${contentLocale.value}`,
  async () => {
    const allProjects = await queryCollection('projects').order('date', 'DESC').all()

    return allProjects.filter((project) => project.stem.startsWith(projectsStemPrefix.value)).slice(0, 2)
  },
  {
    watch: [projectsStemPrefix]
  }
)

if (!posts.value || !projects.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'landing posts not found',
    fatal: true
  })
}
</script>

<template>
  <UPageSection
    :ui="{
      container: 'px-0 pt-0! grid gap-10 lg:grid-cols-2 lg:gap-8'
    }"
  >
    <section class="space-y-6">
      <div>
        <h2 class="text-start text-xl sm:text-xl lg:text-2xl font-medium">
          {{ projectsTitle }}
        </h2>
        <p class="text-start mt-2 text-sm sm:text-md lg:text-sm text-muted">
          {{ projectsDescription }}
        </p>
      </div>

      <UBlogPosts
        orientation="vertical"
        class="gap-4 lg:gap-y-4"
      >
        <UBlogPost
          v-for="(project, index) in projects"
          :key="project.path || index"
          orientation="horizontal"
          variant="naked"
          v-bind="project"
          :to="toRoutePath(project.path)"
          :ui="{
            root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
            body: 'px-0!',
            header: 'hidden'
          }"
        >
          <template #footer>
            <UButton
              size="xs"
              variant="link"
              class="px-0 gap-0"
              :label="projectLinkLabel"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-primary transition-all opacity-0 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 group-hover:opacity-100"
                />
              </template>
            </UButton>
          </template>
        </UBlogPost>
      </UBlogPosts>
    </section>

    <section class="space-y-6">
      <div>
        <h2 class="text-start text-xl sm:text-xl lg:text-2xl font-medium">
          {{ page.blog.title }}
        </h2>
        <p class="text-start mt-2 text-sm sm:text-md lg:text-sm text-muted">
          {{ page.blog.description }}
        </p>
      </div>

      <UBlogPosts
        orientation="vertical"
        class="gap-4 lg:gap-y-4"
      >
        <UBlogPost
          v-for="(post, index) in posts"
          :key="post.path || index"
          orientation="horizontal"
          variant="naked"
          v-bind="post"
          :to="toRoutePath(post.path)"
          :ui="{
            root: 'group relative lg:items-start lg:flex ring-0 hover:ring-0',
            body: 'px-0!',
            header: 'hidden'
          }"
        >
          <template #footer>
            <UButton
              size="xs"
              variant="link"
              class="px-0 gap-0"
              :label="articleLinkLabel"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-4 text-primary transition-all opacity-0 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 group-hover:opacity-100"
                />
              </template>
            </UButton>
          </template>
        </UBlogPost>
      </UBlogPosts>
    </section>
  </UPageSection>
</template>
