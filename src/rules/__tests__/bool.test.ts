import {describe, expect, test} from 'vitest'
import {bool, handleSchema, translations, setTranslations} from '../../index'

describe('bool', () => {
  setTranslations({bool: translations.bool})
  
  test('bool should validate', () => {
    const errors = handleSchema({
      schema: {
        hasPhoto: bool,
      },
      values: {},
    })
  
    expect(errors).toEqual({
      hasPhoto: 'hasPhoto must be boolean!',
    })
  })
})
