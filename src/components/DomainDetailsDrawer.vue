<script setup>
import StatusBadge from './StatusBadge.vue'
import formatDate from '../utils/formatDate'

const props = defineProps({
  domain: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['close'])

function closeDrawer() {
  emit('close')
}
</script>

<template>
  <div v-if="props.domain" class="drawer-backdrop" @click.self="closeDrawer">
    <aside class="drawer">
      <div class="drawer__header">
        <h2 class="drawer__title">{{ props.domain.domain || 'No Data' }}</h2>
        <button type="button" class="drawer__close" @click="closeDrawer">Close</button>
      </div>

      <div class="detail-list">
        <div class="detail-row">
          <strong>Registrar</strong>
          <span>{{ props.domain.registrar || 'No Data' }}</span>
        </div>

        <div class="detail-row">
          <strong>Status</strong>
          <span><StatusBadge :status="props.domain.status" /></span>
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

        <div class="detail-row detail-row--stacked">
          <strong>Nameservers</strong>

          <ul
            v-if="Array.isArray(props.domain.nameservers) && props.domain.nameservers.length > 0"
            class="nameserver-list"
          >
            <li v-for="nameserver in props.domain.nameservers" :key="nameserver">
              {{ nameserver }}
            </li>
          </ul>

          <span v-else>None</span>
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.45);
  display: flex;
  justify-content: flex-end;
  z-index: 1000;
}

.drawer {
  width: min(500px, 100%);
  height: 100vh;
  background: #ffffff;
  padding: 2em;
  overflow-y: auto;
  box-sizing: border-box;
  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.12);
}

.drawer__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 2em;
}

.drawer__title {
  margin: 0;
  font-size: 1.5em;
  line-height: 1.3;
  word-break: break-word;
}

.drawer__close {
  border: 1px solid #d1d5db;
  background: #ffffff;
  padding: 0.5em 0.75em;
  border-radius: 6px;
  cursor: pointer;
}

.drawer__close:hover {
  background: #f9fafb;
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.detail-row {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding-bottom: 1em;
}

.detail-row--stacked {
  align-items: flex-start;
}

.detail-row strong {
  font-size: 1em;
  color: #374151;
}

.detail-row span,
.nameserver-list {
  font-size: 0.95em;
  color: #111827;
}

.nameserver-list {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>
