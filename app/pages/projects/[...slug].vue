<!-- eslint-disable vue/max-attributes-per-line -->
<script setup lang="ts">
const route = useRoute()
const { contentPath, toRoutePath } = useContentPath()

const projectStem = computed(() => {
  const slug = route.params.slug
  const slugPath = (Array.isArray(slug) ? slug : [slug])
    .filter(Boolean)
    .join('/')
  const localePrefix = route.path.startsWith('/en') ? 'en' : 'fa'

  return `${localePrefix}/projects/${slugPath}`
})

const { data: project } = await useAsyncData(
  () => `project-${projectStem.value}`,
  async () => {
    const projects = await queryCollection('projects').all()

    return projects.find(item => item.stem === projectStem.value)
  },
  {
    watch: [projectStem]
  }
)

if (!project.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `Project not found: ${contentPath.value}`,
    fatal: true
  })
}

const { data: surround } = await useAsyncData(
  () => `${contentPath.value}-project-surround`,
  () =>
    queryCollectionItemSurroundings('projects', contentPath.value, {
      fields: ['description']
    }),
  {
    watch: [contentPath]
  }
)

const localizedSurround = computed(() =>
  surround.value?.map((item) => {
    if (!item) return item

    return {
      ...item,
      path: item.path ? toRoutePath(item.path) : item.path
    }
  })
)

const getSurroundDescription = (item: unknown) =>
  (item as { description?: string }).description

const isEnglish = computed(() => route.path.startsWith('/en'))

const labels = computed(() => {
  if (isEnglish.value) {
    return {
      back: 'Projects',
      overview: 'Project Overview',
      details: 'Project Details',
      visit: 'Visit Project',
      media: 'Media'
    }
  }

  return {
    back: 'پروژه ها',
    overview: 'نمای کلی پروژه',
    details: 'جزئیات پروژه',
    visit: 'مشاهده پروژه',
    media: 'رسانه ها'
  }
})

type ProjectMediaItem = {
  type?: 'image' | 'video'
  src: string
  alt?: string
  poster?: string
  caption?: string
}

const backLink = computed(() => (isEnglish.value ? '/en/projects' : '/projects'))

const projectMedia = computed<ProjectMediaItem[]>(() => {
  if (project.value?.media?.length) {
    return project.value.media
  }

  return project.value?.image
    ? [
        {
          type: 'image' as const,
          src: project.value.image,
          alt: project.value.title
        }
      ]
    : []
})

const detailItems = computed(() => {
  const details = [...(project.value?.details || [])]
  const existingLabels = new Set(details.map(item => item.label))

  const fallbackDetails = [
    { label: isEnglish.value ? 'Year' : 'سال', value: project.value?.year || String(new Date(project.value?.date || '').getFullYear()) },
    { label: isEnglish.value ? 'Role' : 'نقش', value: project.value?.role },
    { label: isEnglish.value ? 'Client' : 'کارفرما', value: project.value?.client },
    { label: isEnglish.value ? 'Platform' : 'پلتفرم', value: project.value?.platform },
    { label: isEnglish.value ? 'Duration' : 'مدت زمان', value: project.value?.duration }
  ]

  fallbackDetails.forEach((item) => {
    if (item.value && !existingLabels.has(item.label)) {
      details.push({ label: item.label, value: item.value })
    }
  })

  return details
})

const externalUrl = computed(() => {
  if (!project.value?.url || project.value.url === '#') return undefined

  return project.value.url
})

const title = project.value?.seo?.title || project.value?.title
const description = project.value?.seo?.description || project.value?.description

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: project.value?.image
})
</script>

