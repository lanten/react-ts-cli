import { Configuration } from 'webpack'

export declare interface EnvVariables {
  /** 项目名称 */
  PROJECT_NAME?: string
  /** 项目标题 */
  PROJECT_TITLE?: string
  /** api 请求地址 */
  API_BASE?: string
}

export declare interface EnvOptions<V = EnvVariables> {
  /** publicPath */
  publicPath: string
  /** 注入到 process.env 中的变量 */
  variables: V
}

export declare interface ReactTsConfig<V = EnvVariables> {
  /** 项目名称 = url 中的项目前缀 */
  projectName: string
  /** 项目标题 */
  projectTitle: string
  /** 本地服务端口 */
  port: number
  /** 业务代码主目录 默认: src */
  source: string
  /** html 模板 默认: src/index.html */
  htmlTemplate: string
  /** 编译输出目录 默认: dist */
  dist: string
  /** 本地 host, 需要手动修改 默认: localhost */
  host: string
  /** dev-server 中使用的 publicPath 默认: / */
  devPublicPath: string
  /** 注入到 html 模板中的变量 */
  htmlConfig: any
  /** 路径别名 默认 */
  alias: {
    [key: string]: string
  }
  /** 全局加载的文件 */
  provide: {
    [key: string]: any
  }

  /** webpack.config 后处理 */
  afterWebpackConfig: (webpackConfig: Configuration) => Configuration

  /** dev-server 中使用的代理配置 */
  proxy: any
  /** 公共环境变量 */
  COMMON_ENV: V
  /** 环境变量 */
  env: {
    [key: string]: EnvOptions
  }
}

// declare global {
//   namespace NodeJS {
//     interface ProcessEnv extends EnvVariables {}
//   }
// }
