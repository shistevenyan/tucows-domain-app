<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

const statusMap = {
  active: {
    label: 'Active',
    className: 'status-badge status-badge--green',
  },
  pendingTransfer: {
    label: 'Pending Transfer',
    className: 'status-badge status-badge--yellow',
  },
  clientHold: {
    label: 'Client Hold',
    className: 'status-badge status-badge--red',
  },
}

const normalizedStatus = computed(() => {
  const value = props.status?.trim()

  if (!value) return null

  const lower = value.toLowerCase()

  if (lower === 'active') return 'active'
  if (lower === 'pendingtransfer') return 'pendingTransfer'
  if (lower === 'clienthold') return 'clientHold'

  return null
})

const badgeData = computed(() => {
  return normalizedStatus.value
    ? statusMap[normalizedStatus.value]
    : {
        label: 'Unknown',
        className: 'status-badge',
      }
})
</script>

<template>
  <span :class="badgeData.className">
    {{ badgeData.label }}
  </span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
  line-height: 1;
}

.status-badge--green {
  background-color: #dcfce7;
  color: #166534;
}

.status-badge--yellow {
  background-color: #fef9c3;
  color: #854d0e;
}

.status-badge--red {
  background-color: #fee2e2;
  color: #991b1b;
}
</style>
