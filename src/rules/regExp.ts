import {resetRegexpState} from '../utils.js'
import {translations} from '../translations.js'
import {types} from '../constants.js'
import {Rule} from '../types.js'

export const regExp = (regexp: RegExp): Rule<string> => ({
  type: types.string,
  rule: 'regExp',
  errorMessage: translations.regExp,
  meta: {regexp},
  valid: value => {
    if (!value) {
      return false
    }

    resetRegexpState(regexp)
    return regexp.test(String(value))
  },
})

