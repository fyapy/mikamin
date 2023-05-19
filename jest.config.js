export default {
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },
  extensionsToTreatAsEsm: ['.ts'],
  resolver: 'ts-jest-resolver'
}
