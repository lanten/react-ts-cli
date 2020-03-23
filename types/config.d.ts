declare interface ReactTsConfig {
  /** 项目名称 = url 中的项目前缀 */
  projectName: string
  /** 项目标题 */
  projectTitle: string
  /** 本地服务端口 */
  port: number
  /** 业务代码主目录 */
  source: string
  /** html 模板 */
  template: string
  /** 编译输出目录 */
  dist: string
  /** 本地 host, 需要手动修改 */
  host: string
  /** dev-server 中使用的 publicPath */
  devPublicPath: string
}
