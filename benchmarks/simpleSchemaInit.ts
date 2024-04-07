import {d} from 'desy'
import {bench, group} from 'mitata'
import {handleSchema, stringNumber} from '../src/index.js'

group('simple schema with init', () => {
  bench('desy', () => {
    const schema = d.object({
      from: d.number().int(),
    })
  
    schema.validate({})
  })
  
  bench('mikamin', () => {
    const mikaminSimpleSchema = {
      from: stringNumber,
    }
  
    handleSchema({schema: mikaminSimpleSchema, values: {}})
  })
})
