import {Translations} from './types.js'

export const translations: Translations = {
  bool: {en: ({name}) => `${name} must be boolean!`},
  array: {en: ({name}) => `${name} must be a array!`},
  email: {en: ({name}) => `${name} must be Email!`},
  httpUrl: {en: ({name}) => `${name} must be a valid URL!`},
  maxLength: {en: ({name, meta}) => `The length of the ${name} must be maximum ${meta.max}!`},
  minLength: {en: ({name, meta}) => `The length of the ${name} must be at least ${meta.min}!`},
  minMax: {en: ({name, meta}) => `${name} should not be more than ${meta.min}, but not less than ${meta.max}!`},
  number: {en: ({name}) => `${name} must be number!`},
  oneOf: {en: ({name, meta}) => `${name} must be one of these values: ${meta.values.join(', ')}!`},
  optinalArray: {en: ({name}) => `${name} must be a array or not defined!`},
  regExp: {en: ({name, meta}) => `${name} must match ${meta.regexp} the regular expression!`},
  string: {en: ({name}) => `${name} must be string!`},
  requiredList: {en: ({name}) => `${name} must be a array, and not empty!`},
  noCyrillic: {en: ({name}) => `${name} must not contain Cyrillic characters!`},
  ip: {en: ({name}) => `${name} must be IP address!`},
  uuid: {en: ({name}) => `${name} must be UUID!`},
  json: {en: ({name}) => `${name} must be JSON!`},
}

export const setTranslations = (newTranslations: Translations) => {
  for (const translation of Object.keys(newTranslations)) {
    const newErrorMessages = newTranslations[translation]

    for (const ruleErrorMessage of Object.keys(newErrorMessages)) {
      translations[translation][ruleErrorMessage] = newErrorMessages[ruleErrorMessage]
    }
  }
}
