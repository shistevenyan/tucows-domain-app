<script setup>
import StatusBadge from './StatusBadge.vue'
import { formatDate } from '../utils/formatDate'

defineProps({
  domains: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['select-domain'])
</script>

<template>
  <div class="table-card">
    <div v-if="domains.length === 0" class="empty-state">No domains match your filters.</div>

    <table v-else class="domain-table">
      <thead>
        <tr>
          <th>Domain</th>
          <th>Registrar</th>
          <th>Status</th>
          <th>Created</th>
          <th>Expires</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="domain in domains" :key="domain.domain">
          <td>{{ domain.domain }}</td>
          <td>{{ domain.registrar }}</td>
          <td>
            <StatusBadge :status="domain.status" />
          </td>
          <td>{{ formatDate(domain.created_at) }}</td>
          <td>{{ formatDate(domain.expires_at) }}</td>
          <td>
            <button type="button" class="table__action" @click="emit('select-domain', domain)">
              View
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
