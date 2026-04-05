import { describe, test, expect } from 'vitest'
import filterDomains from '../../src/utils/filterDomains'
import { sampleDomains } from '../data/domains'

describe('filterDomains', () => {
  // tests for filterDomains function with no filters
  test('returns all domains when filters are empty', () => {
    const result = filterDomains(sampleDomains, {
      domain: '',
      registrar: '',
      status: '',
    })

    // when no filters are applied, it should return all domains
    expect(result).toEqual(sampleDomains)
  })

  // tests for filterDomains function with domain name filter
  test('filters by domain text', () => {
    const result = filterDomains(sampleDomains, {
      domain: 'test2',
      registrar: '',
      status: '',
    })

    // should return only domains that include 'test2' in their name
    expect(result).toEqual([sampleDomains[1]])
  })

  // tests for filterDomains function with registrar filter
  test('filters by registrar', () => {
    const result = filterDomains(sampleDomains, {
      domain: '',
      registrar: 'Registrar A',
      status: '',
    })

    // should return only domains that have 'Registrar A' as their registrar
    expect(result).toEqual([sampleDomains[0]])
  })

  // tests for filterDomains function with status filter
  test('filters by status', () => {
    const result = filterDomains(sampleDomains, {
      domain: '',
      registrar: '',
      status: 'clientHold',
    })

    // should return only domains that have 'clientHold' in their status array
    expect(result).toEqual([sampleDomains[2]])
  })

  // tests for filterDomains function with multiple filters applied
  test('combines multiple filters', () => {
    const result = filterDomains(sampleDomains, {
      domain: 'test2',
      registrar: 'Registrar B',
      status: 'pendingTransfer',
    })

    // should return only domains that match all three filters
    expect(result).toEqual([sampleDomains[1]])
  })

  // tests for filterDomains function with filters that match no domains
  test('returns an empty array when nothing matches', () => {
    const result = filterDomains(sampleDomains, {
      domain: 'zzz',
      registrar: '',
      status: '',
    })

    // when filters don't match any domains, it should return an empty array
    expect(result).toEqual([])
  })
})
