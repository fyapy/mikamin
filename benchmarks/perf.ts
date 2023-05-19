import { bench, run } from 'mitata'
import { numeric, required, handleSchema } from '../src/index.js'

const schema = {
  from: [required, numeric],
  to: [required, numeric],
}

bench('simple bool validate', () => {
  handleSchema({
    schema,
    values: {},
  })
})

await run()
