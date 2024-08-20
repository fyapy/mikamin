import {translations} from '../translations.js'
import {types} from '../constants.js'
import {Rule} from '../types.js'

export const minMax = (min: number, max: number): Rule<number> => ({
  type: types.number,
  rule: 'minMax',
  errorMessage: translations.minMax,
  meta: {min, max},
  valid: val => {
    if (typeof val === 'number' && !Number.isNaN(val)) {
      return !(val < min || val > max)
    }

    return false
  },
})
