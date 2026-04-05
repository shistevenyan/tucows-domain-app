import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusBadge from '../../src/components/StatusBadge.vue'

describe('StatusBadge', () => {
  // mount the badge with an active status
  test('renders Active', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'active' },
    })

    // the badge should contain the text Active
    expect(wrapper.text()).toContain('Active')
  })

  // mount the badge with a pendingTransfer status
  test('renders Pending Transfer', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'pendingTransfer' },
    })

    // the badge should contain the text Pending Transfer
    expect(wrapper.text()).toContain('Pending Transfer')
  })

  // mount the badge with a clientHold status
  test('renders Client Hold', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'clientHold' },
    })

    // the badge should contain the text Client Hold
    expect(wrapper.text()).toContain('Client Hold')
  })

  // mount the badge with an invalid status
  test('renders Unknown', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'not a real status' },
    })

    // the badge should contain the text Unknown
    expect(wrapper.text()).toContain('Unknown')
  })
})
