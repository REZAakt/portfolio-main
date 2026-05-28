<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()
const { t } = useI18n()

defineProps<{
  page: IndexCollectionItem
}>()

const items = [
  'https://picsum.photos/468/468?random=1',
  'https://picsum.photos/468/468?random=2',
  'https://picsum.photos/468/468?random=3',
  'https://picsum.photos/468/468?random=4',
  'https://picsum.photos/468/468?random=5',
  'https://picsum.photos/468/468?random=6'
]
</script>

<template>
  <UPageHero
    :ui="{
      headline: 'flex items-center justify-center',
      title: 'text-shadow-md max-w-lg mx-auto',
      links: 'mt-4 flex-col justify-center items-center'
    }"
  >
    <template #headline>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1
        }"
      >
        <UColorModeAvatar
          class="size-40 ring ring-default ring-offset-3 ring-offset-bg"
          :light="global.picture?.light!"
          :dark="global.picture?.dark!"
          :alt="global.picture?.alt!"
        />
      </Motion>
    </template>

    <template #title>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.1
        }"
      >
        {{ page.title }}
      </Motion>
    </template>

    <template #description>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.3
        }"
      >
        {{ page.description }}
      </Motion>
    </template>

    <template #links>
      <Motion
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: 0.5
        }"
      >
        <div v-if="page.hero.links" class="flex items-center gap-2">
          <UButton v-bind="page.hero.links[0]" />
          <UButton
            :color="global.available ? 'success' : 'error'"
            variant="ghost"
            class="gap-2"
            :to="global.available ? global.meetingLink : ''"
            :label="global.available ? t('availability.available') : t('availability.unavailable')"
          >
            <template #leading>
              <span class="relative flex size-2">
                <span
                  class="absolute inline-flex size-full rounded-full opacity-75"
                  :class="global.available ? 'bg-success animate-ping' : 'bg-error'"
                />
                <span
                  class="relative inline-flex size-2 scale-90 rounded-full"
                  :class="global.available ? 'bg-success' : 'bg-error'"
                />
              </span>
            </template>
          </UButton>
        </div>
      </Motion>

      <div class="gap-x-4 inline-flex mt-4">
        <Motion
          v-for="(link, index) of footer?.links"
          :key="index"
          :initial="{
            scale: 1.1,
            opacity: 0,
            filter: 'blur(20px)'
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            duration: 0.6,
            delay: 0.5 + index * 0.1
          }"
        >
          <UTooltip
            :text="link.tooltipKey ? t(link.tooltipKey) : link['aria-label']"
            :delay-duration="100"
            arrow
            :content="{ side: 'top', sideOffset: 8 }"
          >
            <UButton
              size="md"
              color="neutral"
              variant="ghost"
              :icon="link.image ? undefined : link.icon"
              :to="link.to"
              :target="link.target"
              :aria-label="link['aria-label']"
            >
              <template v-if="link.image" #leading>
                <img
                  :src="link.image"
                  :alt="link['aria-label']"
                  class="size-5 object-contain dark:invert"
                />
              </template>
            </UButton>
          </UTooltip>
        </Motion>
      </div>
    </template>

    <div
      class="relative w-full h-[400px] bg-muted overflow-hidden"
      style="background-color: transparent"
    >
      <UMarquee
        reverse
        orientation="vertical"
        :overlay="false"
        :ui="{
          root: '[--duration:40s] absolute w-[460px] -left-[100px] -top-[300px] h-[940px] transform-3d rotate-x-65 rotate-y-0 rotate-z-30'
        }"
      >
        <img
          v-for="i in 4"
          :key="i"
          :src="`/blocks/image${i}.png`"
          width="460"
          height="258"
          :alt="`Nuxt UI Screenshot ${i}`"
          loading="lazy"
          class="aspect-video border border-default rounded-lg bg-white"
        />
      </UMarquee>
      <UMarquee
        orientation="vertical"
        :overlay="false"
        :ui="{
          root: '[--duration:40s] absolute w-[460px] -top-[400px] left-[480px] h-[1160px] transform-3d rotate-x-65 rotate-y-0 rotate-z-30'
        }"
      >
        <img
          v-for="i in [5, 6, 7, 8]"
          :key="i"
          :src="`/blocks/image${i}.png`"
          width="460"
          height="258"
          :alt="`Nuxt UI Screenshot ${i}`"
          loading="lazy"
          class="aspect-video border border-default rounded-lg bg-white"
        />
      </UMarquee>
      <UMarquee
        reverse
        orientation="vertical"
        :overlay="false"
        :ui="{
          root: 'hidden md:flex [--duration:40s] absolute w-[460px] -top-[300px] left-[1020px] h-[1060px] transform-3d rotate-x-65 rotate-y-0 rotate-z-30'
        }"
      >
        <img
          v-for="i in [9, 10, 11, 12]"
          :key="i"
          :src="`/blocks/image${i}.png`"
          width="460"
          height="258"
          :alt="`Nuxt UI Screenshot ${i}`"
          loading="lazy"
          class="aspect-video border border-default rounded-lg bg-white"
        />
      </UMarquee>
    </div>
    <!-- <UMarquee pause-on-hover class="py-2 -mx-8 sm:-mx-12 lg:-mx-16 [--duration:40s]">
      <Motion
        v-for="(img, index) in page.hero.images"
        :key="index"
        :initial="{
          scale: 1.1,
          opacity: 0,
          filter: 'blur(20px)'
        }"
        :animate="{
          scale: 1,
          opacity: 1,
          filter: 'blur(0px)'
        }"
        :transition="{
          duration: 0.6,
          delay: index * 0.1
        }"
      >
        <NuxtImg
          width="234"
          height="234"
          class="rounded-lg aspect-square object-cover"
          :class="index % 2 === 0 ? '-rotate-2' : 'rotate-2'"
          v-bind="img"
        />
      </Motion>
    </UMarquee> -->
  </UPageHero>
</template>
