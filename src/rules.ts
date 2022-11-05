import type { Rule } from './types'
import { enumValues } from './utils'

export const required: Rule = {
  rule: 'required',
  getError: {
    en: ({name}) => `${name} is required!`
  },
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
  getError: {
    en: ({name}) => `${name} must be a array!`
  },
}
export const optinalArray: Rule = {
  rule: 'array',
  fire: value => typeof value !== 'undefined'
    ? !Array.isArray(value)
    : false,
    getError: {
      en: ({name}) => `${name} must be a array or not defined!`
    }
}

export const requiredList: Rule = {
  rule: 'requiredList',
  fire: value => Array.isArray(value)
    ? value.length === 0
    : true,
  getError: {
    en: ({name}) => `${name} must be a array, and not empty!`
  }
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
  getError: {
    en: ({name}) => `${name} must be Email!`
  }
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
  getError: {
    en: ({name}) => `${name} must be number!`
  }
}
export const number: Rule = {
  rule: 'number',
  fire: value => typeof value !== 'number',
  getError: {
    en: ({name}) => `${name} must be number!`
  }
}
export const bool: Rule = {
  rule: 'bool',
  fire: value => typeof value !== 'boolean',
  getError: {
    en: ({name}) => `${name} must be boolean!`
  }
}


export const minMax = (min: number, max: number): Rule => ({
  rule: 'minMax',
  fire: val => typeof val !== 'number'
    ? true
    : (val < min || val > max),
  meta: {
    min,
    max,
  },
  getError: {
    en: ({name, meta}) => `${name} should not be more than ${meta.min}, but not less than ${meta.max}!`
  }
})

export const minLength = (min: number): Rule => ({
  rule: 'minLength',
  fire: text => !text
    ? true
    : text.length < min,
  meta: {
    min,
  },
  getError: {
    en: ({name, meta}) => `The length of the ${name} must be at least ${meta.min}!`
  }
})
export const maxLength = (max: number): Rule => ({
  rule: 'maxLength',
  fire: text => !text
    ? true
    : text.length > max,
  meta: {
    max,
  },
  getError: {
    en: ({name, meta}) => `The length of the ${name} must be maximum ${meta.max}!`
  }
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
  getError: {
    en: ({name}) => `${name} must be a valid URL!`
  }
}

export const oneOf = (oneOfValues: any[] | any): Rule => {
  const values = !Array.isArray(oneOfValues)
    ? enumValues(oneOfValues)
    : oneOfValues

  return {
    rule: 'oneOf',
    fire: value => !values.includes(value),
    meta: {
      values,
    },
    getError: {
      en: ({name, meta}) => `${name} must be one of these values: ${meta.values.join(', ')}!`
    }
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
  getError: {
    en: ({name}) => `${name} must match ${regexp} the regular expression!`
  }
})
