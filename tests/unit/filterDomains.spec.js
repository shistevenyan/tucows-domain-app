import { describe, test, expect } from 'vitest'
import filterDomains from '../../src/utils/filterDomains'
import { sampleDomains } from '../data/domains'

describe('filterDomains', () => {
  test('returns all domains when filters are empty', () => {
    const result = filterDomains(sampleDomains, {
      domain: '',
      registrar: '',
      status: '',
    })

    expect(result).toEqual(sampleDomains)
  })

  test('filters by domain text', () => {
    const result = filterDomains(sampleDomains, {
      domain: 'test2',
      registrar: '',
      status: '',
    })

    expect(result).toEqual([sampleDomains[1]])
  })

  test('filters by registrar', () => {
    const result = filterDomains(sampleDomains, {
      domain: '',
      registrar: 'Registrar A',
      status: '',
    })

    expect(result).toEqual([sampleDomains[0]])
  })

  test('filters by status', () => {
    const result = filterDomains(sampleDomains, {
      domain: '',
      registrar: '',
      status: 'clientHold',
    })

    expect(result).toEqual([sampleDomains[2]])
  })

  test('combines multiple filters', () => {
    const result = filterDomains(sampleDomains, {
      domain: 'test2',
      registrar: 'Registrar B',
      status: 'pendingTransfer',
    })

    expect(result).toEqual([sampleDomains[1]])
  })

  test('returns an empty array when nothing matches', () => {
    const result = filterDomains(sampleDomains, {
      domain: 'zzz',
      registrar: '',
      status: '',
    })

    expect(result).toEqual([])
  })
})
