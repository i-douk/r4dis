<script setup lang="ts">
usePageStore().pageData.title = 'Followed Podcasts';
import type { ColumnDef } from '@tanstack/vue-table';
import { h } from 'vue';

interface Following {
  name: string
  slug: string
  following : {
    id: string,
    starred: boolean
  } 
}

const columns: ColumnDef<Following>[] = [
  {
    accessorKey: 'following',
    header: () => h('div', { class: 'text-right' }, 'following'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'))
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount)

      return h('div', { class: 'text-right font-medium' }, formatted)
    },
  }
]

</script>

<template>
  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="" />
  </div>
</template>
