import { bench, run } from 'mitata'
import { numeric, required, validateSchema } from '../src/index.js'

const schema = {
  from: [required, numeric],
  to: [required, numeric],
}

bench('simple bool validate', () => {
  validateSchema({
    schema,
    values: {},
  })
})

await run()
