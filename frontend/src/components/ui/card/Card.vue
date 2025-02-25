<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow dark:border-dotted dark:bg-zinc-800 dark:text-neutral-50',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
