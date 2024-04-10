import {describe, test, expect} from 'vitest'
import {
  bool,
  handleSchema,
  setTranslations,
  translations,
} from '../index.ts'

describe('translations', () => {
  test('bool should have custom error message', () => {
    const defaultBoolTranslation = translations.bool.en

    setTranslations({
      bool: {en: ({name}) => `${name} must be custom boolean errorMessage!`},
    })

    const errors = handleSchema({
      schema: {
        hasPhoto: bool,
      },
      values: {},
    })

    setTranslations({bool: {en: defaultBoolTranslation}})

    expect(errors).toEqual({
      hasPhoto: 'hasPhoto must be custom boolean errorMessage!',
    })
  })

  test('bool should have custom error message for other languages', () => {
    setTranslations({
      bool: {ru: ({name}) => `${name} должно быть истинной или ложью!`},
    })

    const errors = handleSchema({
      schema: {
        hasPhoto: bool,
      },
      values: {},
      language: 'ru',
    })

    expect(errors).toEqual({
      hasPhoto: 'hasPhoto должно быть истинной или ложью!',
    })
  })
})
