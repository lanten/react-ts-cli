import path from 'path'
import { execSync } from 'child_process'
import { exConsole } from '../utils'
import * as defaultConfig from './default.config'

const configFileName = 'react-ts.config'
const rootPath = process.cwd()
const inputPath = path.resolve(rootPath, `${configFileName}.ts`)
const outPath = path.resolve(__dirname, './')

exConsole.info('=> Config compiling...')

syncExec({
  bash: `tsc --outDir ${outPath} --rootDir ${rootPath} --esModuleInterop --resolveJsonModule --allowSyntheticDefaultImports --suppressImplicitAnyIndexErrors --module commonjs --target es6 ${inputPath}`,
  msg: 'Config compile',
})

const config = require(path.resolve(outPath, configFileName))

function syncExec(paramsSrc: { bash: string; msg?: string; inputPath?: string }) {
  let params = paramsSrc
  if (typeof params === 'string') params = { bash: params }

  const { bash, msg, inputPath = rootPath } = params

  try {
    const res = execSync(bash, {
      cwd: inputPath,
    }).toString()
    if (msg) exConsole.success(`=> ${msg} successfully.`)
    return res
  } catch (ex) {
    if (msg) exConsole.error(`=> ${msg} failed.\n ${ex}`)
    return ex.toString()
  }
}

export default {
  ...defaultConfig,
  ...config,
}
