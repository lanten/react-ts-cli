import path from 'path'
import { ReactTsConfigPartial } from '<slot>CLI_PACKAGE_NAME</slot>'
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
/** template-start [when](HAS_PROVIDE)

  provide: {
    <if useRedux>$store: path.resolve(rootPath, 'src/store'),</if>
    <if useCentralizedAPI>$api: path.resolve(rootPath, 'src/api'),/if>
    <if useGlobalTools>$tools: path.resolve(rootPath, 'src/tools'),</if>
  },
template-end */

  COMMON_ENV,

  env,
  afterWebpackConfig: afterWebpackConfig as any,
}

export default config
