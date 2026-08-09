<script setup lang="ts">
const { footer } = useAppConfig()
const { t } = useI18n()
const { openSmartContactLink } = useSmartContactLink()
</script>

<template>
  <UFooter class="z-10 bg-default" :ui="{ left: 'text-muted text-xs' }" style="margin-bottom: 4rem">
    <template #left>
      {{ t(footer.creditsKey, { year: new Date().getFullYear() }) }}
    </template>

    <template #right>
      <template v-if="footer?.links">
        <UTooltip
          v-for="(link, index) of footer?.links"
          :key="index"
          :text="link.tooltipKey ? t(link.tooltipKey) : link['aria-label']"
          :delay-duration="100"
          arrow
          :content="{ side: 'top', sideOffset: 8 }"
        >
          <UButton
            size="xs"
            color="neutral"
            variant="ghost"
            :icon="link.image ? undefined : link.icon"
            :to="link.to"
            :target="link.target"
            :aria-label="link['aria-label']"
            @click="openSmartContactLink($event, link)"
          >
            <template v-if="link.image" #leading>
              <img
                :src="link.image"
                :alt="link['aria-label']"
                class="size-4 object-contain dark:invert"
              >
            </template>
          </UButton>
        </UTooltip>
      </template>
    </template>
  </UFooter>
</template>
