import {defineConfig} from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  clean: true,
  format: ['esm', 'cjs'],
  minify: true,
  dts: true,
  outDir: './dist',
  outExtension: ({format}) => ({
    js: format === 'cjs' ? '.min.cjs' : '.min.js',
  }),
})
