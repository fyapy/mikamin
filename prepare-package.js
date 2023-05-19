const fs = require('fs/promises')
const fsSync = require('fs')
const path = require('path')

const buildDir = './build'

async function createEsmModulePackageJson() {
  const dirs = await fs.readdir(buildDir)
  dirs.forEach(dir => {
    if (dir === 'esm') {
      const packageJsonFile = path.join(buildDir, dir, '/package.json')
      if (!fsSync.existsSync(packageJsonFile)) {
        fs.writeFile(
          packageJsonFile,
          new Uint8Array(Buffer.from('{"type": "module"}'))
        )
      }
    }
  })
}

createEsmModulePackageJson()
