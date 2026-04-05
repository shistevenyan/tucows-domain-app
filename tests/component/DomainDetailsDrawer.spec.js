import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DomainDetailsDrawer from '../../src/components/DomainDetailsDrawer.vue'
import { sampleDomains } from '../data/domains'

describe('DomainDetailsDrawer', () => {
  test('does not render when domain is null', () => {
    // mount the component with domain prop set to null
    const wrapper = mount(DomainDetailsDrawer, {
      props: {
        domain: null,
      },
    })

    // the drawer should not be rendered
    expect(wrapper.find('aside').exists()).toBe(false)
  })

  // mount the drawer with the first sample domain
  test('renders domain details when a domain is provided', () => {
    const wrapper = mount(DomainDetailsDrawer, {
      props: {
        domain: sampleDomains[0],
      },
    })

    // check that the drawer is rendered and contains the domain details
    expect(wrapper.text()).toContain('test1.com')
    expect(wrapper.text()).toContain('Registrar A')
    expect(wrapper.text()).toContain('ns1.test1.com')
    expect(wrapper.text()).toContain('ns2.test1.com')
  })

  // mount the drawer with a sample domain that has missing values
  test('shows fallback text for missing registrar and nameservers', () => {
    const wrapper = mount(DomainDetailsDrawer, {
      props: {
        domain: sampleDomains[3],
      },
    })

    // expects the drawer to show the fallbacks
    expect(wrapper.text()).toContain('No Data')
    expect(wrapper.text()).toContain('None')
  })

  // mount the drawer with the first sample domain
  test('emits close when close button is clicked', async () => {
    const wrapper = mount(DomainDetailsDrawer, {
      props: {
        domain: sampleDomains[0],
      },
    })

    // click the close button
    const closeButton = wrapper.find('button')
    await closeButton.trigger('click')

    // emitted array should have a close event
    expect(wrapper.emitted()).toHaveProperty('close')
    // the close event should have been emitted only once
    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
