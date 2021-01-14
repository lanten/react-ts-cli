import path from 'path'
import { Configuration } from 'webpack'

export function afterWebpackConfig(webpackConfig: Configuration): Configuration {
  const nextConfig = Object.assign({}, webpackConfig)
  const lessLoader = (nextConfig.module?.rules || [])[2] || {}

  // @ts-ignore
  nextConfig.module?.rules[2]?.use[(lessLoader?.use as any[]).length - 1].options.lessOptions.modifyVars = {
    // 更改主题色
    hack: `true; @import "${path.join(process.cwd(), 'src/styles/antd-theme.less')}";`, // Override with less file
  }

  return nextConfig
}
