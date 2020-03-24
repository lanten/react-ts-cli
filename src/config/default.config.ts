import path from 'path'

const rootPath = process.cwd()

/** 项目名称 = url 中的项目前缀 */
export const projectName: string = 'new-project'
/** 项目标题 */
export const projectTitle: string = 'New Project'
/** 本地服务端口 */
export const port: number = 18001
/** 业务代码主目录 默认: src */
export const source: string = path.resolve(rootPath, 'src')
/** html 模板 默认: src/index.html */
export const htmlTemplate: string = path.resolve(rootPath, 'src/index.html')
/** 编译输出目录 默认: dist */
export const dist: string = path.resolve(rootPath, 'dist')
/** 本地 host, 需要手动修改 默认: localhost */
export const host: string = 'localhost'
/** dev-server 中使用的 publicPath 默认: / */
export const devPublicPath: string = '/'

/** 注入到 html 模板中的变量 */
export const htmlConfig: any = {
  title: `${projectTitle}`,
  lang: 'zh-CN',
  keywords: `${projectTitle}`,
}

/** 路径别名 默认 */
export const alias: { [key: string]: string } = {
  '@': path.resolve(__dirname, '../src'),
  '@root': path.resolve(__dirname, '../'),
}

/** 全局加载的文件 */
export const provide: { [key: string]: any } = {}

/** dev-server 中使用的代理配置 */
export const proxy: any = {}

/** 公共环境变量 */
export const COMMON_ENV = {
  /** 项目名称 */
  PROJECT_NAME: projectName as string,
  /** 项目标题 */
  PROJECT_TITLE: projectTitle as string,
  /** api 请求地址 */
  API_BASE: '' as string,
}

/** 环境变量 */
export const env = {
  mock: {
    publicPath: '' as string,
    variables: {} as any,
  },

  dev: {
    publicPath: '' as string,
    variables: {} as any,
  },

  daily: {
    publicPath: '' as string,
    variables: {} as any,
  },

  gray: {
    publicPath: '' as string,
    variables: {} as any,
  },

  prod: {
    publicPath: '' as string,
    variables: {} as any,
  },
}

export type CommonEnvType = typeof COMMON_ENV
export type EnvType = typeof env.prod.variables

declare global {
  namespace NodeJS {
    interface ProcessEnv extends CommonEnvType, EnvType {}
  }
}
