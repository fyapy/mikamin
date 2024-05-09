import {z} from 'zod'
import joi from 'joi'
import * as yup from 'yup'
import {bench, group} from 'mitata'
import {stringNumber, handleSchema} from '../src/index.js'

group('simple schema', () => {
  const joiSimpleSchema = joi.object({
    from: joi.number().required(),
  })

  bench('joi', () => {
    joiSimpleSchema.validate({})
  })

  const yupSimpleSchema = yup.object({
    from: yup.number().required(),
  })

  bench('yup', () => {
    try {
      yupSimpleSchema.validateSync({})
    } catch {}
  })

  const zodSimpleSchema = z.object({
    from: z.number().int(),
  })

  bench('zod', () => {
    zodSimpleSchema.safeParse({})
  })

  const mikaminSimpleSchema = {
    from: stringNumber,
  }

  bench('mikamin', () => {
    handleSchema({schema: mikaminSimpleSchema, values: {}})
  })
})
