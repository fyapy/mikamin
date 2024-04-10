import {translations} from '../translations.js'
import {types} from '../constants.js'
import {Rule} from '../types.js'

export const string: Rule<string> = {
  type: types.string,
  rule: 'string',
  errorMessage: translations.string,
  valid: value => typeof value === 'string' && value.trim() !== '',
}
