import webpack, { Configuration } from 'webpack'

import { env as envConfig } from '../dev.config'

interface BuildConfig {
  env: keyof typeof envConfig
  webpackConfig: Configuration
}

function build({ env, webpackConfig }: BuildConfig): Promise<any> {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        throw err
      }

      process.stdout.write(
        stats.toString({
          colors: true,
          hash: true,
          version: true,
          timings: true,
          assets: true,
          chunks: false,
          children: false,
          modules: false,
        }) + '\n\n'
      )

      if (stats.hasErrors()) {
        reject(stats)
      } else {
        resolve(envConfig[env])
      }
    })
  })
}

export default build
