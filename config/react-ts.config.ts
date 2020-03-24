import path from 'path'
import { ReactTsConfig } from '../types'

const config: Partial<ReactTsConfig> = {
  projectName: 'demo',

  htmlTemplate: path.resolve(process.cwd(), 'demo/index.html'),
  entry: {
    app: path.resolve(process.cwd(), 'demo/index.ts'),
  },
}

export default config
