# react-ts-cli


### 命令行工具

| 命令           | 说明         | 参数   |
| -------------- | ------------ | ------ |
| react-ts-dev   | 启动本地服务 | ...env |
| react-ts-build | 执行编译脚本 | ...env |


### 配置

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

创建 `config/tsconfig.json` 文件

chestnut:
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "sourceMap": false,
    "strict": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "suppressImplicitAnyIndexErrors": true,
    "types": [
      "node"
    ],
    "lib": [
      "esnext",
      "scripthost",
      "es5"
    ]
  },
  "exclude": [
    "node_modules",
  ]
}
```

项目更目录需要添加 `tsconfig.json` 文件.

此外,请按需添加 `.eslintignore`, `.eslintrc.js`, `.browserslistrc` 文件.

### 使用

启动 dev-server:
```
react-ts-dev
```

编译:
```
react-ts-build
```

脚本将自动读取 `config` 下的配置文件


整合了 `cross-env`, 可以直接添加环境变量:
```
react-ts-dev MY_ENV=xxx
react-ts-build MY_ENV=xxx
```

---