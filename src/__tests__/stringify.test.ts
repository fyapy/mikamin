import {describe, test, expect} from 'vitest'
import {handleSchema, jsonString, list, mikaminStringify, number, oneOf, string} from '../index.ts'

describe('stringify', () => {
  test('mikaminStringify should create errors string', () => {
    const  values = {
      names: [1, null],
      params: [
        {
          type: 0,
          label: {ru: 'ru', en: 'en'},
          values: [],
        },
        {values: [{}]},
      ],
    }

    enum ParamType {Select}
    enum Currency {RUB, USD}

    const errors = handleSchema({
      schema: {
        names: list(number),
        content: {ru: string, en: string},
        manual: {ru: jsonString, en: jsonString},
        params: list({
          type: oneOf<ParamType>(ParamType),
          label: {ru: string, en: string},
          values: list({
            text: {ru: string, en: string},
            amount: number,
            currency: oneOf<Currency>(Currency),
          }),
        }),
      },
      values,
    })

    const errorMessage = mikaminStringify(errors)

    expect(errorMessage).toEqual([
      'names[1] - names must be number!',
      'content.ru - ru must be string!',
      'content.en - en must be string!',
      'manual.ru - ru must be JSON!',
      'manual.en - en must be JSON!',
      'params[1].type - type must be one of these values: 0!',
      'params[1].label.ru - ru must be string!',
      'params[1].label.en - en must be string!',
      'params[1].values[0].text.ru - ru must be string!',
      'params[1].values[0].text.en - en must be string!',
      'params[1].values[0].amount - amount must be number!',
      'params[1].values[0].currency - currency must be one of these values: 0, 1!',
    ].join('\n'))
  })
})
