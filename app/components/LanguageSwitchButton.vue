<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

// برای راحتی: لوکال‌ها را تایپ کنیم
type LocaleObject = {
  code: string
  name?: string
  dir?: 'rtl' | 'ltr'
}

const currentLocale = computed(() => locale.value)

const availableLocales = computed<LocaleObject[]>(() => {
  return (locales.value as LocaleObject[]) || []
})

// چون فقط fa / en داریم، یک toggle ساده می‌سازیم
const nextLocale = computed<string>(() => {
  if (currentLocale.value === 'fa') return 'en'
  return 'fa'
})

// برای نمایش کوتاه روی دکمه (FA / EN)
const currentLocaleLabel = computed(() => currentLocale.value.toUpperCase())
const nextLocaleLabel = computed(() => nextLocale.value.toUpperCase())

// Optional: آپدیت dir روی <html> اگر لازم بود
const updateDocumentDir = (code: string) => {
  if (import.meta.server) return

  // eslint-disable-next-line @stylistic/arrow-parens
  const localeMeta = availableLocales.value.find((l) => l.code === code)

  document.documentElement.setAttribute('dir', localeMeta?.dir || (code === 'fa' ? 'rtl' : 'ltr'))

  document.documentElement.setAttribute('lang', code)
}

watch(
  locale,
  (newLocale) => {
    updateDocumentDir(newLocale)
  },
  { immediate: true }
)
const switchLocale = async () => {
  const target = nextLocale.value as 'fa' | 'en'

  await setLocale(target)
}

const startViewTransition = (event: MouseEvent) => {
  // برای هماهنگی با ColorModeButton، همین pattern را حفظ می‌کنیم
  if (!document.startViewTransition) {
    switchLocale()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const transition = (document as any).startViewTransition(async () => {
    await switchLocale()
  })

  transition.ready.then(() => {
    const duration = 600
    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
      },
      {
        duration,
        easing: 'cubic-bezier(.76,.32,.29,.99)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}
</script>

<template>
  <ClientOnly>
    <UButton
      style="font-size: medium; padding: 10px 10px 6px 10px"
      :aria-label="`Switch language to ${nextLocaleLabel}`"
      color="neutral"
      variant="ghost"
      size="md"
      class="rounded-full font-semibold text-xs tracking-wide uppercase"
      @click="startViewTransition"
    >
      {{ currentLocaleLabel }}
    </UButton>

    <template #fallback>
      <div class="size-6" />
    </template>
  </ClientOnly>
</template>
