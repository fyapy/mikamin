import { ErrorFormater } from './types'

export const formatErrorMsg: ErrorFormater = (props) => {
  switch (props.rule) {
    case 'required':
      return `${props.name} is required!`
    case 'requiredList':
      return `${props.name} must be a array, and not empty!`
    case 'optional':
      return 'optional'
    case 'array':
      return `${props.name} must be a array!`
    case 'email':
      return `${props.name} must be Email!`
    case 'number':
      return `${props.name} must be number!`
    case 'oneOf':
      return `${props.name} must be one of these values: ${props.meta!.values.join(', ')}!`
    default:
      return 'Unknown error'
  }
}
