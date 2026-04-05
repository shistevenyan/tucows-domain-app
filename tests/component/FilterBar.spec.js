import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FilterBar from '../../src/components/FilterBar.vue'

describe('FilterBar', () => {
  const baseProps = {
    filters: {
      domain: '',
      registrar: '',
      status: '',
    },
    registrars: ['Registrar 1', 'Registrar 2', 'Registrar 3'],
  }

  test('renders current filter values from props', () => {
    const wrapper = mount(FilterBar, {
      props: {
        filters: {
          domain: 'test1',
          registrar: 'Registrar 1',
          status: 'active',
        },
        registrars: ['Registrar 1', 'Registrar 2', 'Registrar 3'],
      },
    })

    const input = wrapper.find('input')
    const selects = wrapper.findAll('select')

    expect(input.element.value).toBe('test1')
    expect(selects[0].element.value).toBe('Registrar 1')
    expect(selects[1].element.value).toBe('active')
  })

  test('does not emit domain update on plain typing', async () => {
    const wrapper = mount(FilterBar, {
      props: baseProps,
    })

    const input = wrapper.find('input')

    await input.setValue('test2')

    expect(wrapper.emitted('update-filters')).toBeUndefined()
  })

  test('emits domain update when Enter is pressed', async () => {
    const wrapper = mount(FilterBar, {
      props: baseProps,
    })

    const input = wrapper.find('input')

    await input.setValue('test2')
    await input.trigger('keyup', { key: 'Enter' })

    expect(wrapper.emitted('update-filters')).toEqual([[{ domain: 'test2' }]])
  })

  test('emits registrar update when registrar changes', async () => {
    const wrapper = mount(FilterBar, {
      props: baseProps,
    })

    // The registrar select is the first select
    const registrarSelect = wrapper.findAll('select')[0]

    await registrarSelect.setValue('Registrar 2')

    expect(wrapper.emitted('update-filters')).toEqual([[{ registrar: 'Registrar 2' }]])
  })

  test('emits status update when status changes', async () => {
    const wrapper = mount(FilterBar, {
      props: baseProps,
    })

    // status select is the second one
    const statusSelect = wrapper.findAll('select')[1]

    await statusSelect.setValue('clientHold')

    expect(wrapper.emitted('update-filters')).toEqual([[{ status: 'clientHold' }]])
  })
})
