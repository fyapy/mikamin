import {describe, expect, test} from 'vitest'
import {handleSchema, minMax} from '../../index'

describe('minMax', () => {
  test('minMax should validate required', () => {
    const errors = handleSchema({
      schema: {
        amount: minMax(1000, 1_000_000),
      },
      values: {},
    })

    expect(errors).toEqual({
      amount: 'amount should not be more than 1000, but not less than 1000000!',
    })
  })

  test('minMax should validate min value', () => {
    const errors = handleSchema({
      schema: {
        amount: minMax(1000, 1_000_000),
      },
      values: {
        amount: 100,
      },
    })

    expect(errors).toEqual({
      amount: 'amount should not be more than 1000, but not less than 1000000!',
    })
  })

  test('minMax should validate max value', () => {
    const errors = handleSchema({
      schema: {
        amount: minMax(1000, 2000),
      },
      values: {
        amount: 2001,
      },
    })

    expect(errors).toEqual({
      amount: 'amount should not be more than 1000, but not less than 2000!',
    })
  })

  test('minMax should just validate', () => {
    const errors = handleSchema({
      schema: {
        amount: minMax(1000, 1_000_000),
      },
      values: {
        amount: 1200,
      },
    })

    expect(errors).toEqual({})
  })
})
