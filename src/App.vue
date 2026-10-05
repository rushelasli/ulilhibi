<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Navbar from '@/components/Navbar.vue'
import FooterSection from '@/components/FooterSection.vue'

const { t, locale } = useI18n()

function syncDocumentMeta() {
  document.documentElement.lang = locale.value
  document.title = t('meta.home')
}

onMounted(syncDocumentMeta)
watch(locale, syncDocumentMeta)
</script>

<template>
  <div class="min-h-screen bg-background font-sans text-foreground/95 antialiased">
    <Navbar />
    <RouterView />
    <FooterSection />
  </div>
</template>
