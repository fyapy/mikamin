import {d} from 'desy'
import {bench, group} from 'mitata'
import {stringNumber, handleSchema} from '../src/index.js'

group('simple schema', () => {
  const desySimpleSchema = d.object({
    from: d.number().int(),
  })
  
  bench('desy', () => {
    desySimpleSchema.validate({})
  })
  
  const mikaminSimpleSchema = {
    from: stringNumber,
  }
  
  bench('mikamin', () => {
    handleSchema({schema: mikaminSimpleSchema, values: {}})
  })
})
