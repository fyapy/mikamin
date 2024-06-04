import {defaultLanguage} from './translations'
import {handleSchema, mikaminStringify} from './index.js'

type Formatter = 'errors' | 'message'

export const mikaminHandler = (
  schema: any,
  formatter: Formatter = 'message',
  language = defaultLanguage,
) => (req: any, res: any, done: any) => {
  if (typeof req.body === 'undefined') {
    return res.status(400).send({message: 'Invalid body'})
  }

  const errors = handleSchema({
    values: req.body,
    language,
    schema,
  })

  if (Object.keys(errors).length !== 0) {
    if (formatter === 'message') {
      return res.status(400).send({message: mikaminStringify(errors)})
    }

    return res.status(400).send({errors})
  }

  done()
}
