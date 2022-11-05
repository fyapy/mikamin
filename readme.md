# Schema based validation library

Zoply Schema lightweight schema builder for value parsing and synchronous validation.

## Getting Started

### Installation

```sh
# Install with yarn
yarn add zoply-schema

# Install with npm
npm install zoply-schema --save
```

### Usage

You define and create schema objects. Schema objects are immutable, so each call of a method returns a new schema object.
Basic schema definition:

```ts
import {
  bool,
  numeric,
  required,
  nullable,
  requiredList,
  each,
  optional,
  validateSchema,
} from 'libs/vladik-schema'

enum Gender {
  Man = 0,
  Woman = 1,
}

interface FeedSearch {
  ids?: string[]
  genders: Gender[]
  cityId: number | null
  addiction?: number
  age: {
    from: number
    to: number
  }
  hasPhoto: boolean
}
const searchSchema = {
  ids: each(required),
  genders: each(required, requiredList),
  cityId: nullable(required),
  addiction: optional([required, numeric]),
  age: {
    from: [required, numeric],
    to: [required, numeric],
  },
  hasPhoto: bool,
}

// check validity
const errors = validateSchema({
  schema: searchSchema,
  values: {
    genders: [1],
    cityId: '327',
  },
})

const hasError = Object.keys(errors).length != 0

console.log(errors)
// => {
//   age: { from: 'from is required!', to: 'to is required!' },
//   hasPhoto: 'hasPhoto must be boolean!'
// }
```

### Using a custom locale dictionary

When you call `validateSchema`, he have parametr `fromatter`, and you able to detect user language, and after just

```ts
const formatErrorMsg = (lang: Language): ErrorFormater => ({ rule, name, meta }) => {
  const dictionary = dictionaries[lang]

  switch (rule) {
    case 'required':
      return dictionary.REQUIRED.replace('#name#', name)
    case 'requiredList':
      return dictionary.REQUIRED_LIST.replace('#name#', name)
    case 'optional':
      return dictionary.OPTIONAL.replace('#name#', name)
    case 'array':
      return dictionary.ARRAY.replace('#name#', name)
    case 'email':
      return dictionary.EMAIL.replace('#name#', name)
    case 'number':
      return dictionary.NUMBER.replace('#name#', name)
    case 'oneOf':
      return dictionary.ONE_OF
        .replace('#name#', name)
        .replace('#meta#', meta!.values.join(', '))
    default:
      return dictionary.UNKNOWN
  }
}

// Validation
const errors = validateSchema({
  schema,
  values: req.body,
  formater: formatErrorMsg(req.lang),
})
```

### Fastify integration

```ts
type Validate<T> = preHandlerHookHandler<RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression, { Body: T }>

export const zoplyValidate = (schema: any): Validate<any> => (req, res, done) => {
  req.lang = parseAcceptLanguage(req.headers['accept-language']!)

  const errors = validateSchema({
    schema,
    values: req.body,
    formater: formatErrorMsg(req.lang),
  })

  if (Object.keys(errors).length != 0) {
    return res.status(400).send({
      errors,
    })
  }

  done()
}
```

And use it in handler:

```ts
// handler.ts
import * as input from './input'

fastify.route<{ Body: input.Register }>({
  url: '/register',
  method: 'POST',
  preHandler: zoplyValidate(input.registerSchema),
  handler: req => services.AuthService.register(req.body),
})

// input.ts
export interface Register {
  username: string
  email: string
  password: string
}
export const registerSchema = {
  username: required,
  email: [required, email],
  password: required,
}
```
