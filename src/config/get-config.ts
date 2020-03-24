import path from 'path'
import chalk from 'chalk'
import { execSync } from 'child_process'
import { exConsole } from '../utils'
import { assignDefaultConfig } from './default.config'
import { ReactTsConfig } from '../../types/'

const configFileName = 'config/index'
const rootPath = process.cwd()
const inputPath = path.resolve(rootPath, `${configFileName}.ts`)
const outPath = path.resolve(__dirname, './')

exConsole.info(chalk.cyanBright('Config Compiling...'))

syncExec({
  bash: `tsc --outDir ${outPath} --rootDir ${rootPath} --esModuleInterop --resolveJsonModule --allowSyntheticDefaultImports --suppressImplicitAnyIndexErrors --module commonjs --target es6 ${inputPath}`,
  msg: 'Config compile',
})

let userConfig = require(path.resolve(outPath, configFileName))
if (userConfig.default) userConfig = userConfig.default

function syncExec(paramsSrc: { bash: string; msg?: string; inputPath?: string }) {
  let params = paramsSrc
  if (typeof params === 'string') params = { bash: params }

  const { bash, msg, inputPath = rootPath } = params

  try {
    const res = execSync(bash, {
      cwd: inputPath,
    }).toString()
    if (msg) exConsole.success(`${msg}: successfully.`)
    return res
  } catch (ex) {
    if (msg) exConsole.error(`${msg}: failed.\n ${ex}`)
    return ex.toString()
  }
}

const config: ReactTsConfig = Object.assign({}, assignDefaultConfig(userConfig), userConfig)

export default config
