<script setup>
import StatusBadge from './StatusBadge.vue'
import formatDate from '../utils/formatDate'
defineProps({
  domains: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['select-domain'])

function handleView(domain) {
  emit('select-domain', domain)
}
</script>

<template>
  <div class="domain-table-wrapper">
    <div v-if="domains.length === 0" class="empty-state">No Domains Found</div>

    <div v-else class="table-scroll">
      <table class="domain-table">
        <thead>
          <tr>
            <th>Domain</th>
            <th>Registrar</th>
            <th>Status</th>
            <th>Created Date</th>
            <th>Expiry Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="domainItem in domains" :key="domainItem.domain">
            <td>{{ domainItem.domain || 'No Data' }}</td>
            <td>{{ domainItem.registrar || 'No Data' }}</td>
            <td><StatusBadge :status="domainItem.status" /></td>
            <td>{{ formatDate(domainItem.created_at) }}</td>
            <td>{{ formatDate(domainItem.expires_at) }}</td>
            <td>
              <button type="button" class="view-button" @click="handleView(domainItem)">
                View
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.domain-table-wrapper {
  width: 100%;
}

.empty-state {
  padding: 1.5em;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  background: #fafafa;
  text-align: center;
  font-size: 1em;
}

.table-scroll {
  width: 100%;
  overflow-x: auto;
}

.domain-table {
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  background: #ffffff;
}

.domain-table th,
.domain-table td {
  padding: 1em;
  text-align: left;
  border-bottom: 1px solid #e5e5e5;
  white-space: nowrap;
}

.domain-table th {
  font-weight: 600;
  background: #f8f8f8;
}

.domain-table tbody tr:last-child td {
  border-bottom: none;
}

.view-button {
  padding: 0.5em 0.75em;
  border: 1px solid #d0d0d0;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
  font-size: 1em;
}

.view-button:hover {
  background: #f3f3f3;
}
</style>
