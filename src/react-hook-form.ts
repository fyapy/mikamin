import {AnyObject, Types, handleSchema} from './index'
import {defaultLanguage} from './translations'

function iterateErrors(errorList: AnyObject, errors: AnyObject) {
  if (errorList === null) {
    return
  }

  const errorKeys = Object.keys(errorList)

  if (errorKeys.length !== 0) {
    for (const prop of errorKeys) {
      const error = errorList[prop]

      if (typeof error === 'object' && error !== null) {
        if (error.__type === Types.List) {
          if (Array.isArray(error.inner)) {
            if (typeof errors[prop] === 'undefined') {
              errors[prop] = []
            }

            error.inner.forEach((innerError: any, index: number) => {
              if (typeof innerError === 'string') {
                errors[prop][index] = innerError
              } else if (innerError !== null) {
                if (typeof errors[prop][index] === 'undefined') {
                  errors[prop][index] = {}
                }

                iterateErrors(innerError, errors[prop][index])
              } else {
                errors[prop][index] = null
              }
            })
          } else {
            errors[prop] = error.field
          }
        } else {
          if (typeof errors[prop] === 'undefined') {
            errors[prop] = {}
          }

          iterateErrors(error, errors[prop])
        }
      } else if (typeof error === 'string') {
        errors[prop] = error
      }
    }
  }
}

export const mikaminResolver = (schema: any, language = defaultLanguage) => (values: AnyObject) => {
  const errorList = handleSchema({values, language, schema})
  const errors: AnyObject = {}

  iterateErrors(errorList, errors)

  return {values, errors}
}
