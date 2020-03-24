import path from 'path'
import { ReactTsConfig } from '../types'

const config: Partial<ReactTsConfig> = {
  projectName: 'demo',

  htmlTemplate: path.resolve(process.cwd(), './demo/index.html'),
  source: path.resolve(process.cwd(), './demo'),
}

export default config
