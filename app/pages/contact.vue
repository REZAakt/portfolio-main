<script setup lang="ts">
const { contentPath } = useContentPath()
const appConfig = useAppConfig()
const globalConfig = appConfig.global as typeof appConfig.global & {
  phone?: string
  telegram?: string
  linkedin?: string
  instagram?: string
}

const { data: page } = await useAsyncData(
  () => `contact-${contentPath.value}`,
  () => queryCollection('contact').path(contentPath.value).first(),
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

const title = computed(() => page.value?.seo?.title || page.value?.title)
const description = computed(() => page.value?.seo?.description || page.value?.description)

const mailTo = computed(() => {
  const subject = encodeURIComponent(page.value?.emailSubject || 'Project inquiry')
  const body = encodeURIComponent(page.value?.emailBody || '')

  return `mailto:${globalConfig.email}?subject=${subject}&body=${body}`
})

const telTo = computed(() => (globalConfig.phone ? `tel:${globalConfig.phone}` : undefined))

const availability = computed(() => {
  if (globalConfig.available) {
    return {
      title: page.value?.availability.title,
      badge: page.value?.availability.badge,
      description: page.value?.availability.description,
      color: 'success' as const,
      icon: 'i-lucide-circle-check',
      cardClass: 'border border-success/25 bg-success/10 ring-1 ring-success/10'
    }
  }

  return {
    title: page.value?.availability.unavailableTitle || page.value?.availability.title,
    badge: page.value?.availability.unavailableBadge || page.value?.availability.badge,
    description: page.value?.availability.unavailableDescription || page.value?.availability.description,
    color: 'error' as const,
    icon: 'i-lucide-circle-minus',
    cardClass: 'border border-error/30 bg-error/10 ring-1 ring-error/10'
  }
})

const contactCards = computed(() =>
  page.value?.contactCards.filter(item => item.to !== 'phone' || globalConfig.phone) || []
)

function resolveContactLink(to: string) {
  if (to === 'email') {
    return mailTo.value
  }

  if (to === 'phone') {
    return telTo.value
  }

  if (to === 'telegram') {
    return globalConfig.telegram
  }

  if (to === 'linkedin') {
    return globalConfig.linkedin
  }

  if (to === 'instagram') {
    return globalConfig.instagram
  }

  return to
}

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
      :links="[
        {
          label: page.primaryAction,
          icon: 'i-lucide-mail',
          to: mailTo,
          color: 'primary',
          size: 'lg'
        }
      ]"
      :ui="{
        container: 'lg:grid lg:grid-cols-2 lg:items-center lg:gap-16',
        title: 'mx-0! text-start',
        description: 'mx-0! text-start max-w-2xl',
        links: 'justify-start'
      }"
    >
      <div class="mt-10 lg:mt-0">
        <UCard
          :class="availability.cardClass"
          :ui="{
            body: 'space-y-6'
          }"
        >
          <div class="flex items-center justify-between gap-4">
            <div>
              <p class="text-sm text-muted">
                {{ page.availability.label }}
              </p>
              <p class="mt-1 text-xl font-semibold text-highlighted">
                {{ availability.title }}
              </p>
            </div>

            <UBadge
              :label="availability.badge"
              :icon="availability.icon"
              :color="availability.color"
              variant="subtle"
              size="lg"
            />
          </div>

          <p class="text-muted">
            {{ availability.description }}
          </p>

          <USeparator />

          <div class="grid gap-4 sm:grid-cols-2">
            <div
              v-for="item in page.quickInfo"
              :key="item.label"
              class="space-y-1"
            >
              <p class="text-sm text-muted">
                {{ item.label }}
              </p>
              <p class="font-medium text-highlighted">
                {{ item.value }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </UPageHero>

    <UPageSection
      :title="page.contactTitle"
      :description="page.contactDescription"
      :ui="{
        title: 'text-start',
        description: 'text-start',
        container: 'pt-0!'
      }"
    >
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <UCard
          v-for="item in contactCards"
          :key="item.title"
          class="transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div class="space-y-4">
            <div
              class="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"
            >
              <UIcon
                :name="item.icon"
                class="size-5"
              />
            </div>

            <div>
              <h2 class="text-lg font-semibold text-highlighted">
                {{ item.title }}
              </h2>
              <p class="mt-1 text-sm text-muted">
                {{ item.description }}
              </p>
            </div>

            <UButton
              :to="resolveContactLink(item.to)"
              :label="item.label"
              :icon="item.buttonIcon"
              :target="item.target"
              color="neutral"
              variant="subtle"
              block
            />
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageCTA
      :title="page.cta.title"
      :description="page.cta.description"
      :links="[
        {
          label: page.cta.primaryAction,
          icon: 'i-lucide-send',
          to: page.cta.to || globalConfig.telegram,
          target: page.cta.target,
          color: 'primary',
          size: 'lg'
        }
      ]"
      variant="subtle"
    />

    <UPageSection
      :title="page.workTitle"
      :description="page.workDescription"
      :ui="{
        title: 'text-start',
        description: 'text-start'
      }"
    >
      <div class="grid gap-4 md:grid-cols-2">
        <UCard
          v-for="item in page.workTypes"
          :key="item.title"
        >
          <div class="flex gap-4">
            <div
              class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted"
            >
              <UIcon
                :name="item.icon"
                class="size-5 text-primary"
              />
            </div>

            <div>
              <h3 class="font-semibold text-highlighted">
                {{ item.title }}
              </h3>
              <p class="mt-1 text-sm text-muted">
                {{ item.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection
      :title="page.processTitle"
      :description="page.processDescription"
      :ui="{
        title: 'text-start',
        description: 'text-start'
      }"
    >
      <div class="grid gap-4 md:grid-cols-3">
        <UCard
          v-for="(item, index) in page.process"
          :key="item.title"
        >
          <div class="space-y-4">
            <UBadge
              :label="String(index + 1).padStart(2, '0')"
              color="primary"
              variant="subtle"
            />

            <div>
              <h3 class="font-semibold text-highlighted">
                {{ item.title }}
              </h3>
              <p class="mt-2 text-sm text-muted">
                {{ item.description }}
              </p>
            </div>
          </div>
        </UCard>
      </div>
    </UPageSection>

    <UPageSection
      v-if="page.faqs?.length"
      :title="page.faqTitle"
      :description="page.faqDescription"
      :ui="{
        title: 'text-start',
        description: 'text-start'
      }"
    >
      <UAccordion :items="page.faqs" />
    </UPageSection>
  </UPage>
</template>
