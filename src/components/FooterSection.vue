<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-foreground/10">
    <div
      class="mx-auto flex max-w-5xl flex-col items-start justify-between gap-2 px-5 py-8 text-sm text-subtle-foreground sm:flex-row sm:items-center md:px-8"
    >
      <span>© {{ year }} Ulil Albab</span>
      <span class="font-mono text-xs">{{ t('footer.tagline') }}</span>
    </div>
  </footer>
</template>
