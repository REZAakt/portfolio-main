<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

const { footer, global } = useAppConfig()
const { t } = useI18n()

defineProps<{
  page: IndexCollectionItem
}>()
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
      class="hero-showcase-mask pointer-events-none relative z-0 -mt-20 sm:-mt-28 md:-mt-32 w-full h-[500px] md:h-[560px] overflow-hidden"
    >
      <!-- ستون 1 -->
      <UMarquee
        reverse
        orientation="vertical"
        :overlay="false"
        :ui="{
          root: '[--duration:42s] absolute w-[220px] -left-[190px] -top-[260px] h-[1050px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30'
        }"
      >
        <img
          v-for="i in [1, 2, 3, 4]"
          :key="i"
          :src="`/blocks/image${i}.png`"
          width="220"
          height="124"
          :alt="`Project screenshot ${i}`"
          loading="lazy"
          class="aspect-video border border-default rounded-lg bg-white"
        />
      </UMarquee>

      <!-- ستون 2 -->
      <UMarquee
        orientation="vertical"
        :overlay="false"
        :ui="{
          root: '[--duration:42s] absolute w-[220px] left-[120px] -top-[330px] h-[1180px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30'
        }"
      >
        <img
          v-for="i in [5, 6, 7, 8]"
          :key="i"
          :src="`/blocks/image${i}.png`"
          width="220"
          height="124"
          :alt="`Project screenshot ${i}`"
          loading="lazy"
          class="aspect-video border border-default rounded-lg bg-white"
        />
      </UMarquee>

      <!-- ستون 3 -->
      <UMarquee
        reverse
        orientation="vertical"
        :overlay="false"
        :ui="{
          root: '[--duration:42s] absolute w-[220px] left-[410px] -top-[270px] h-[1080px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30'
        }"
      >
        <img
          v-for="i in [9, 10, 11, 12]"
          :key="i"
          :src="`/blocks/image${i}.png`"
          width="220"
          height="124"
          :alt="`Project screenshot ${i}`"
          loading="lazy"
          class="aspect-video border border-default rounded-lg bg-white"
        />
      </UMarquee>

      <!-- ستون 4 -->
      <UMarquee
        orientation="vertical"
        :overlay="false"
        :ui="{
          root: '[--duration:42s] absolute w-[220px] left-[740px] -top-[340px] h-[1180px] transform-3d rotate-x-55 rotate-y-0 rotate-z-30'
        }"
      >
        <img
          v-for="i in [1, 5, 9, 12]"
          :key="i"
          :src="`/blocks/image${i}.png`"
          width="220"
          height="124"
          :alt="`Project screenshot ${i}`"
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

<style scoped>
.hero-showcase-mask {
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgb(0 0 0 / 8%) 8%,
    rgb(0 0 0 / 35%) 18%,
    rgb(0 0 0 / 75%) 30%,
    #000 42%,
    #000 62%,
    rgb(0 0 0 / 75%) 74%,
    rgb(0 0 0 / 35%) 86%,
    rgb(0 0 0 / 8%) 95%,
    transparent 100%
  );

  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    rgb(0 0 0 / 8%) 8%,
    rgb(0 0 0 / 35%) 18%,
    rgb(0 0 0 / 75%) 30%,
    #000 42%,
    #000 62%,
    rgb(0 0 0 / 75%) 74%,
    rgb(0 0 0 / 35%) 86%,
    rgb(0 0 0 / 8%) 95%,
    transparent 100%
  );
}
</style>
