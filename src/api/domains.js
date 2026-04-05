// fake domain records data
const domainRecords = [
  {
    domain: 'example.com',
    registrar: 'Registrar 1 Inc.',
    status: 'active',
    created_at: '2020-01-01T00:00:00Z',
    expires_at: '2026-12-12T00:00:00Z',
    nameservers: ['ns1.example.com', 'ns2.example.com'],
    updated_at: '2026-04-03T15:46:00Z',
  },
  {
    domain: 'fakedomain.com',
    registrar: 'Registrar 2 Inc.',
    status: 'clientHold',
    created_at: '2020-09-01T00:00:00Z',
    expires_at: '2025-09-01T00:00:00Z',
    nameservers: ['ns1.fakedomain.com', 'ns2.fakedomain.com'],
    updated_at: '2026-03-18T09:15:00Z',
  },
  {
    domain: 'anotherfakeone.org',
    registrar: 'Registrar 3 Inc.',
    status: 'pendingTransfer',
    created_at: '2022-05-11T00:00:00Z',
    expires_at: '2027-05-11T00:00:00Z',
    nameservers: ['ns1.anotherfakeone.org'],
    updated_at: '2026-03-28T18:05:00Z',
  },
  {
    domain: '',
    registrar: '',
    status: '',
    created_at: 'not a date',
    expires_at: '',
    nameservers: [],
    updated_at: '',
  },
]

// simulate fake loading
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

// pass in {shouldFail: true} to simulate fake failure error
export async function getDomains({ shouldFail = false } = {}) {
  // fake loading delay
  await wait(600)

  // simulate fake failure error
  if (shouldFail) {
    throw new Error('Failed to fetch domain records')
  }

  return domainRecords
}
