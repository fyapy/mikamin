import {translations} from '../translations.js'
import {types} from '../constants.js'
import {Rule} from '../types.js'

export const json: Rule<Record<string, any>> = {
  type: types.json,
  rule: 'json',
  errorMessage: translations.json,
  valid: value => {
    if (typeof value === 'object' && value !== null) {
      try {
        JSON.stringify(value)
        return true
      } catch {
        return false
      }
    }

    return false
  },
}

export const jsonString: Rule<string> = {
  type: types.string,
  rule: 'json',
  errorMessage: translations.json,
  valid: value => {
    if (typeof value !== 'string') {
      return false
    }

    try {
      JSON.parse(value)
      return true
    } catch {
      return false
    }
  },
}
