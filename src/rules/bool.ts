import {translations} from '../translations.js'
import {types} from '../constants.js'
import {Rule} from '../types.js'

export const bool: Rule<boolean> = {
  type: types.boolean,
  rule: 'bool',
  errorMessage: translations.bool,
  valid: value => typeof value === 'boolean',
}

export const boolStr: Rule<boolean> = {
  type: types.boolean,
  rule: 'bool',
  errorMessage: translations.bool,
  valid: value => value === 'true' || value === 'false',
}
