import {describe, test, expect} from 'vitest'
import {enumValues} from '../utils.ts'

describe('utils', () => {
  test('enumValues should convert enum with string values', () => {
    enum Gender {Man, Woman}
    const genders = enumValues(Gender)

    expect(genders).toEqual([0, 1])
  })

  test('enumValues should convert enum with string values', () => {
    enum Report {
      Insults = 'insults',
      Scam = 'scam',
    }
    const reports = enumValues(Report)

    expect(reports).toEqual(['insults', 'scam'])
  })
})
