import type { Rule } from './types'
import { enumValues } from './utils/array'

export const required: Rule = {
  rule: 'required',
  fire: value => {
    if (typeof value === 'string') {
      return !value.trim()
    }
    if (Array.isArray(value)) {
      return value.length === 0
    }

    return typeof value === 'undefined' || value === null
  },
}
export const array: Rule = {
  rule: 'array',
  fire: value => !Array.isArray(value),
}
export const optinalArray: Rule = {
  rule: 'array',
  fire: value => typeof value !== 'undefined'
    ? !Array.isArray(value)
    : false,
}

export const requiredList: Rule = {
  rule: 'requiredList',
  fire: value => Array.isArray(value)
    ? value.length === 0
    : true,
}

const noCyrillic = (text: string) => !text || /[А-Яа-яёЁ]+/ig.test(String(text))

export const email: Rule = {
  rule: 'email',
  fire: email => {
    if (!email) {
      return true
    }
    if (noCyrillic(email)) {
      return true
    }

    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
    return !re.test(String(email).toLowerCase())
  },
}
export const numeric: Rule = {
  rule: 'number',
  fire: value => {
    if (value === null) {
      return true
    }
    if (typeof value === 'string' && value.length === 0) {
      return true
    }

    return isNaN(Number(value))
  },
}
export const number: Rule = {
  rule: 'number',
  fire: value => typeof value !== 'number',
}
export const bool: Rule = {
  rule: 'bool',
  fire: value => typeof value !== 'boolean',
}


export const minMax = (_min: number, _max: number): Rule => ({
  rule: 'minMax',
  fire: val => typeof val !== 'number'
    ? true
    : (val < _min || val > _max),
  meta: {
    min: _min,
    max: _max,
  },
})

export const minLength = (length: number): Rule => ({
  rule: 'minLength',
  fire: text => !text
    ? true
    : text.length < length,
  meta: {
    min: length,
  },
})
export const maxLength = (length: number): Rule => ({
  rule: 'maxLength',
  fire: text => !text
    ? true
    : text.length > length,
  meta: {
    max: length,
  },
})

export const httpUrl: Rule = {
  rule: 'httpUrl',
  fire: value => {
    try {
      const url = new URL(value)

      return url.protocol === 'http:' || url.protocol === 'https:'
    } catch (_) {
      return false
    }
  },
}

export const oneOf = (values: any[]): Rule => ({
  rule: 'oneOf',
  fire: value => !values.includes(value),
  meta: {
    values,
  },
})
export const oneOfEnum = (_enum: any): Rule => {
  const allowedValues = enumValues(_enum)

  return {
    rule: 'oneOf',
    fire: value => !allowedValues.includes(value),
    meta: {
      values: allowedValues,
    },
  }
}

export const regExp = (regexp: RegExp): Rule => ({
  rule: 'regExp',
  fire: value => {
    if (!value) {
      return true
    }

    return !regexp.test(String(value))
  },
  meta: {
    regexp,
  },
})
