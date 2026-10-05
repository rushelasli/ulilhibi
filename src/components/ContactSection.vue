<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const socials = [
  {
    href: 'https://www.facebook.com/share/1AiX1D61gs/',
    label: 'Facebook',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/facebook.svg',
  },
  {
    href: 'https://www.instagram.com/ulil_albab.05?igsh=cXF1dzlmd2dseHNm',
    label: 'Instagram',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg',
  },
  {
    href: 'https://x.com/UlilAlbab13012',
    label: 'X (Twitter)',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/x.svg',
  },
  {
    href: 'https://www.youtube.com/@KopiKapalApimix',
    label: 'YouTube',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/youtube.svg',
  },
  {
    href: 'mailto:ulil@example.com',
    label: 'Email',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/maildotru.svg',
  },
  {
    href: 'https://github.com/MUlilA',
    label: 'GitHub',
    icon: 'https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/github.svg',
  },
]
</script>

<template>
  <section id="contact">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
        {{ t('contact.eyebrow') }}
      </p>
      <h2 class="mb-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {{ t('contact.title') }}
      </h2>
      <p class="mb-10 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
        {{ t('contact.intro') }}
      </p>

      <div class="flex flex-wrap items-center gap-3">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.href"
          target="_blank"
          rel="noopener noreferrer"
          :title="s.label"
          :aria-label="s.label"
          class="flex h-11 w-11 items-center justify-center rounded-lg border border-foreground/10 p-2.5 transition-colors hover:border-foreground/30 hover:bg-foreground/5"
        >
          <img
            :src="s.icon"
            :alt="s.label"
            class="h-5 w-5 dark:brightness-0 dark:invert"
            loading="lazy"
          />
        </a>
      </div>
    </div>
  </section>
</template>
