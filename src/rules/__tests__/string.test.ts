import {describe, expect, test} from 'vitest'
import {string, handleSchema, translations, setTranslations} from '../../index'

describe('string', () => {
  setTranslations({bool: translations.bool})

  test('string should validate', () => {
    const errors = handleSchema({
      schema: {title: {ru: string, en: string}},
      values: {title: {ru: '', en: ''}},
    })

    expect(errors).toEqual({
      title: {
        en: 'en must be string!',
        ru: 'ru must be string!',
      }
    })
  })
})
