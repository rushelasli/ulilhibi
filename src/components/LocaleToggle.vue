<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { Locale } from '@/i18n'

const { t, locale } = useI18n()

function setLocale(l: Locale) {
  locale.value = l
  localStorage.setItem('locale', l)
}

// Single flag toggle: shows the current locale's flag (circle-flags, MIT)
const flagSrc = computed(() => (locale.value === 'id' ? '/flags/id.svg' : '/flags/gb.svg'))

function toggleLocale() {
  setLocale(locale.value === 'id' ? 'en' : 'id')
}
</script>

<template>
  <button
    class="cursor-pointer rounded px-2 py-1.5 transition-colors hover:bg-foreground/5"
    :aria-label="t('nav.languageToggle')"
    :title="t('nav.languageToggle')"
    @click="toggleLocale"
  >
    <img :src="flagSrc" alt="" class="h-5 w-5" aria-hidden="true" />
  </button>
</template>
