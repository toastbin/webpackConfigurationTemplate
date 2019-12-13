const HtmlWebpackPlugin = require("html-webpack-plugin");
// 坑儿
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
module.exports = {
  mode: "development",
  // sourceMap 是一个映射关系  打包后的文件与源文件的映射关系
  // 最佳实践 : 提示错误全 代码打包快
  devtool: "cheap-moudle-eval-source-map",
  // 线上模式 即 produ,ction mode
  // devtool: 'cheap-module-source-map'
  devServer: {
    contentBase: "./dist",
    open: true,
    // 模拟请求代理 配置proxy
    proxy: {
      "/api": "http://localhost:3000"
    },
    port: 3000,
    // 热更新 1
    hot: true,
    hotOnly: true
  },
  entry: {
    // 打包多个文件
    main: "./src/index.js",
    // sub: './src/index.js',
    es6: "./src/es6.js"
  },
  output: {
    // 占位符输出
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: "/"
  },
  optimization:{
    // 按需打包 tree-shaking development模式下
    usedExports: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"),
      filename: "index.html"
    }),
    new CleanWebpackPlugin(),
    // 热更新插件 2
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      /* {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            // 使用图片原本的名字进行打包 placeholder 占位符
            name: "[name].[ext]",
            outputPath: 'images/'
          }
        }
      }, */
      {
        test: /\.(jpg|png|gif)$/,
        // url-loader 将图片转换成 base64 的形式
        use: {
          loader: "url-loader",
          // 小图片 打包成 base64 很合适 1~2kb
          options: {
            name: "[name].[ext]",
            outputPath: "images/",
            // 小于 2048个字节 即 小于 2kb 转换成base64
            // 大于 会打包到配置到的目录里
            limit: 2048,
            context: "toast"
          }
        }
      },
      {
        test: /\.css$/,
        // css-loader 分析css文件间的依赖
        // style-loader 将分析完的css代码 挂载到 html的head里
        // 这里的loader 是有先后顺序的 执行顺序从右到左 从后往前
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        // use: [
        //   "style-loader",
        //   "css-loader",
        //   "sass-loader",
        //   // 自动添加 浏览器厂商前缀的loader
        //   // 使用 autoprefixer 插件
        //   'postcss-loader'
        // ]
        use: [
          "style-loader",
          // 保证在 scss 文件里面引入其他 scss文件 也会依次走 postcss-loader 和 sass-loader
          {
            loader: "css-loader",
            options: {
              importLoaders: 2
              // css模块化机制 有自己的作用域 不再全都是全局样式了
              // modules: true
            }
          },
          "sass-loader",
          "postcss-loader"
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "font/"
          }
        }
      },
      // 添加 babel 转换 ES6 代码规则
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            // 不能转换 promise 等高级语法
            ["@babel/preset-env", {
              // 动态加入 不是一股脑全部打包进去
              useBuiltIns: 'usage',
              targets: {
                ie: '6'
              }
            }],
          ]
        }
      }
    ]
  }
};
