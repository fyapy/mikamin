import {
  bool,
  validateSchema,
  setTranslations,
} from '../src'

describe('translations', () => {
  setTranslations({
    bool: {en: ({name}) => `${name} must be custom boolean errorMessage!`},
  })

  test('bool should have custom error message', () => {
    const errors = validateSchema({
      schema: {
        hasPhoto: bool,
      },
      values: {},
    })

    expect(errors).toEqual({
      hasPhoto: 'hasPhoto must be custom boolean errorMessage!',
    })
  })

  setTranslations({
    bool: {ru: ({name}) => `${name} должно быть истинной или ложью!`},
  })

  test('bool should have custom error message for other languages', () => {
    const errors = validateSchema({
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
