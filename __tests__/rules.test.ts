import {
  each,
  required,
  requiredList,
  nullable,
  numeric,
  bool,
  validateSchema,
} from '../src'

describe('validateSchema', () => {
  test('bool should validate', () => {
    const errors = validateSchema({
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
    const nullErrors = validateSchema({
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
    const emptyStringErrors = validateSchema({
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
    const errors = validateSchema({
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
    const errors = validateSchema({
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
    const errors = validateSchema({
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
    const errors = validateSchema({
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
})
