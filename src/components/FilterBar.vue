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

const emit = defineEmits(['update-filters', 'clear-filters'])

const safeFilters = computed(() => ({
  domain: props.filters?.domain ?? '',
  registrar: props.filters?.registrar ?? '',
  status: props.filters?.status ?? '',
}))

function updateField(field, value) {
  emit('update-filters', { [field]: value })
}
</script>

<template>
  <section class="filters">
    <input
      class="filters__input"
      type="text"
      placeholder="Search domain"
      :value="safeFilters.domain"
      @input="updateField('domain', $event.target.value)"
    />

    <select
      class="filters__select"
      :value="safeFilters.registrar"
      @change="updateField('registrar', $event.target.value)"
    >
      <option value="">All Registrars</option>
      <option v-for="registrar in registrars" :key="registrar" :value="registrar">
        {{ registrar }}
      </option>
    </select>

    <select
      class="filters__select"
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
