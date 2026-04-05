<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    default: '',
  },
})

const statusMap = {
  active: {
    label: 'Active',
    className: 'badge--active',
  },
  pendingTransfer: {
    label: 'Pending Transfer',
    className: 'badge--pending',
  },
  clientHold: {
    label: 'Client Hold',
    className: 'badge--hold',
  },
}

const badgeData = computed(() => {
  return (
    statusMap[props.status] || {
      label: 'Unknown',
      className: 'badge--unknown',
    }
  )
})
</script>

<template>
  <span class="badge" :class="badgeData.className">
    {{ badgeData.label }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}

.badge--active {
  background-color: #dcfce7;
  color: #166534;
}

.badge--pending {
  background-color: #fef3c7;
  color: #92400e;
}

.badge--hold {
  background-color: #fee2e2;
  color: #991b1b;
}

.badge--unknown {
  background-color: #e5e7eb;
  color: #374151;
}
</style>
