<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const interests = computed(() => tm('about.interests') as unknown as string[])
const tags = computed(() => tm('about.tags') as unknown as string[])
</script>

<template>
  <section id="about" class="border-b border-foreground/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
        {{ t('about.eyebrow') }}
      </p>
      <h2 class="mb-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {{ t('about.title') }}
      </h2>
      <p
        class="mb-10 max-w-2xl text-[16px] leading-relaxed text-muted-foreground"
        v-html="t('about.intro')"
      />

      <div class="grid gap-5 md:grid-cols-2">
        <div class="rounded-xl border border-foreground/10 bg-card p-6">
          <h3 class="mb-4 text-base font-semibold text-foreground">
            {{ t('about.interestsTitle') }}
          </h3>
          <ul class="flex flex-col gap-2.5">
            <li
              v-for="item in interests"
              :key="item"
              class="flex gap-2.5 text-[15px] leading-relaxed text-foreground/80"
            >
              <span class="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-primary" />
              {{ item }}
            </li>
          </ul>
        </div>

        <div class="rounded-xl border border-foreground/10 bg-card p-6">
          <h3 class="mb-4 text-base font-semibold text-foreground">
            {{ t('about.focusTitle') }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in tags"
              :key="tag"
              class="rounded-full border border-foreground/10 px-3 py-1 font-mono text-xs text-muted-foreground"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>