import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusBadge from '../../src/components/StatusBadge.vue'

describe('StatusBadge', () => {
  test('renders Active', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'active' },
    })

    expect(wrapper.text()).toContain('Active')
  })

  test('renders Pending Transfer', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'pendingTransfer' },
    })

    expect(wrapper.text()).toContain('Pending Transfer')
  })

  test('renders Client Hold', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'clientHold' },
    })

    expect(wrapper.text()).toContain('Client Hold')
  })

  test('renders Unknown', () => {
    const wrapper = mount(StatusBadge, {
      props: { status: 'not a real status' },
    })

    expect(wrapper.text()).toContain('Unknown')
  })
})
