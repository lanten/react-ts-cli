import inquirer from 'inquirer'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs'
import glob from 'glob'
import { exConsole, syncExec, clearDir, replaceTemplateVars } from '../utils'

const packageJSON = require(path.resolve(__dirname, '../../package.json'))

/** 预装功能 */
export type PreInstalls =
  /** 是否集成 Redux ($store) */
  | 'USE_REDUX'
  /** 是否启用集中管理 HTTP 请求 ($api) */
  | 'USE_CENTRALIZED_API'
  /** 是否启用全局工具模块 ($tools) */
  | 'USE_GLOBAL_TOOLS'
  /** 是否集成 react-router 及相关路由模块 */
  | 'USE_REACT_ROUTER'
  /** 是否集成 Ant-Design 及定制主体配置 (将强制启用 less) */
  | 'USE_ANTD'

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
export interface TemplateConfig extends Pick<CreateConfig, 'PROJECT_NAME' | 'PROJECT_TITLE'> {
  /** cli 包名 */
  CLI_PACKAGE_NAME: string
  /** 是否集成 Redux ($store) */
  USE_REDUX?: 0 | 1
  /** 是否启用集中管理 HTTP 请求 ($api) */
  USE_CENTRALIZED_API?: 0 | 1
  /** 是否启用全局工具模块 ($tools) */
  USE_GLOBAL_TOOLS?: 0 | 1
  /** 是否集成 react-router 及相关路由模块 */
  USE_REACT_ROUTER?: 0 | 1
  /** 是否集成 Ant-Design 及定制主体配置 (将强制启用 less) */
  USE_ANTD?: 0 | 1
  /** 使用 less */
  USE_LESS?: 0 | 1
  /** 使用 scss */
  USE_SCSS?: 0 | 1
}

export interface TemplateConfigJSON {
  includes?: string[]
}

// -------------------------------------------------------------------------

// // DEBUG
// checkBaseInfo()
//   .then(() => {
//     getCreateConfig()
//   })
//   .catch((message) => {
//     exConsole.warn(message || '配置异常!')
//   })

// test // DEBUG
createTemplate({
  CLI_PACKAGE_NAME: '@sbc-fe/react-ts-cli',
  PROJECT_NAME: 'asd',
  PROJECT_TITLE: 'asd',
  USE_REDUX: 1,
  USE_CENTRALIZED_API: 1,
  USE_GLOBAL_TOOLS: 1,
  USE_REACT_ROUTER: 1,
  USE_ANTD: 1,
  USE_LESS: 1,
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
        default: ['USE_REDUX', 'USE_CENTRALIZED_API', 'USE_GLOBAL_TOOLS', 'USE_REACT_ROUTER'] as PreInstalls[],
        choices: [
          { value: 'USE_REDUX', name: '集成 Redux ($store)' },
          { value: 'USE_CENTRALIZED_API', name: '启用集中管理 HTTP 请求 ($api)' },
          { value: 'USE_GLOBAL_TOOLS', name: '启用全局工具模块 ($tools)' },
          { value: 'USE_REACT_ROUTER', name: '集成 react-router 及相关路由模块' },
          { value: 'USE_ANTD', name: '集成 Ant-Design 及定制主体配置 (将强制启用 less)' },
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
        when: (e) => !e.preInstalls.includes('USE_ANTD'),
      },
    ])
    .then((res) => {
      if (res.preInstalls.includes('USE_ANTD')) {
        res.styleHandler = 'less'
      }

      const templateConfig: TemplateConfig = {
        CLI_PACKAGE_NAME: packageJSON.name,
        PROJECT_NAME: res.PROJECT_NAME,
        PROJECT_TITLE: res.PROJECT_TITLE,
      }

      res.preInstalls.forEach((v) => {
        templateConfig[v] = 1
      })

      switch (res.styleHandler) {
        case 'less':
          templateConfig.USE_LESS = 1
          break

        case 'scss':
          templateConfig.USE_SCSS = 1
          break
      }

      createTemplate(templateConfig)
      return res
    })
    .catch((error) => {
      console.log(error)
    })
}

/** 确认基本信息 */
async function checkBaseInfo() {
  const renderText = (text: string, color = '#FE8D00') => chalk.hex(color)(text)
  const splitLine = chalk.gray('-'.repeat(50))

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

/** 获取创建目录 */
async function getCreatePath(name: string): Promise<string> {
  const bash = process.platform == 'win32' ? 'chdir' : 'pwd'
  const runPath = syncExec({ bash }).trim()

  if (!fs.existsSync(runPath)) {
    exConsole.error('获取运行路径失败')
    process.exit()
  }

  const createPath = path.resolve(runPath, name)

  if (fs.existsSync(createPath)) {
    await inquirer
      .prompt({
        name: 'next',
        type: 'confirm',
        message: `${chalk.red(`文件夹: [${name}] 已存在`)} 确认清空目录后继续?`,
      })
      .then((val) => {
        if (val && val.next) {
          console.log(createPath)
          clearDir(createPath, true, false, true)
          return Promise.resolve(createPath)
        } else {
          // return Promise.reject(false)
          process.exit()
        }
      })
  }

  return Promise.resolve(createPath)
}

/** 创建模板项目 */
async function createTemplate(conf: TemplateConfig) {
  const createPath = await getCreatePath(conf.PROJECT_NAME)
  const templatePath = path.resolve(__dirname, '../../react-ts-template')

  if (!templatePath) return exConsole.warn('[clearDir]: Empty Path!')

  // fs.mkdirSync(createPath) // DEBUG

  const templateConfigJSON = require(path.resolve(templatePath, 'template.config.json'))
  const filePaths = handleTemplateFiles(templatePath, templateConfigJSON.includes, templateConfigJSON.ignore)
  console.log(filePaths)
  filePaths.forEach((v) => copyTemplateFile(path.resolve(templatePath, v), path.resolve(createPath, v)))
}

/**
 * 解析需要复制的模板文件
 * @param pathStr
 * @param includes
 */
function handleTemplateFiles(
  pathStr: string,
  includes: TemplateConfigJSON['includes'] = ['**/*'],
  ignore?: string | string[]
): string[] {
  const allPaths: string[] = []

  includes.forEach((includePath) => {
    let includePathH = includePath

    try {
      if (fs.statSync(path.resolve(pathStr, includePath)).isDirectory()) {
        includePathH = `${includePath}/**/*`
        allPaths.push(includePath)
      }
    } catch (error) {}

    const files = glob.sync(includePathH, { cwd: pathStr, ignore })

    allPaths.push(...files)
  })

  return allPaths
}

/**
 * 复制模板文件
 * @param filePath
 * @param newPath
 */
function copyTemplateFile(filePath: string, newPath: string) {
  if (fs.statSync(filePath).isDirectory()) {
    fs.mkdirSync(newPath, { recursive: true })
    exConsole.info(`[Create Dir] ${newPath}`)
  } else {
    const fileData = fs.readFileSync(filePath, { encoding: 'utf-8' })

    fs.writeFile(newPath, replaceTemplateVars(fileData), { encoding: 'utf-8' }, (err) => {
      if (err) {
        exConsole.error(`[Create File] ${newPath}`)
        exConsole.error(err)
      } else {
        exConsole.info(`[Create File] ${newPath}`)
      }
    })
  }
}
