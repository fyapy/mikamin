import {describe, test, expect} from 'vitest'
import {
  ip,
  uuid,
  bool,
  string,
  noCyrillic,
  stringNumber,
  requiredList,
  handleSchema,
  Infer,
  number,
  nullable,
  list,
  optional,
} from '../index.ts'

describe('handleSchema', () => {
  const rile = string
  const rileList = stringNumber
  const name2 = optional(string)

  const each1 = list(string)
  const each2 = list(stringNumber)

  const list1 = list({
    key: optional(string),
    value: string,
  })

  type Schema = Infer<typeof schema>
  const schema = {
    rile,
    rileList,
    list1,
    each1,
    each2,
    user: {
      name: string,
      name2,
      isOld: nullable(bool),
      parent: {
        year: number,
      },
    },
  }

  type Schema2 = Infer<typeof schema2>
  const schema2 = {
    key: optional(string),
    valueId: string,
  }

  type Schema3 = Infer<typeof schema3>
  const schema3 = {
    params: list({
      values: list({
        id: optional(string),
        amount: number,
      }),
    }),
  }

  test('string should throw error for null', () => {
    const nullErrors = handleSchema({
      schema: {
        name: string,
      },
      values: {
        name: null,
      },
    })

    expect(nullErrors).toEqual({
      name: 'name must be string!',
    })
  })
  test('string should throw error for empty string', () => {
    const emptyStringErrors = handleSchema({
      schema: {
        name: string,
      },
      values: {
        name: '',
      },
    })

    expect(emptyStringErrors).toEqual({
      name: 'name must be string!',
    })
  })

  test('nullable should skip validation for null value', () => {
    const errors = handleSchema({
      schema: {
        cityId: nullable(string),
      },
      values: {
        cityId: null,
      },
    })

    expect(errors).toEqual({})
  })

  test('each should validate values in list', () => {
    const errors = handleSchema({
      schema: {ids: list(string)},
      values: {ids: ['1', '']},
    })

    expect(errors).toEqual({
      ids: {
        __type: 'list',
        inner: [null, 'ids must be string!'],
      },
    })
  })

  test('each should validate own property', () => {
    const errors = handleSchema({
      schema: {ids: list(string, requiredList)},
      values: {},
    })

    expect(errors).toEqual({
      ids: {
        __type: 'list',
        field: 'ids must be a array, and not empty!',
      },
    })
  })

  test('should validate nested objects', () => {
    const errors = handleSchema({
      schema: {
        age: {
          from: stringNumber,
          to: stringNumber,
        },
      },
      values: {},
    })

    expect(errors).toEqual({
      age: {
        from: 'from must be number!',
        to: 'to must be number!',
      },
    })
  })

  test('should dont allow cyrillic', () => {
    const errors = handleSchema({
      schema: {
        name: noCyrillic,
        name2: noCyrillic,
      },
      values: {
        name: 'Аня',
        name2: 'Anna'
      },
    })

    expect(errors).toEqual({
      name: 'name must not contain Cyrillic characters!',
    })
  })

  test('should currectly validate IP address', () => {
    const errors = handleSchema({
      schema: {ip},
      values: {ip: '188 .124.12.102'},
    })

    expect(errors).toEqual({ip: 'ip must be IP address!'})
  })

  test('should currectly validate v4 UUID', () => {
    const errors = handleSchema({
      schema: {uuid: uuid.v4},
      values: {uuid: '188 .124.12.102'},
    })

    expect(errors).toEqual({uuid: 'uuid must be UUID!'})
  })
})
