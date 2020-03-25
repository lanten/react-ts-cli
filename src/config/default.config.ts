import path from 'path'
import { ReactTsConfig, ReactTsConfigPartial } from '@/types'

const rootPath = process.cwd()

export function assignDefaultConfig(userConfig: ReactTsConfigPartial): ReactTsConfig {
  const { projectName = 'new-project', projectTitle = 'New Project' } = userConfig

  return {
    projectName,
    projectTitle,
    port: 18081,
    entry: path.resolve(rootPath, 'src/index.ts'),
    htmlTemplate: path.resolve(rootPath, 'src/index.html'),
    dist: path.resolve(rootPath, 'dist'),
    host: '0.0.0.0',
    devPublicPath: '/',
    htmlConfig: {
      title: `${projectTitle}`,
      lang: 'zh-CN',
      keywords: `${projectTitle}`,
    },
    alias: {
      '@': path.resolve(rootPath, 'src'),
    },

    provide: {},

    proxy: {},

    COMMON_ENV: {
      PROJECT_NAME: projectName,
      PROJECT_TITLE: projectTitle,
      API_BASE: '',
    },

    postcssOptions: {
      ident: 'postcss',
      plugins: [require('autoprefixer')()],
    },

    env: {
      mock: {
        publicPath: '',
        variables: {},
      },

      dev: {
        publicPath: '',
        variables: {},
      },

      daily: {
        publicPath: '',
        variables: {},
      },

      gray: {
        publicPath: '',
        variables: {},
      },

      prod: {
        publicPath: '',
        variables: {},
      },
    },
  }
}
