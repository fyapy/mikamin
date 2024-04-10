import {describe, test, expect} from 'vitest'
import {each, handleSchema, list, string} from '../index'

describe('each', () => {
  test('list should be required by default', () => {
    const errors = handleSchema({
      schema: {ids: list({id: string})},
      values: {},
    })
  
    expect(errors).toEqual({
      ids: {
        __type: 'list',
        field: 'ids must be a array!',
      }
    })
  })

  test('list should allow empty array', () => {
    const errors = handleSchema({
      schema: {ids: list({id: string})},
      values: {ids: []},
    })
  
    expect(errors).toEqual({})
  })
})
