## tree shaking
+ 只引入需要的代码片段, 引入没有使用不会打包
+ 只支持 es module 的导入
+ `mode === development时:`使用tree-shaking`package.json`里`sideEffects`不对某些模块例如`@babel/polly-fill`或者`css文件(*.css)`进行 `tree-shaking`, `webpack.config.js`里添加optimization
+ `mode === production`: 不需要在`webpack.config.js`里进行配置