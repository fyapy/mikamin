import type {
  preHandlerHookHandler,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify'
import { handleSchema } from "./index.js"


export const inputHandler = <T = any>(schema: any): preHandlerHookHandler<RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression, { Body: T }> => ({body}, res, done) => {
  const errors = handleSchema({
    schema,
    values: body,
    language: 'ru',
  })

  if (Object.keys(errors).length !== 0) {
    return res.status(400).send({errors})
  }

  done()
}
