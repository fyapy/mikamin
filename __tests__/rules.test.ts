import {
  each,
  required,
  requiredList,
  nullable,
  numeric,
  bool,
  handleSchema,
  noCyrillic,
  ip,
  uuid,
} from '../src'

describe('handleSchema', () => {
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

  test('required should throw error for null', () => {
    const nullErrors = handleSchema({
      schema: {
        name: required,
      },
      values: {
        name: null,
      },
    })

    expect(nullErrors).toEqual({
      name: 'name is required!',
    })
  })
  test('required should throw error for empty string', () => {
    const emptyStringErrors = handleSchema({
      schema: {
        name: required,
      },
      values: {
        name: '',
      },
    })

    expect(emptyStringErrors).toEqual({
      name: 'name is required!',
    })
  })

  test('nullable should skip validation for null value', () => {
    const errors = handleSchema({
      schema: {
        cityId: nullable(required),
      },
      values: {
        cityId: null,
      },
    })

    expect(errors).toEqual({})
  })

  test('each should validate values in list', () => {
    const errors = handleSchema({
      schema: {
        ids: each(required),
      },
      values: {
        ids: ['1', ''],
      },
    })

    expect(errors).toEqual({
      ids: {
        __type: 'each',
        inner: [null, 'ids is required!'],
      },
    })
  })

  test('each should validate own property', () => {
    const errors = handleSchema({
      schema: {
        ids: each(required, requiredList),
      },
      values: {},
    })

    expect(errors).toEqual({
      ids: {
        __type: 'each',
        field: 'ids must be a array, and not empty!',
      },
    })
  })

  test('should validate nested objects', () => {
    const errors = handleSchema({
      schema: {
        age: {
          from: [required, numeric],
          to: [required, numeric],
        },
      },
      values: {},
    })

    expect(errors).toEqual({
      age: {
        from: 'from is required!',
        to: 'to is required!',
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
