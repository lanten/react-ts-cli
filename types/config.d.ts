import { Configuration } from 'webpack'
import { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { TerserPluginOptions } from 'terser-webpack-plugin'
import { Options as HtmlOptions } from 'html-webpack-plugin'
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
  /** 项目名称 */
  projectName: string
  /** 项目标题 */
  projectTitle: string
  /** 本地服务端口 默认: 18081 */
  port: number
  /** 入口文件配置 默认: 'src/index.ts' */
  entry: Configuration['entry']
  /** html 模板 默认: src/index.html */
  htmlTemplate: string
  /** 编译输出目录 默认: dist */
  dist: string
  /** 本地 host, 需要手动修改 默认: localhost */
  host: string
  /** webpack-dev-server 相关配置 */
  devServerOptions?: DevServerConfiguration
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
  afterWebpackConfig?: (webpackConfig: Configuration) => Configuration
  /** dev-server 中使用的代理配置 */
  proxy: any
  /** 公共环境变量 */
  COMMON_ENV: V
  /** 环境变量 */
  env: {
    [key: string]: EnvOptions
  }
  /** postcss 相关配置 */
  postcssOptions: {
    /**	Enable PostCSS Parser support in CSS-in-JS */
    exec?: boolean
    /** Set PostCSS Parser */
    parser?: string | object
    /** Set PostCSS Syntax */
    syntax?: string | object
    /** Set PostCSS Stringifier */
    stringifier?: string | object
    /** Set postcss.config.js config path && ctx */
    config?: object
    /** Set PostCSS Plugins */
    plugins?: any[] | Function
    /** Enable Source Maps */
    sourceMap?: string | boolean
    ident?: string
  }

  terserOptions?: TerserPluginOptions
  htmlOptions?: HtmlOptions
}

export type ReactTsConfigPartial<T = EnvVariables> = Partial<ReactTsConfig<T>>

// declare global {
//   namespace NodeJS {
//     interface ProcessEnv extends EnvVariables {}
//   }
// }
