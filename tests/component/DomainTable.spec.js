import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DomainTable from '../../src/components/DomainTable.vue'
import { sampleDomains } from '../data/domains'

describe('DomainTable', () => {
  // mount the table with an empty array of domains
  test('shows empty state when there are no domains', () => {
    const wrapper = mount(DomainTable, {
      props: {
        domains: [],
      },
    })

    // check that the empty state message is shown
    expect(wrapper.text()).toMatch(/no domains found/i)
  })

  // mount the table with the sample domains
  test('renders one row per domain', () => {
    const wrapper = mount(DomainTable, {
      props: {
        domains: sampleDomains,
      },
    })

    // check that the table rows equals to the number of sample domains
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(sampleDomains.length)
  })

  // mount the table with the sample domains
  test('emits select-domain with the clicked domain', async () => {
    const wrapper = mount(DomainTable, {
      props: {
        domains: sampleDomains,
      },
    })

    // click the view button of the first domain
    const viewButton = wrapper.find('button')
    await viewButton.trigger('click')

    // emitted array should have a select-domain event with the first sample domain
    expect(wrapper.emitted('select-domain')).toEqual([[sampleDomains[0]]])
  })
})
