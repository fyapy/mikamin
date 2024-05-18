import type {
  preHandlerHookHandler,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify'
import {handleSchema} from './index.js'


export const inputHandler = <T = any>(schema: any, language = 'en'): preHandlerHookHandler<RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression, { Body: T }> => (req, res, done) => {
  if (typeof req.body === 'undefined') {
    return res.status(400).send({message: 'Invalid body'})
  }

  const errors = handleSchema({
    schema,
    values: req.body,
    language,
  })

  if (Object.keys(errors).length !== 0) {
    return res.status(400).send({errors})
  }

  done()
}
