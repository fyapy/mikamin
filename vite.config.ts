import {defineConfig} from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom',
    fileParallelism: false,
    isolate: false,
  },
})
