<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { cn } from '@/lib/utils'
import { X } from '@lucide/vue'

const { t } = useI18n()

interface Props {
  open?: boolean
  side?: 'left' | 'right' | 'top' | 'bottom'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  side: 'left',
})

const emit = defineEmits<{ (e: 'update:open', value: boolean): void }>()

const isOpen = ref(props.open)

watch(() => props.open, (val) => { isOpen.value = val })
watch(isOpen, (val) => emit('update:open', val))

function close() {
  isOpen.value = false
}

const sideClasses: Record<string, string> = {
  left: 'inset-y-0 left-0 h-full w-3/4 max-w-sm border-r',
  right: 'inset-y-0 right-0 h-full w-3/4 max-w-sm border-l',
  top: 'inset-x-0 top-0 border-b',
  bottom: 'inset-x-0 bottom-0 border-t',
}
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        @click="close"
      />
    </Transition>
    <Transition :name="`sheet-${side}`">
      <div
        v-if="isOpen"
        :class="cn('fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out', sideClasses[side], props.class)"
        role="dialog"
        aria-modal="true"
      >
        <button
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          @click="close"
        >
          <X class="h-4 w-4" />
          <span class="sr-only">{{ t('common.close') }}</span>
        </button>
        <slot :close="close" />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sheet-fade-enter-active,
.sheet-fade-leave-active {
  transition: opacity 0.3s ease;
}
.sheet-fade-enter-from,
.sheet-fade-leave-to {
  opacity: 0;
}
.sheet-left-enter-active,
.sheet-left-leave-active,
.sheet-right-enter-active,
.sheet-right-leave-active {
  transition: transform 0.3s ease;
}
.sheet-left-enter-from,
.sheet-left-leave-to {
  transform: translateX(-100%);
}
.sheet-right-enter-from,
.sheet-right-leave-to {
  transform: translateX(100%);
}
.sheet-top-enter-from,
.sheet-top-leave-to {
  transform: translateY(-100%);
}
.sheet-bottom-enter-from,
.sheet-bottom-leave-to {
  transform: translateY(100%);
}
</style>
