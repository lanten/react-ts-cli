import chalk from 'chalk'
import { clearDir, exConsole } from '../utils'

import { reactTsConfig } from '../config'
import webpackConfig from '../webpack.config'
import buildCommon from './build-common'

const env = process.env.BUILD_ENV || 'dev'

async function buildRenderer() {
  return buildCommon({ env, webpackConfig: webpackConfig }).then(() => {
    exConsole.success(`Build Success: ${env}`)
  })
}

function build() {
  exConsole.info(chalk.cyanBright(`Clear Dir... ${chalk.magenta.underline(reactTsConfig.dist)}`))

  try {
    clearDir(reactTsConfig.dist, false, true)
  } catch (error) {
    exConsole.warn(error.message)
  }

  exConsole.info(`${chalk.cyanBright('Building...')} `)
  exConsole.info(
    `NODE_ENV: ${chalk.yellowBright(process.env.NODE_ENV)} BUILD_ENV: ${chalk.bgRedBright(`  ${env}  `)}`
  )

  Promise.all([buildRenderer()])
    .then(() => {
      exConsole.info('All Done.')
    })
    .finally(() => process.exit())
    .catch((err) => {
      throw new Error(err)
    })
}

build()
