import {defaultLanguage} from './translations'
import {handleSchema} from './index.js'

export const mikaminHandler = (schema: any, language = defaultLanguage) => (req: any, res: any, done: any) => {
  if (typeof req.body === 'undefined') {
    return res.status(400).send({message: 'Invalid body'})
  }

  const errors = handleSchema({
    values: req.body,
    language,
    schema,
  })

  if (Object.keys(errors).length !== 0) {
    return res.status(400).send({errors})
  }

  done()
}
