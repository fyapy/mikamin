import fs from 'fs/promises'
import fsSync from 'fs'
import path from 'path'

const buildDir = '/dist'

async function createEsmModulePackageJson() {
  console.log('Start prepare script')
  const dirs = await fs.readdir(`.${buildDir}`)
  dirs.forEach(dir => {
    if (dir === 'esm') {
      const packageJsonFile = path.join(`.${buildDir}`, dir, '/package.json')
      if (!fsSync.existsSync(packageJsonFile)) {
        fs.writeFile(
          packageJsonFile,
          new Uint8Array(Buffer.from('{"type": "module"}'))
        )
      }
    }
  })


  const packageString = (await fs.readFile('./package.json')).toString()
  const packageJson = JSON.parse(packageString)

  delete packageJson.type
  delete packageJson.files
  delete packageJson.scripts
  delete packageJson.devDependencies
  packageJson.main = packageJson.main.replace(buildDir, '')
  packageJson.types = packageJson.types.replace(buildDir, '')
  packageJson.module = packageJson.module.replace(buildDir, '')

  const newPackageJsonPath = path.join(`.${buildDir}`, '/package.json')
  await fs.writeFile(newPackageJsonPath, JSON.stringify(packageJson))


  await fs.copyFile('./readme.md', `.${buildDir}/readme.md`)
  await fs.unlink(`.${buildDir}/index.d.cts`)
  console.log('Prepare script finished')
}

createEsmModulePackageJson()
