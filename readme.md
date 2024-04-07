# Schema based validation library

Mikamin lightweight schema builder for value parsing and synchronous validation.

## Getting Started

### Installation

```sh
# Install with pnpm
pnpm add mikamin

# Install with npm
npm install mikamin
```

### Usage

You define and create schema objects. Schema objects are immutable, so each call of a method returns a new schema object.
Basic schema definition:

<!-- interface FeedSearch {
  ids?: string[]
  genders: Gender[]
  cityId: number | null
  addiction?: number
  age: {
    from: number
    to: number
  }
  hasPhoto: boolean
} -->

```ts
import {
  bool,
  each,
  Infer,
  string,
  optional,
  nullable,
  stringNumber,
  requiredList,
  handleSchema,
} from 'mikamin'

enum Gender {
  Man = 0,
  Woman = 1,
}

const searchSchema = {
  ids: each(string),
  genders: each(string, requiredList),
  cityId: nullable(string),
  addiction: optional(stringNumber),
  age: {
    from: stringNumber,
    to: stringNumber,
  },
  hasPhoto: bool,
}
type Search = type Schema = Infer<typeof searchSchema>

// check validity
const errors = handleSchema({
  schema: searchSchema,
  values: {
    genders: [1],
    cityId: '327',
  },
})

const hasError = Object.keys(errors).length != 0

console.log(errors)
// => {
//   age: { from: 'from must be string!', to: 'to must be string!' },
//   hasPhoto: 'hasPhoto must be boolean!'
// }
```

### Using a custom locale dictionary

When you call `handleSchema`, he have parametr `fromatter`, and you able to detect user language, and after just

```ts
const formatErrorMsg = (lang: Language): ErrorFormater => ({ rule, name, meta }) => {
  const dictionary = dictionaries[lang]

  switch (rule) {
    case 'string':
      return dictionary.STRING.replace('#name#', name)
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
const errors = handleSchema({
  schema,
  values: req.body,
  formater: formatErrorMsg(req.lang),
})
```

### Fastify integration

```ts
type Validate<T> = preHandlerHookHandler<RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression, { Body: T }>

export const mikaminValidate = (schema: any): Validate<any> => (req, res, done) => {
  req.lang = parseAcceptLanguage(req.headers['accept-language']!)

  const errors = handleSchema({
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
  preHandler: mikaminValidate(input.registerSchema),
  handler: req => services.AuthService.register(req.body),
})

// input.ts
export interface Register {
  username: string
  email: string
  password: string
}
export const registerSchema = {
  username: string,
  email: email,
  password: string,
}
```
