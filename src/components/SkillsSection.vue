<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useI18n } from 'vue-i18n'
import { Code, Wrench, Monitor, Globe, Plug, Moon, Smartphone } from '@lucide/vue'

interface SkillMsg {
  id: string
  label: string
  desc: string
}

const { t, tm } = useI18n()

// Icons aren't language-dependent — keyed by skill id from the locale files.
const skillIcons: Record<string, Component> = {
  coding: Code,
  electronics: Wrench,
  pc: Monitor,
  networking: Globe,
  repair: Plug,
  rest: Moon,
  scrolling: Smartphone,
}

const skills = computed(() => tm('skills.items') as unknown as SkillMsg[])
</script>

<template>
  <section id="skills" class="border-b border-foreground/10">
    <div class="mx-auto max-w-5xl px-5 py-16 md:px-8 md:py-24">
      <p class="mb-3 font-mono text-[13px] uppercase tracking-[0.2em] text-primary">
        {{ t('skills.eyebrow') }}
      </p>
      <h2 class="mb-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {{ t('skills.title') }}
      </h2>
      <p class="mb-12 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
        {{ t('skills.intro') }}
      </p>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="skill in skills"
          :key="skill.id"
          class="rounded-xl border border-foreground/10 bg-card p-6 transition-colors hover:border-foreground/20"
        >
          <component :is="skillIcons[skill.id]" class="mb-4 h-6 w-6 text-primary" />
          <h3 class="mb-1.5 text-base font-semibold text-foreground">{{ skill.label }}</h3>
          <p class="text-sm leading-relaxed text-muted-foreground">{{ skill.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>