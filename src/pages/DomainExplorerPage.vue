<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FilterBar from '../components/FilterBar.vue'
import DomainTable from '../components/DomainTable.vue'
import DomainDetailsDrawer from '../components/DomainDetailsDrawer.vue'
import { getDomains } from '../api/domains'
import filterDomains from '../utils/filterDomains'

const route = useRoute()
const router = useRouter()

// useStates to keep track of domains, loading, error, and selected domain for drawer
const domains = ref([])
const loading = ref(false)
const error = ref('')
const selectedDomain = ref(null)

// derive filters from route query parameters, with defaults
// recompute filters whenever route query changes to keep in sync with URL
const filters = computed(() => ({
  domain: route.query.domain ?? '',
  registrar: route.query.registrar ?? '',
  status: route.query.status ?? '',
}))

// array of unique registrars for filter dropdown
const registrars = computed(() => [
  ...new Set(domains.value.map((item) => item.registrar).filter(Boolean)),
])

// filter domains based on current filters values
// recomputes whenever domains or filters change
const filteredDomains = computed(() => {
  return filterDomains(domains.value, filters.value)
})

// builds a object with filters that has values
function buildQuery(nextFilters) {
  const query = {}

  if (nextFilters.domain.trim()) {
    query.domain = nextFilters.domain.trim()
  }
  if (nextFilters.registrar) {
    query.registrar = nextFilters.registrar
  }
  if (nextFilters.status) {
    query.status = nextFilters.status
  }

  return query
}

// updates the URL params when filters change
function updateFilters(changedFilter) {
  const nextFilters = {
    ...filters.value,
    ...changedFilter,
  }

  // replaces the URL params
  router.replace({
    query: buildQuery(nextFilters),
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
    // toggle here to simulate error
    // shouldFail is false to load domains successfully, true to simulate an error
    domains.value = await getDomains({ shouldFail: false })
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

    <FilterBar :filters="filters" :registrars="registrars" @update-filters="updateFilters" />

    <section v-if="loading" class="state-card">Loading domain records...</section>

    <section v-else-if="error" class="state-card">
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

<style scoped>
.page {
  max-width: 90em;
  margin: auto;
  padding: 1em;
}

.page__header {
  margin-bottom: 1em;
}

.state-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

.state-card {
  padding: 1em;
}

.results-count {
  margin-bottom: 1em;
}
</style>
