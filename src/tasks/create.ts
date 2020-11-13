import inquirer from 'inquirer'
import chalk from 'chalk'
import path from 'path'

const packageJSON = require(path.resolve(__dirname, '../../package.json'))

/** 预装功能 */
export type PreInstalls =
  /** 是否集成 Redux ($store) */
  | 'useRedux'
  /** 是否启用集中管理网络请求 ($api) */
  | 'useCentralizedAPI'
  /** 是否启用全局工具模块 ($tools) */
  | 'useGlobalTools'
  /** 是否集成 react-router 及相关路由模块 */
  | 'useReactRouter'
  /** 是否集成 Ant-Design 及定制主体配置 (将强制启用 less) */
  | 'useAntd'

/** 集成 css 预处理器 */
export type StyleHandlers = 'less' | 'scss' | 'none'

/** 采集用户配置 */
export interface CreateConfig {
  /** 项目名称 */
  PROJECT_NAME: string
  /** 项目标题 */
  PROJECT_TITLE: string
  /** 预装功能 */
  preInstalls: PreInstalls[]
  /** 集成 css 预处理器 */
  styleHandler: StyleHandlers
}

/** 映射到模板中的配置 */
export interface TemplateConfig extends CreateConfig {
  /** cli 包名 */
  CLI_PACKAGE_NAME: string
}

checkBaseInfo().then(() => {
  getCreateConfig()
})

/** 必填项验证 */
function requiredValidate(input: string) {
  if ([undefined, null, ''].includes(input)) {
    return '你必须必填写!'
  } else {
    return true
  }
}

/** 询问表单 */
async function getCreateConfig() {
  return inquirer
    .prompt<CreateConfig>([
      { type: 'input', name: 'PROJECT_NAME', message: '项目名称', validate: requiredValidate },
      {
        type: 'input',
        name: 'PROJECT_TITLE',
        message: '项目标题',
        default: (e: CreateConfig) => e.PROJECT_NAME,
        validate: requiredValidate,
      },
      {
        type: 'checkbox',
        name: 'preInstalls',
        message: '选择需要预装的功能',
        default: ['useRedux', 'useCentralizedAPI', 'useGlobalTools', 'useReactRouter'] as PreInstalls[],
        choices: [
          { value: 'useRedux', name: '集成 Redux ($store)' },
          { value: 'useCentralizedAPI', name: '启用集中管理网络请求 ($api)' },
          { value: 'useGlobalTools', name: '启用全局工具模块 ($tools)' },
          { value: 'useReactRouter', name: '集成 react-router 及相关路由模块' },
          { value: 'useAntd', name: '集成 Ant-Design 及定制主体配置 (将强制启用 less)' },
        ] as {
          value: PreInstalls
          name: string
        }[],
      },
      {
        type: 'list',
        name: 'styleHandler',
        message: '选择 css 预处理器',
        default: 'none' as StyleHandlers,
        choices: [{ value: 'less' }, { value: 'scss' }, { value: 'none' }] as { value: StyleHandlers }[],
        when: (e) => !e.preInstalls.includes('useAntd'),
      },
    ])
    .then((res) => {
      if (res.preInstalls.includes('useAntd')) {
        res.styleHandler = 'less'
      }
      createTemplate(res)
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

/** 创建模板项目 */
function createTemplate(conf: CreateConfig) {
  console.log(conf)
}
