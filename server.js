const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const config = require('./webpack.config')
const complier = webpack(config)

const server = express()

server.use(webpackDevMiddleware(complier, {
  publicPath: config.output.publicPath
}));

server.listen(3000, ()=>{
  console.log('server is running..')
})