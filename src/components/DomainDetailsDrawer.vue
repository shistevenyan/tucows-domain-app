<script setup>
import StatusBadge from './StatusBadge.vue'

import { formatDate } from '../utils/formatDate'

const props = defineProps({
  domain: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <div v-if="props.domain" class="drawer-backdrop" @click.self="emit('close')">
    <aside class="drawer">
      <div class="drawer__header">
        <h2>{{ props.domain.domain }}</h2>
        <button type="button" @click="emit('close')">Close</button>
      </div>

      <div class="detail-list">
        <div class="detail-row">
          <strong>Registrar</strong>
          <span>{{ props.domain.registrar || 'Unavailable' }}</span>
        </div>

        <div class="detail-row">
          <strong>Status</strong>
          <StatusBadge v-if="props.domain.status" :status="props.domain.status" />
          <span v-else>Unavailable</span>
        </div>

        <div class="detail-row">
          <strong>Created</strong>
          <span>{{ formatDate(props.domain.created_at) }}</span>
        </div>

        <div class="detail-row">
          <strong>Expires</strong>
          <span>{{ formatDate(props.domain.expires_at) }}</span>
        </div>

        <div class="detail-row">
          <strong>Updated</strong>
          <span>{{ formatDate(props.domain.updated_at) }}</span>
        </div>

        <div class="detail-row">
          <strong>Nameservers</strong>

          <ul v-if="props.domain.nameservers && props.domain.nameservers.length">
            <li v-for="server in props.domain.nameservers" :key="server">
              {{ server }}
            </li>
          </ul>

          <span v-else>None</span>
        </div>
      </div>
    </aside>
  </div>
</template>
