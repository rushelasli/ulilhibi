<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import ContactSection from '@/components/ContactSection.vue'

const route = useRoute()

onMounted(() => {
  if (route.hash) {
    const el = document.getElementById(route.hash.slice(1))
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
})
</script>

<template>
  <main>
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <SkillsSection />
    <ExperienceSection />
    <ContactSection />
  </main>
</template>