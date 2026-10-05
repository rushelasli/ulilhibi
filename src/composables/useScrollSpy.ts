import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollSpy(sectionIds: string[], offset = 100) {
  const activeId = ref<string>(sectionIds[0] ?? '')

  function onScroll() {
    let current = sectionIds[0] ?? ''
    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (!el) continue
      const top = el.offsetTop - offset
      if (window.scrollY >= top) {
        current = id
      }
    }
    activeId.value = current
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
  })

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return { activeId, scrollTo }
}
