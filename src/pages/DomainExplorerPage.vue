<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FilterBar from '../components/FilterBar.vue'
import DomainTable from '../components/DomainTable.vue'
import DomainDetailsDrawer from '../components/DomainDetailsDrawer.vue'
import { getDomains } from '../api/domainApi'
import { filterDomains } from '../utils/filterDomains'

const route = useRoute()
const router = useRouter()

const domains = ref([])
const loading = ref(false)
const error = ref('')
const selectedDomain = ref(null)

function readQueryValue(value) {
  if (Array.isArray(value)) return value[0] ?? ''
  return value ?? ''
}

const filters = computed(() => ({
  domain: readQueryValue(route.query.domain),
  registrar: readQueryValue(route.query.registrar),
  status: readQueryValue(route.query.status),
}))

const registrars = computed(() => {
  const uniqueRegistrars = new Set(domains.value.map((item) => item.registrar).filter(Boolean))

  return Array.from(uniqueRegistrars).sort()
})

const filteredDomains = computed(() => {
  return filterDomains(domains.value, filters.value)
})

function buildQuery(nextFilters) {
  const query = {}

  if (nextFilters.domain.trim()) query.domain = nextFilters.domain.trim()
  if (nextFilters.registrar) query.registrar = nextFilters.registrar
  if (nextFilters.status) query.status = nextFilters.status

  return query
}

function updateFilters(patch) {
  const nextFilters = {
    ...filters.value,
    ...patch,
  }

  router.replace({
    query: buildQuery(nextFilters),
  })
}

function clearFilters() {
  router.replace({
    query: {},
  })
}

function openDetails(domain) {
  selectedDomain.value = domain
}

function closeDetails() {
  selectedDomain.value = null
}

async function loadDomains() {
  loading.value = true
  error.value = ''

  try {
    domains.value = await getDomains()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load domain records'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDomains()
})
</script>

<template>
  <main class="page">
    <header class="page__header">
      <h1>Domain Records Explorer</h1>
    </header>

    <FilterBar
      :filters="filters"
      :registrars="registrars"
      @update-filters="updateFilters"
      @clear-filters="clearFilters"
    />

    <section v-if="loading" class="state-card">Loading domain records...</section>

    <section v-else-if="error" class="state-card state-card--error">
      <p>{{ error }}</p>
    </section>

    <section v-else>
      <p class="results-count">
        {{ filteredDomains.length }} result{{ filteredDomains.length === 1 ? '' : 's' }}
      </p>

      <DomainTable :domains="filteredDomains" @select-domain="openDetails" />
    </section>

    <DomainDetailsDrawer :domain="selectedDomain" @close="closeDetails" />
  </main>
</template>
