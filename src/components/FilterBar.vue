<script setup>
import { computed } from 'vue'

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({
      domain: '',
      registrar: '',
      status: '',
    }),
  },
  registrars: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update-filters'])

const safeFilters = computed(() => ({
  domain: props.filters?.domain ?? '',
  registrar: props.filters?.registrar ?? '',
  status: props.filters?.status ?? '',
}))

// emits to parent the update-filter event with the changed filter key value
function updateField(field, value) {
  emit('update-filters', { [field]: value })
}
</script>

<template>
  <section class="filter-bar">
    <input
      class="filter-bar__control"
      type="text"
      placeholder="Search Domain On Enter"
      :value="safeFilters.domain"
      @keyup.enter="updateField('domain', $event.target.value)"
    />

    <select
      class="filter-bar__control"
      :value="safeFilters.registrar"
      @change="updateField('registrar', $event.target.value)"
    >
      <option value="">All Registrars</option>
      <option v-for="registrar in registrars" :key="registrar" :value="registrar">
        {{ registrar }}
      </option>
    </select>

    <select
      class="filter-bar__control"
      :value="safeFilters.status"
      @change="updateField('status', $event.target.value)"
    >
      <option value="">All Statuses</option>
      <option value="active">Active</option>
      <option value="clientHold">Client Hold</option>
      <option value="pendingTransfer">Pending Transfer</option>
    </select>
  </section>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 0.75em;
  padding: 1em;
  border: 1px solid #dcdfe4;
  border-radius: 12px;
  background: #ffffff;
  margin-bottom: 1rem;
}

.filter-bar__control {
  width: 100%;
  min-height: 2.75em;
  padding: 0.75em 0.875em;
  border: 1px solid #cfd6df;
  border-radius: 12px;
  color: #1f2937;
  background-color: #ffffff;
  box-sizing: border-box;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.filter-bar__control:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.filter-bar__control::placeholder {
  color: #9aa4b2;
}

/* horizontal layout on larger screens, vertical on smaller */
@media (min-width: 768px) {
  .filter-bar {
    flex-direction: row;
    align-items: center;
  }

  .filter-bar__control {
    flex: 1;
  }
}
</style>
