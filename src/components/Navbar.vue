<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useScrollSpy } from '@/composables/useScrollSpy'
import Button from '@/components/ui/button.vue'
import Sheet from '@/components/ui/sheet.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LocaleToggle from '@/components/LocaleToggle.vue'
import { Menu } from '@lucide/vue'

const sectionIds = ['home', 'about', 'projects', 'skills', 'experience', 'contact']
const route = useRoute()
const router = useRouter()
const scrollSpy = useScrollSpy(sectionIds, 100)
const { t } = useI18n()

const sheetOpen = ref(false)

const navItems = [
  { id: 'home' },
  { id: 'about' },
  { id: 'projects' },
  { id: 'skills' },
  { id: 'experience' },
  { id: 'contact' },
]

function handleNavClick(id: string) {
  if (route.path !== '/') {
    router.push({ path: '/', hash: `#${id}` })
  } else {
    scrollSpy.scrollTo(id)
  }
  sheetOpen.value = false
}

function isActive(id: string) {
  return route.path === '/' && scrollSpy.activeId.value === id
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-foreground/10 bg-background/90 backdrop-blur"
  >
    <nav class="mx-auto flex h-16 max-w-5xl items-center justify-between px-5 md:px-8">
      <button
        class="flex items-center gap-2 font-mono text-lg font-bold tracking-wider text-foreground"
        @click="handleNavClick('home')"
      >
        <img src="/logo.png" alt="" class="h-7 w-7 object-contain" aria-hidden="true" />
        ULIL ALBAB<span class="text-primary">.</span>
      </button>

      <!-- Desktop links -->
      <div class="hidden items-center gap-1 md:flex">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          :class="[
            'rounded-md px-3 py-2 text-sm transition-colors',
            isActive(item.id)
              ? 'text-foreground'
              : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground',
          ]"
          @click.prevent="handleNavClick(item.id)"
        >
          {{ t(`nav.${item.id}`) }}
        </a>

        <div class="ml-2 flex items-center gap-0.5 border-l border-foreground/10 pl-3">
          <ThemeToggle />
          <LocaleToggle />
        </div>
      </div>

      <!-- Mobile hamburger -->
      <Button
        variant="ghost"
        size="icon"
        class="text-foreground/80 hover:bg-foreground/10 hover:text-foreground md:hidden"
        aria-label="Open navigation menu"
        @click="sheetOpen = true"
      >
        <Menu class="h-5 w-5" />
      </Button>
    </nav>
  </header>

  <!-- Mobile sheet -->
  <Sheet
    :open="sheetOpen"
    side="right"
    class="border-foreground/10 bg-card text-foreground"
    @update:open="sheetOpen = $event"
  >
    <template #default="{ close }">
      <div class="flex flex-col gap-6 pt-10">
        <div class="flex items-center gap-2 font-mono text-lg font-bold tracking-wider text-foreground">
          <img src="/logo.png" alt="" class="h-7 w-7 object-contain" aria-hidden="true" />
          ULIL ALBAB<span class="text-primary">.</span>
        </div>
        <nav class="flex flex-col gap-1">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            :class="[
              'rounded-md px-3 py-3 text-[15px] transition-colors',
              isActive(item.id)
                ? 'bg-foreground/10 text-foreground'
                : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground',
            ]"
            @click.prevent="() => { handleNavClick(item.id); close() }"
          >
            {{ t(`nav.${item.id}`) }}
          </a>
        </nav>

        <div class="flex items-center gap-1 border-t border-foreground/10 pt-6">
          <ThemeToggle />
          <span class="ml-auto mr-2 font-mono text-xs uppercase tracking-widest text-subtle-foreground">
            {{ t('nav.language') }}
          </span>
          <LocaleToggle />
        </div>
      </div>
    </template>
  </Sheet>
</template>