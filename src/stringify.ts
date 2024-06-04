import {AnyObject, Types} from './types'

function iterateErrors(errorList: AnyObject, errors: string[], prefix?: string) {
  if (errorList === null) {
    return
  }

  const errorKeys = Object.keys(errorList)

  if (errorKeys.length !== 0) {
    for (const originalProp of errorKeys) {
      const prop = typeof prefix === 'undefined' ? originalProp : `${prefix}.${originalProp}`
      const error = errorList[originalProp]

      if (typeof error === 'object' && error !== null) {
        if (error.__type === Types.Each) {
          if (Array.isArray(error.inner)) {
            error.inner.forEach((innerError: any, index: number) => {
              if (innerError !== null) {
                errors.push(`${prop}[${index}] - ${innerError}`)
              }
            })
          } else {
            errors.push(`${prop} - ${error.field}`)
          }
        } else if (error.__type === Types.List) {
          if (Array.isArray(error.inner)) {
            error.inner.forEach((innerError: any, index: number) => {
              iterateErrors(innerError, errors, `${prop}[${index}]`)
            })
          } else {
            errors.push(`${prop} - ${error.field}`)
          }
        } else {
          iterateErrors(error, errors, prop)
        }
      } else if (typeof error === 'string') {
        errors.push(`${prop} - ${error}`)
      }
    }
  }
}

export const mikaminStringify = (errors: any) => {
  const errorMessages: string[] = []

  iterateErrors(errors, errorMessages)

  return errorMessages.join('\n')
}
