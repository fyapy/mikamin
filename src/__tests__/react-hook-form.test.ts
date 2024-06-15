import {describe, test, expect} from 'vitest'
import {jsonString, list, mikaminResolver, number, oneOf, string} from '../index.ts'

describe('react-hook-form', () => {
  test('mikaminResolver should create errors', () => {
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

    const resolver = mikaminResolver({
      names: list(number),
      content: {ru: jsonString, en: jsonString},
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
    })

    const errors = resolver(values)

    expect(errors).toEqual({
      values,
      errors: {
        names: [null, 'names must be number!'],
        content: {ru: 'ru must be JSON!', en: 'en must be JSON!'},
        manual: {ru: 'ru must be JSON!', en: 'en must be JSON!'},
        params: [
          null,
          {
            label: {ru: 'ru must be string!', en: 'en must be string!'},
            type: 'type must be one of these values: 0!',
            values: [
              {
                amount: 'amount must be number!',
                currency: 'currency must be one of these values: 0, 1!',
                text: {ru: 'ru must be string!', en: 'en must be string!'},
              },
            ],
          },
        ],
      },
    })
  })
})
