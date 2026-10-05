<script setup lang="ts">
import { ArrowDown, Mail } from '@lucide/vue'
import { useI18n } from 'vue-i18n'
import StarfieldCanvas from '@/components/StarfieldCanvas.vue'
import profilImg from '@/assets/profil.jpg'

const { t } = useI18n()

function scrollToProjects() {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="home" class="relative overflow-hidden border-b border-foreground/10">
    <StarfieldCanvas />

    <div
      class="relative z-10 mx-auto flex max-w-5xl flex-col-reverse items-start gap-10 px-5 py-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-24"
    >
      <!-- Text -->
      <div class="max-w-xl">
        <p class="mb-4 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
          {{ t('hero.eyebrow') }}
        </p>
        <h1
          class="mb-5 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl"
        >
          {{ t('hero.title') }}
        </h1>
        <p class="mb-8 max-w-lg text-[17px] leading-relaxed text-muted-foreground">
          {{ t('hero.body') }}
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <button
            class="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-[#5a4bd1]"
            @click="scrollToProjects"
          >
            <ArrowDown class="h-4 w-4" />
            {{ t('hero.ctaPrimary') }}
          </button>
          <button
            class="inline-flex h-11 items-center gap-2 rounded-lg border border-foreground/15 px-5 text-sm font-medium text-foreground/90 transition-colors hover:border-foreground/30 hover:text-foreground"
            @click="scrollToContact"
          >
            <Mail class="h-4 w-4" />
            {{ t('hero.ctaSecondary') }}
          </button>
        </div>
      </div>

      <!-- Photo — circular avatar with gradient ring, from the original site's profile -->
      <div class="shrink-0">
        <div
          class="rounded-full bg-linear-to-br from-[#6c5ce7] to-[#a29bfe] p-2.5 shadow-[0_0_40px_rgba(108,92,231,0.4)] md:p-3"
        >
          <img
            :src="profilImg"
            alt="Ulil Albab"
            class="h-44 w-44 rounded-full object-cover md:h-72 md:w-72"
            loading="eager"
          />
        </div>
      </div>
    </div>
  </section>
</template>