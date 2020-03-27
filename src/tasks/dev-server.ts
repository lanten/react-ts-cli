import chalk from 'chalk'
import webpack from 'webpack'
import address from 'address'
import WebpackDevServer, { Configuration } from 'webpack-dev-server'

import { exConsole } from '../utils'
import webpackConfig from '../webpack.config'
import { reactTsConfig } from '../config'

const { port, proxy, env, host: devHost, projectName, devPublicPath } = reactTsConfig

process.env.NODE_ENV = 'development'

const { BUILD_ENV = 'dev' } = process.env

for (const key in proxy) {
  const val = proxy[key]
  if (typeof val === 'string') {
    proxy[key] = { target: val }
  }
  proxy[key].target = val.target.replace(/\{(.+)\}/g, (_: string, type: string) => {
    return process.env[type]
  })
}

const host = devHost || address.ip() || '0.0.0.0'
const devServerOptions: WebpackDevServer.Configuration = {
  host,
  proxy,
  publicPath: devPublicPath,
  hot: true,
  noInfo: true,
  clientLogLevel: 'warn',
  historyApiFallback: true,
  compress: true,
}

function startRenderer(): Promise<webpack.Stats> {
  return new Promise((resolve) => {
    process.env.port = String(port)
    process.env.host = host

    const hotClient = ['webpack-dev-server/client', 'webpack/hot/only-dev-server']
    if (typeof webpackConfig.entry === 'object') {
      Object.keys(webpackConfig.entry).forEach((name) => {
        if (!webpackConfig.entry) throw new Error('webpackConfig.entry')
        const value = webpackConfig.entry[name]
        if (Array.isArray(value)) {
          value.unshift(...hotClient)
        } else {
          webpackConfig.entry[name] = [...hotClient, value]
        }
      })
    } else {
      webpackConfig.entry = [...hotClient, webpackConfig.entry] as string[]
    }
    WebpackDevServer.addDevServerEntrypoints(webpackConfig as Configuration, devServerOptions)

    webpackConfig.devtool = 'source-map'

    const rendererCompiler = webpack(webpackConfig)
    rendererCompiler.hooks.done.tap('done', (stats) => {
      exConsole.success(`Dev Server started. (${chalk.yellow(`${projectName}-${BUILD_ENV}`)})`)
      exConsole.info(`${chalk.dim('[ LOCAL ]')}: ${chalk.magenta.underline(`http://${host}:${port}`)}`)
      exConsole.info(`${chalk.dim('[ IP    ]')}: ${chalk.magenta.underline(`http://${address.ip()}:${port}`)}`)
      resolve(stats)
    })

    const server = new WebpackDevServer(rendererCompiler as any, devServerOptions)

    server.listen(port, host, (err) => {
      if (err) {
        exConsole.error(err)
      }
    })
  })
}

async function startDevServer() {
  exConsole.info(chalk.cyanBright(`${BUILD_ENV} Starting...`))
  await startRenderer()
}

startDevServer()
