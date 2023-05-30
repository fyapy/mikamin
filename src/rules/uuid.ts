import { UUID_V4_REGEXP, resetRegexpState } from "../utils.js"
import { translations } from "../translations.js"
import { Rule } from "../types.js"

export const uuid: Record<'v4', Rule> = {
  v4: {
    rule: 'uuid',
    errorMessage: translations.uuid,
    valid: uuid => {
      if (!uuid) {
        return false
      }

      resetRegexpState(UUID_V4_REGEXP)
      return UUID_V4_REGEXP.test(String(uuid).toLowerCase())
    },
  },
}
