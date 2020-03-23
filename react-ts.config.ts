import path from 'path'

/** 项目名称 = url 中的项目前缀 */
export const projectName = 'demo2'
/** 项目标题 */
export const projectTitle = 'demo2'

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
