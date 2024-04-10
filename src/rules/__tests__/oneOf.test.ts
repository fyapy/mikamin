import {describe, test, expect} from 'vitest'
import {oneOf, handleSchema, string} from '../../index'

describe('oneOf', () => {
  test('oneOf should validate', () => {
    enum Gender {Woman, Man}

    const errors = handleSchema({
      schema: {gender: oneOf(Gender)},
      values: {},
    })

    expect(errors).toEqual({
      gender: 'gender must be one of these values: 0, 1!',
    })
  })
})
