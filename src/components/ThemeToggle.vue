<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import { Moon, Sun } from '@lucide/vue'

const { t } = useI18n()

// Default dark; choice persisted to localStorage('theme') — index.html restores
// it before first paint so there is no flash.
const mode = useColorMode({ storageKey: 'theme', initialValue: 'dark' })
const isDark = computed(() => mode.value === 'dark')

function toggle() {
  mode.value = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <button
    class="cursor-pointer rounded px-2 py-1.5 text-subtle-foreground transition-colors hover:text-foreground/80"
    :aria-label="t('nav.theme')"
    :title="t('nav.theme')"
    @click="toggle"
  >
    <!-- Icon reflects the current theme (shadcn convention: Moon while dark) -->
    <Moon v-if="isDark" class="h-4 w-4" aria-hidden="true" />
    <Sun v-else class="h-4 w-4" aria-hidden="true" />
  </button>
</template>
