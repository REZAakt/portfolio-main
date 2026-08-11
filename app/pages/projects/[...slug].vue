<!-- eslint-disable @stylistic/arrow-parens -->
<!-- eslint-disable vue/max-attributes-per-line -->
<script setup lang="ts">
const route = useRoute()
const { contentPath, toRoutePath } = useContentPath()

const projectLocalePrefix = computed(() =>
  route.path.startsWith('/en') ? 'en/projects/' : 'fa/projects/'
)

const projectStem = computed(() => {
  const slug = route.params.slug
  const slugPath = (Array.isArray(slug) ? slug : [slug]).filter(Boolean).join('/')

  return `${projectLocalePrefix.value}${slugPath}`
})

const { data: project } = await useAsyncData(
  () => `project-${projectStem.value}`,
  async () => {
    const projects = await queryCollection('projects').all()

    return projects.find((item) => item.stem === projectStem.value)
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

const { data: localeProjects } = await useAsyncData(
  () => `project-surround-${projectLocalePrefix.value}`,
  async () => {
    const projects = await queryCollection('projects').order('date', 'DESC').all()

    return projects.filter((item) => item.stem.startsWith(projectLocalePrefix.value))
  },
  {
    watch: [projectLocalePrefix]
  }
)

const localizedSurround = computed(() => {
  const projects = localeProjects.value || []
  const currentIndex = projects.findIndex((item) => item.stem === project.value?.stem)

  if (currentIndex === -1) return []

  return [
    currentIndex > 0 ? projects[currentIndex - 1] : null,
    currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null
  ].map((item) => {
    if (!item) return item

    return {
      ...item,
      path: item.path ? toRoutePath(item.path) : item.path
    }
  })
})

const getSurroundDescription = (item: unknown) => (item as { description?: string }).description

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

const selectedMediaIndex = ref(0)

watch(
  projectMedia,
  (items) => {
    if (!items.length || selectedMediaIndex.value < items.length) return

    selectedMediaIndex.value = 0
  },
  { immediate: true }
)

const selectedMedia = computed(() => projectMedia.value[selectedMediaIndex.value])

const getMediaIndex = (mediaItem: ProjectMediaItem) =>
  projectMedia.value.findIndex((item) => item.src === mediaItem.src)

const mediaScroller = ref<HTMLElement>()

const onMediaWheel = (event: WheelEvent) => {
  const scroller = mediaScroller.value
  if (!scroller || !event.deltaY || scroller.scrollWidth <= scroller.clientWidth) return

  const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth
  const nextScrollLeft = Math.min(
    maxScrollLeft,
    Math.max(0, scroller.scrollLeft + event.deltaY)
  )

  if (nextScrollLeft === scroller.scrollLeft) return

  event.preventDefault()
  scroller.scrollLeft = nextScrollLeft
}

const detailItems = computed(() => {
  const details = [...(project.value?.details || [])]
  const existingLabels = new Set(details.map((item) => item.label))

  const fallbackDetails = [
    {
      label: isEnglish.value ? 'Year' : 'سال',
      value: project.value?.year || String(new Date(project.value?.date || '').getFullYear())
    },
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
  <UMain class="mt-14 px-2 sm:mt-16">
    <UContainer>
      <UPage v-if="project">
        <ULink
          :to="backLink"
          class="inline-flex items-center gap-1 text-sm text-muted hover:text-highlighted"
        >
          <UIcon name="i-lucide-chevron-left" class="rtl:rotate-180" />
          {{ labels.back }}
        </ULink>

        <section
          v-if="projectMedia.length && selectedMedia"
          class="pt-4 pb-10"
          data-swipe-navigation-ignore
        >
          <UCard variant="subtle" :ui="{ body: 'p-0 sm:p-0' }">
            <div class="overflow-hidden rounded-lg bg-muted">
              <video
                v-if="selectedMedia.type === 'video'"
                :src="selectedMedia.src"
                :poster="selectedMedia.poster"
                class="aspect-video w-full bg-muted object-cover"
                controls
                playsinline
                preload="metadata"
              />

              <img
                v-else
                :src="selectedMedia.src"
                :alt="selectedMedia.alt || project.title"
                class="aspect-video w-full object-cover object-center"
                loading="eager"
              />
            </div>

            <div
              v-if="selectedMedia.caption"
              class="border-t border-default px-4 py-3 text-sm text-muted"
            >
              {{ selectedMedia.caption }}
            </div>
          </UCard>

          <div
            v-if="projectMedia.length > 1"
            class="mt-4"
            dir="ltr"
            role="region"
            aria-roledescription="carousel"
          >
            <div
              ref="mediaScroller"
              class="media-scroller snap-x snap-mandatory overflow-x-auto overscroll-x-contain pb-2"
              @wheel="onMediaWheel"
            >
              <div class="flex min-w-full w-max gap-3">
                <div
                  v-for="item in projectMedia"
                  :key="item.src"
                  class="basis-28 shrink-0 snap-start sm:basis-36"
                  role="group"
                  aria-roledescription="slide"
                >
                  <UButton
                    color="neutral"
                    variant="ghost"
                    class="h-auto w-full rounded-lg border p-1.5 transition"
                    :class="
                      getMediaIndex(item) === selectedMediaIndex
                        ? 'border-primary bg-primary/10 opacity-100 shadow-sm'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    "
                    @click="selectedMediaIndex = getMediaIndex(item)"
                  >
                    <span class="block w-full overflow-hidden rounded-md bg-muted">
                      <img
                        v-if="item.type !== 'video' || item.poster"
                        :src="item.poster || item.src"
                        :alt="item.alt || project.title"
                        class="aspect-video w-full object-cover"
                        loading="lazy"
                      />
                      <span v-else class="flex aspect-video w-full items-center justify-center">
                        <UIcon name="i-lucide-play" class="size-5 text-muted" />
                      </span>
                    </span>
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="pb-10">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
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
                <h1
                  class="max-w-4xl text-4xl font-semibold tracking-normal text-highlighted sm:text-5xl lg:text-6xl"
                >
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
                <UIcon name="i-lucide-folder-kanban" class="size-5 text-primary" />
              </div>

              <dl class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div v-for="item in detailItems" :key="item.label" class="space-y-1">
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

        <section class="pb-20">
          <UPageBody class="max-w-4xl text-start ltr:mr-auto rtl:ml-auto">
            <div class="mb-6 space-y-3">
              <p class="text-sm font-medium text-highlighted">
                {{ labels.overview }}
              </p>
              <div class="h-px bg-default" />
            </div>

            <div class="project-content text-start">
              <ContentRenderer v-if="project.body" :value="project" />
            </div>

            <div v-if="localizedSurround?.some(Boolean)" class="mt-10 grid gap-4 sm:grid-cols-2">
              <div v-for="(item, index) in localizedSurround" :key="item?.path || index">
                <ULink v-if="item" :to="item.path" class="group block h-full">
                  <UCard
                    class="h-full transition-colors hover:border-primary/50"
                    :ui="{ body: 'h-full' }"
                  >
                    <div
                      class="flex h-full flex-col gap-4"
                      :class="index === 0 ? 'items-start text-start' : 'items-end text-end'"
                    >
                      <span
                        class="flex size-9 items-center justify-center rounded-full border border-default bg-muted text-highlighted transition-colors group-hover:border-primary group-hover:text-primary"
                      >
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

<style scoped>
.media-scroller {
  scrollbar-color: color-mix(in srgb, var(--ui-text-muted) 45%, transparent) transparent;
  scrollbar-width: thin;
}

.media-scroller::-webkit-scrollbar {
  height: 10px;
}

.media-scroller::-webkit-scrollbar-track {
  background: transparent;
}

.media-scroller::-webkit-scrollbar-thumb {
  background: color-mix(in srgb, var(--ui-text-muted) 45%, transparent);
  background-clip: padding-box;
  border: 3px solid transparent;
  border-radius: 999px;
}

.media-scroller:hover::-webkit-scrollbar-thumb {
  background-color: color-mix(in srgb, var(--ui-text-muted) 65%, transparent);
}

.project-content :deep(h1),
.project-content :deep(h2),
.project-content :deep(h3),
.project-content :deep(h4),
.project-content :deep(h5),
.project-content :deep(h6),
.project-content :deep(p),
.project-content :deep(ul),
.project-content :deep(ol),
.project-content :deep(blockquote) {
  text-align: start;
}
</style>
