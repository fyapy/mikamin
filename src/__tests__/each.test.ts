import {describe, test, expect} from 'vitest'
import {each, handleSchema, string} from '../index'

describe('each', () => {
  test('each should be required by default', () => {
    const errors = handleSchema({
      schema: {ids: each(string)},
      values: {},
    })

    expect(errors).toEqual({
      ids: {
        __type: 'each',
        field: 'ids must be a array!',
      }
    })
  })

  test('each should allow empty array', () => {
    const errors = handleSchema({
      schema: {ids: each(string)},
      values: {ids: []},
    })
  
    expect(errors).toEqual({})
  })
})
