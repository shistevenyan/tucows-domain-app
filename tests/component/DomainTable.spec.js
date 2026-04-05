import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DomainTable from '../../src/components/DomainTable.vue'
import { sampleDomains } from '../data/domains'

describe('DomainTable', () => {
  test('shows empty state when there are no domains', () => {
    const wrapper = mount(DomainTable, {
      props: {
        domains: [],
      },
    })

    expect(wrapper.text()).toMatch(/no domains found/i)
  })

  test('renders one row per domain', () => {
    const wrapper = mount(DomainTable, {
      props: {
        domains: sampleDomains,
      },
    })

    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(sampleDomains.length)
  })

  test('emits select-domain with the clicked domain', async () => {
    const wrapper = mount(DomainTable, {
      props: {
        domains: sampleDomains,
      },
    })

    const viewButton = wrapper.find('button')
    await viewButton.trigger('click')

    expect(wrapper.emitted('select-domain')).toEqual([[sampleDomains[0]]])
  })
})