<template>
  <UMain class="mt-20 px-2">
    <UContainer>
      <UPage v-if="project">
        <ULink
          :to="backLink"
          class="inline-flex items-center gap-1 text-sm text-muted hover:text-highlighted"
        >
          <UIcon
            name="i-lucide-chevron-left"
            class="rtl:rotate-180"
          />
          {{ labels.back }}
        </ULink>

        <section class="pt-8 pb-10">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
            <div class="space-y-6">
              <div class="flex flex-wrap items-center gap-2">
                <UBadge
                  v-for="tag in project.tags"
                  :key="tag"
                  :label="tag"
                  color="neutral"
                  variant="subtle"
                />
              </div>

              <div class="space-y-4">
                <h1 class="max-w-4xl text-4xl font-semibold tracking-normal text-highlighted sm:text-5xl lg:text-6xl">
                  {{ project.title }}
                </h1>
                <p class="max-w-3xl text-lg leading-8 text-muted">
                  {{ project.description }}
                </p>
              </div>
            </div>

            <UCard
              v-if="detailItems.length || externalUrl"
              variant="subtle"
              :ui="{ body: 'space-y-5' }"
            >
              <div class="flex items-center justify-between gap-3">
                <p class="font-medium text-highlighted">
                  {{ labels.details }}
                </p>
                <UIcon
                  name="i-lucide-folder-kanban"
                  class="size-5 text-primary"
                />
              </div>

              <dl class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div
                  v-for="item in detailItems"
                  :key="item.label"
                  class="space-y-1"
                >
                  <dt class="text-xs uppercase text-muted">
                    {{ item.label }}
                  </dt>
                  <dd class="font-medium text-highlighted">
                    {{ item.value }}
                  </dd>
                </div>
              </dl>

              <UButton
                v-if="externalUrl"
                :to="externalUrl"
                :label="labels.visit"
                icon="i-lucide-external-link"
                target="_blank"
                color="primary"
                block
              />
            </UCard>
          </div>
        </section>

        <section
          v-if="projectMedia.length"
          class="pb-12"
          data-swipe-navigation-ignore
        >
          <div class="mb-4 flex items-center justify-between">
            <p class="text-sm font-medium text-muted">
              {{ labels.media }}
            </p>
            <span class="text-sm text-muted">
              {{ projectMedia.length }}
            </span>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <figure
              v-for="(item, index) in projectMedia"
              :key="`${item.src}-${index}`"
              :class="[
                'overflow-hidden rounded-lg border border-default bg-muted/40',
                index === 0 ? 'md:col-span-2' : ''
              ]"
            >
              <video
                v-if="item.type === 'video'"
                :src="item.src"
                :poster="item.poster"
                class="aspect-video h-full w-full bg-muted object-cover"
                controls
                playsinline
                preload="metadata"
              />

              <NuxtImg
                v-else
                :src="item.src"
                :alt="item.alt || project.title"
                :class="[
                  'w-full object-cover',
                  index === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                ]"
                sizes="100vw sm:100vw md:50vw lg:1024px"
                loading="lazy"
              />

              <figcaption
                v-if="item.caption"
                class="border-t border-default px-4 py-3 text-sm text-muted"
              >
                {{ item.caption }}
              </figcaption>
            </figure>
          </div>
        </section>

        <section class="grid gap-10 pb-20 lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside class="hidden lg:block">
            <div class="sticky top-24 space-y-3">
              <p class="text-sm font-medium text-highlighted">
                {{ labels.overview }}
              </p>
              <div class="h-px bg-default" />
            </div>
          </aside>

          <UPageBody class="max-w-3xl">
            <ContentRenderer
              v-if="project.body"
              :value="project"
            />

            <div
              v-if="localizedSurround?.some(Boolean)"
              class="mt-10 grid gap-4 sm:grid-cols-2"
            >
              <div
                v-for="(item, index) in localizedSurround"
                :key="item?.path || index"
              >
                <ULink
                  v-if="item"
                  :to="item.path"
                  class="group block h-full"
                >
                  <UCard
                    class="h-full transition-colors hover:border-primary/50"
                    :ui="{ body: 'h-full' }"
                  >
                    <div
                      class="flex h-full flex-col gap-4"
                      :class="index === 0 ? 'items-start text-start' : 'items-end text-end'"
                    >
                      <span class="flex size-9 items-center justify-center rounded-full border border-default bg-muted text-highlighted transition-colors group-hover:border-primary group-hover:text-primary">
                        <UIcon
                          :name="index === 0 ? 'i-lucide-arrow-left' : 'i-lucide-arrow-right'"
                          class="size-5 rtl:rotate-180"
                        />
                      </span>

                      <span class="block">
                        <span class="block font-semibold text-highlighted">
                          {{ item.title }}
                        </span>
                        <span
                          v-if="getSurroundDescription(item)"
                          class="mt-1 line-clamp-2 block text-sm text-muted"
                        >
                          {{ getSurroundDescription(item) }}
                        </span>
                      </span>
                    </div>
                  </UCard>
                </ULink>
              </div>
            </div>
          </UPageBody>
        </section>
      </UPage>
    </UContainer>
  </UMain>
</template>
