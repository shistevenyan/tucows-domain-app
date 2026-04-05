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

  // mount the filter bar with some filter values
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

    // check that the input and selects have the correct values
    const input = wrapper.find('input')
    const selects = wrapper.findAll('select')

    expect(input.element.value).toBe('test1')
    expect(selects[0].element.value).toBe('Registrar 1')
    expect(selects[1].element.value).toBe('active')
  })

  // mount the filter bar with the base props
  test('does not emit domain update on plain typing', async () => {
    const wrapper = mount(FilterBar, {
      props: baseProps,
    })

    // type in the domain input
    const input = wrapper.find('input')
    await input.setValue('test2')

    // emitted array should not have an update-filters event
    expect(wrapper.emitted('update-filters')).toBeUndefined()
  })

  // mount the filter bar with the base props
  test('emits domain update when Enter is pressed', async () => {
    const wrapper = mount(FilterBar, {
      props: baseProps,
    })

    // type in the domain input and press Enter
    const input = wrapper.find('input')
    await input.setValue('test2')
    await input.trigger('keyup', { key: 'Enter' })

    // emitted array should have an update-filters event
    expect(wrapper.emitted('update-filters')).toEqual([[{ domain: 'test2' }]])
  })

  // mount the filter bar with the base props
  test('emits registrar update when registrar changes', async () => {
    const wrapper = mount(FilterBar, {
      props: baseProps,
    })

    // The registrar select is the first select and set it to Registrar 2
    const registrarSelect = wrapper.findAll('select')[0]
    await registrarSelect.setValue('Registrar 2')

    // emitted array should have an update-filters event with the new registrar
    expect(wrapper.emitted('update-filters')).toEqual([[{ registrar: 'Registrar 2' }]])
  })

  // mount the filter bar with the base props
  test('emits status update when status changes', async () => {
    const wrapper = mount(FilterBar, {
      props: baseProps,
    })

    // status select is the second select and set it to clientHold
    const statusSelect = wrapper.findAll('select')[1]
    await statusSelect.setValue('clientHold')

    // emitted array should have an update-filters event with the new status
    expect(wrapper.emitted('update-filters')).toEqual([[{ status: 'clientHold' }]])
  })
})
