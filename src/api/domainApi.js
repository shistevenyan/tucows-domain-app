import { domainRecords } from './domains'

// simulate fake loading
function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export async function getDomains({ shouldFail = false } = {}) {
  await wait(600)

  // simulate fake failure error
  if (shouldFail) {
    throw new Error('Failed to fetch domain records')
  }

  return domainRecords
}
