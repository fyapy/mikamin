import {describe, expect, test} from 'vitest'
import {json, jsonString, handleSchema, translations, setTranslations} from '../../index'

describe('json', () => {
  setTranslations({bool: translations.bool})

  test('json should validate', () => {
    const errors = handleSchema({
      schema: {text: json},
      values: {text: ''},
    })

    expect(errors).toEqual({text: 'text must be JSON!'})
  })

  test('json should validate empty array', () => {
    const errors = handleSchema({
      schema: {text: json},
      values: {text: []},
    })

    expect(errors).toEqual({})
  })

  test('jsonString should validate', () => {
    const errors = handleSchema({
      schema: {text: jsonString},
      values: {text: ''},
    })

    expect(errors).toEqual({text: 'text must be JSON!'})
  })

  test('jsonString should validate empty array', () => {
    const errors = handleSchema({
      schema: {text: jsonString},
      values: {text: '[]'},
    })

    expect(errors).toEqual({})
  })
})
