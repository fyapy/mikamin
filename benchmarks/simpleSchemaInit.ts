import {z} from 'zod'
import joi from 'joi'
import * as yup from 'yup'
import {bench, group} from 'mitata'
import {handleSchema, stringNumber} from '../src/index.js'

group('simple schema with init', () => {
  bench('joi', () => {
    const schema = joi.object({
      from: joi.number().required(),
    })

    schema.validate({})
  })

  bench('yup', () => {
    const schema = yup.object({
      from: yup.number().required(),
    })

    try {
      schema.validateSync({})
    } catch {}
  })

  bench('zod', () => {
    const schema = z.object({
      from: z.number().int(),
    })

    schema.safeParse({})
  })

  bench('mikamin', () => {
    const schema = {
      from: stringNumber,
    }

    handleSchema({schema, values: {}})
  })
})
