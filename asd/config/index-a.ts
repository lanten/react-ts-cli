import path from 'path'
import { ReactTsConfigPartial } from '@sbc-fe/react-ts-cli'
import { env, publicPath, COMMON_ENV } from './env.config'
import { afterWebpackConfig } from './webpack.config'

const rootPath = process.cwd()

const config: ReactTsConfigPartial = {
  projectName: COMMON_ENV.PROJECT_NAME,
  projectTitle: COMMON_ENV.PROJECT_TITLE,
  host: 'localhost',
  port: 18081,
  htmlTemplate: path.resolve(rootPath, 'src/index.html'),
  devServerOptions: {
    disableHostCheck: true,
    publicPath,
  },

  entry: {
    app: path.resolve(rootPath, 'src/index.tsx'),
  },

  provide: {
  },

  COMMON_ENV,

  env,
  afterWebpackConfig,
}

export default config
