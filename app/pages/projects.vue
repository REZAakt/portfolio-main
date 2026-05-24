<!-- eslint-disable vue/max-attributes-per-line -->
<script setup lang="ts">
const { contentPath } = useContentPath()

const pagePath = computed(() => contentPath.value)

const projectsStemPrefix = computed(() => {
  return contentPath.value.startsWith('/en') ? 'en/projects/' : 'fa/projects/'
})

const { data: page } = await useAsyncData(
  () => `projects-page-${pagePath.value}`,
  () => queryCollection('pages').path(pagePath.value).first(),
  {
    watch: [pagePath]
  }
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page not found: ${pagePath.value}`,
    fatal: true
  })
}

const { data: projects } = await useAsyncData(
  () => `projects-${projectsStemPrefix.value}`,
  async () => {
    const allProjects = await queryCollection('projects').order('date', 'DESC').all()

    // eslint-disable-next-line @stylistic/arrow-parens
    return allProjects.filter((project) => project.stem.startsWith(projectsStemPrefix.value))
  },
  {
    watch: [projectsStemPrefix]
  }
)

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
      :links="page.links"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.links"
          class="flex items-center gap-2"
        >
          <UButton
            :label="page.links[0]?.label"
            :to="global.meetingLink"
            v-bind="page.links[0]"
          />
          <UButton
            :to="`mailto:${global.email}`"
            v-bind="page.links[1]"
          />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <Motion
        v-for="(project, index) in projects"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="project.title"
          :description="project.description"
          :to="project.url"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          class="group"
          :ui="{
            wrapper: 'max-sm:order-last'
          }"
        >
          <template #leading>
            <span class="text-sm text-muted">
              {{ new Date(project.date).getFullYear() }}
            </span>
          </template>
          <template #footer>
            <ULink
              :to="project.url"
              class="text-sm text-primary flex items-center"
            >
              View Project
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </ULink>
          </template>
          <NuxtImg
            :src="project.image"
            :alt="project.title"
            width="400"
            height="192"
            class="object-cover w-full h-48 rounded-lg"
            loading="lazy"
          />
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>
