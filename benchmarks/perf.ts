import {run} from 'mitata'

import './simpleSchemaInit.ts'
import './simpleSchema.ts'

await run({percentiles: false, min_max: false})
