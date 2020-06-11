import webpack, { Configuration } from 'webpack'
import Webpackbar from 'webpackbar'
import htmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'
import tsImportPluginFactory from 'ts-import-plugin'

import { reactTsConfig } from './config'

const {
  dist,
  htmlTemplate,
  alias,
  provide,
  env,
  htmlConfig,
  COMMON_ENV,
  devServerOptions,
  entry,
  afterWebpackConfig,
  postcssOptions,
  terserOptions,
  htmlOptions,
} = reactTsConfig
const { NODE_ENV, BUILD_ENV = 'dev' } = process.env
const ENV_CONFIG = env[BUILD_ENV]

const tsLoader: webpack.RuleSetUseItem = {
  loader: 'ts-loader',
  options: {
    transpileOnly: true,
    getCustomTransformers: () => ({
      before: [tsImportPluginFactory(/** options */)],
    }),
    compilerOptions: {
      module: 'es2015',
    },
  },
}

const styleLoader = [{ loader: 'css-loader' }, { loader: 'postcss-loader', options: postcssOptions }]
if (NODE_ENV === 'development') {
  styleLoader.unshift({ loader: 'css-hot-loader' }, { loader: 'style-loader' })
} else {
  styleLoader.unshift({ loader: MiniCssExtractPlugin.loader })
}

let webpackConfig: Configuration = {
  mode: NODE_ENV as 'development' | 'production',
  target: 'web',

  entry,

  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  output: {
    publicPath: NODE_ENV === 'development' ? devServerOptions?.publicPath : ENV_CONFIG.publicPath,
    path: dist,
    filename: 'js/[name].[hash:7].js',
    chunkFilename: 'js/[name].[chunkhash:7].js',
  },

  module: {
    rules: [
      {
        test: /(?<!\.d)\.tsx?$/,
        loader: [tsLoader, 'eslint-loader'],
      },
      {
        test: /\.jsx?$/,
        loader: [tsLoader, 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(less)$/,
        use: [
          ...styleLoader,
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          ...styleLoader,
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: styleLoader,
      },
      {
        test: /\.(png|jpe?g|gif|svg|swf|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets',
          esModule: false,
          name: '[name]-[hash:7].[ext]',
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'bundle',
    },
    minimizer: [],
  },

  plugins: [
    new webpack.DefinePlugin(
      ((): { [key: string]: any } => {
        const defines = {}
        const variables = Object.assign({}, COMMON_ENV, ENV_CONFIG.variables)
        Object.keys(variables).forEach((key) => {
          const val = variables[key]
          defines[`process.env.${key}`] = typeof val === 'string' ? `"${val}"` : JSON.stringify(val)
        })
        return defines
      })()
    ),
    new Webpackbar(),
    new htmlWebpackPlugin({
      template: htmlTemplate,
      filename: 'index.html',
      templateParameters: htmlConfig,
      ...htmlOptions,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:7].css',
      chunkFilename: 'css/[name].[chunkhash:7].css',
    }),
    new webpack.ProvidePlugin(provide),
  ] as webpack.Plugin[],
}

// 开发环境配置
if (NODE_ENV === 'development') {
  webpackConfig.devtool = 'source-map'

  webpackConfig.plugins?.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin())

  // 生产环境配置
} else if (NODE_ENV === 'production') {
  webpackConfig.plugins?.push(new OptimizeCSSAssetsPlugin() as any)

  webpackConfig.optimization?.minimizer?.push(
    // https://github.com/terser-js/terser
    new TerserPlugin({
      terserOptions: {
        compress: {
          warnings: true,
          /* eslint-disable */
          drop_console: true,
        },
      },
      extractComments: false, // 不提取任何注释
      ...terserOptions,
    })
  )
}

if (afterWebpackConfig) {
  webpackConfig = afterWebpackConfig(webpackConfig)
}

export default webpackConfig
