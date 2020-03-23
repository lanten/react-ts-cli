import path from 'path'

/** 项目名称 = url 中的项目前缀 */
export const projectName = 'demo'
/** 项目标题 */
export const projectTitle = 'demo'
/** 本地服务端口 */
export const port = 18001
/** 业务代码主目录 */
export const source = path.resolve(__dirname, '../src')
/** html 模板 */
export const template = path.resolve(__dirname, '../src/index.html')
/** 编译输出目录 */
export const dist = path.resolve(__dirname, '../dist')
/** 本地 host, 需要手动修改 */
export const host = 'localhost'
/** dev-server 中使用的 publicPath */
export const devPublicPath = '/'

/** 注入到 html 模板中的变量 */
export const htmlConfig = {
  title: `${projectTitle}`,
  lang: 'zh-CN',
  keywords: `${projectTitle}`,
}

export const alias = {
  '@': path.resolve(__dirname, '../src'),
  '@root': path.resolve(__dirname, '../'),
}

export const provide = {}

export const proxy = {}

export const COMMON_ENV = {
  PROJECT_NAME: projectName,
  PROJECT_TITLE: projectTitle,
  API_BASE: '',
}

export const env = {
  mock: {
    publicPath: '',
    variables: {},
  },

  dev: {
    publicPath: '',
    variables: {},
  },

  daily: {
    publicPath: `/${projectName}/`,
    variables: {},
  },

  gray: {
    publicPath: `/${projectName}/`,
    variables: {},
  },

  prod: {
    publicPath: `/${projectName}/`,
    variables: {},
  },
}
