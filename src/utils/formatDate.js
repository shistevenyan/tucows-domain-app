export function formatDate(value) {
  if (typeof value !== 'string' || value.trim() === '') {
    return 'No Date'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'No Date'
  }

  const parts = new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).formatToParts(date)

  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  return `${map.month}/${map.day}/${map.year} ${map.hour}:${map.minute}${map.dayPeriod.toLowerCase()}`
}
