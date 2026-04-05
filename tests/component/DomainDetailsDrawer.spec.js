import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DomainDetailsDrawer from '../../src/components/DomainDetailsDrawer.vue'
import { sampleDomains } from '../data/domains'

describe('DomainDetailsDrawer', () => {
  test('does not render when domain is null', () => {
    const wrapper = mount(DomainDetailsDrawer, {
      props: {
        domain: null,
      },
    })

    expect(wrapper.find('aside').exists()).toBe(false)
  })

  test('renders domain details when a domain is provided', () => {
    const wrapper = mount(DomainDetailsDrawer, {
      props: {
        domain: sampleDomains[0],
      },
    })

    expect(wrapper.text()).toContain('test1.com')
    expect(wrapper.text()).toContain('Registrar A')
    expect(wrapper.text()).toContain('ns1.test1.com')
    expect(wrapper.text()).toContain('ns2.test1.com')
  })

  test('shows fallback text for missing registrar and nameservers', () => {
    const wrapper = mount(DomainDetailsDrawer, {
      props: {
        domain: sampleDomains[3],
      },
    })

    expect(wrapper.text()).toContain('No Data')
    expect(wrapper.text()).toContain('None')
  })

  test('emits close when close button is clicked', async () => {
    const wrapper = mount(DomainDetailsDrawer, {
      props: {
        domain: sampleDomains[0],
      },
    })

    await wrapper.find('button').trigger('click')

    // emitted array should have a close event
    expect(wrapper.emitted()).toHaveProperty('close')
    // the close event should have been emitted only once
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
