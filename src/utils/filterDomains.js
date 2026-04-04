export function filterDomains(domains, filters) {
  return domains.filter((record) => {
    const matchesDomain =
      !filters.domain || record.domain.toLowerCase().includes(filters.domain.toLowerCase())

    const matchesRegistrar = !filters.registrar || record.registrar === filters.registrar

    const matchesStatus = !filters.status || record.status === filters.status

    return matchesDomain && matchesRegistrar && matchesStatus
  })
}
