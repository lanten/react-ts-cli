# react-ts-cli


## 命令行工具

| 命令           | 说明         | 参数   |
| -------------- | ------------ | ------ |
| react-ts-dev   | 启动本地服务 | ...env |
| react-ts-build | 执行编译脚本 | ...env |

## 配置

创建 `config/index.ts` 文件

chestnut:
```ts
import path from 'path'
import { ReactTsConfigPartial } from '@sbc-fe/react-ts-cli'

const rootPath = process.cwd()

const projectName = 'new-project'
const projectTitle = 'New Project'

const config: ReactTsConfigPartial = {
  projectName,
  projectTitle,
  port: 18081,
  htmlTemplate: path.resolve(rootPath, 'src/index.html'),
  devPublicPath: '',

  entry: {
    app: path.resolve(rootPath, 'src/index.tsx'),
  },
}

export default config

```