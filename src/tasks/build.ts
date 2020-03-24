import chalk from 'chalk'
import { clearDir, exConsole } from '../utils'

import { reactTsConfig } from '../config'
import webpackConfig from '../webpack.config'
import buildCommon from './build-common'

const env = process.env.BUILD_ENV || 'dev'

async function buildRenderer() {
  return buildCommon({ env, webpackConfig: webpackConfig }).then(() => {
    exConsole.success(`[Build Success] : ${env}`)
  })
}

function build() {
  exConsole.info(chalk.cyanBright(`[Clear Dir...] : ${chalk.magenta.underline(reactTsConfig.dist)}`))

  try {
    clearDir(reactTsConfig.dist, false, true)
  } catch (error) {
    exConsole.warn(error.message)
  }

  exConsole.info(`[Building...] : ${env} : ${process.env.NODE_ENV}`)

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
