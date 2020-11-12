import inquirer from 'inquirer'
import chalk from 'chalk'
import path from 'path'

const packageJSON = require(path.resolve(__dirname, '../../package.json'))

interface CreateConfig {
  /** 项目名称 */
  projectName: string
  /** 项目标题 */
  projectTitle: string
  /** 是否集成 Redux ($store) */
  useRedux: boolean
  /** 是否启用集中管理网络请求 ($api) */
  useCentralizedAPI: boolean
  /** 是否启用全局工具模块 ($tools) */
  useGlobalTools: boolean
  /** 是否集成 Ant-Design 及定制主体配置 (将强制启用 less) */
  useAntd: boolean
  /** 是否集成 react-router 及相关路由模块 */
  useReactRouter: boolean
  /** 是否集成 .vscode 工作区设置及插件依赖 */
  useVscodeWorkspaceConfig: boolean

  /** 集成 css 预处理器 */
  useStyleHandler: 'less' | 'scss' | 'none'
}

/** 必填项验证 */
function requiredValidate(input: string) {
  if ([undefined, null, ''].includes(input)) {
    return '你必须必填写!'
  } else {
    return true
  }
}

async function getUserConfig() {
  return inquirer
    .prompt<CreateConfig>([
      { type: 'input', name: 'projectName', message: '项目名称', validate: requiredValidate },
      { type: 'input', name: 'projectTitle', message: '项目标题', validate: requiredValidate },
      { type: 'confirm', name: 'useRedux', message: '是否集成 Redux', validate: requiredValidate },
    ])
    .then((res) => {
      console.log(res)
      return res
    })
    .catch((error) => {
      console.log(error)
    })
}

/** 确认基本信息 */
async function checkBaseInfo() {
  const renderText = (text: string, color = '#FE8D00') => chalk.hex(color)(text)
  const splitLine = chalk.yellow('***************************************************')

  const startToolTips = [
    splitLine,
    renderText('即将创建模板项目, 在这之前, 请先确认相关信息'),
    splitLine,
    `${renderText('Name           ')}: ${renderText(packageJSON.name, '#66ACEF')}`,
    `${renderText('Description    ')}: ${renderText(packageJSON.description, '#66ACEF')}`,
    `${renderText('Ver            ')}: ${renderText(packageJSON.version, '#66ACEF')}`,
    `${renderText('Ver.Typescript ')}: ${renderText(packageJSON.dependencies.typescript, '#66ACEF')}`,
    `${renderText('Ver.Webpack    ')}: ${renderText(packageJSON.dependencies.webpack, '#66ACEF')}`,
    splitLine,
  ]

  console.log(startToolTips.join('\n'))

  return inquirer.prompt({ name: 'next', type: 'confirm', message: '确认信息' }).then((val) => {
    if (val && val.next) {
      return true
    } else {
      return Promise.reject(false)
    }
  })
}

checkBaseInfo().then(() => {
  getUserConfig()
})
