const express = require('express')
const app = require('express')();
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const proxy  = require('http-proxy-middleware')
import router from '../router/index';

mongoose.connect('mongodb://localhost/eleme');
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connetcion error;'));
db.once('open', function () {
  console.log('we are connection')
})
app.set('views', './views')
app.use('/static',express.static("static"));
app.use(express.static(path.resolve(__dirname,'../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}))
const option = {
  target: 'http://127.0.0.1:3000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}
const proxyConfig = proxy(option)
app.use('/api', proxyConfig)
app.use('/', router)
let server = app.listen(3000, function () {
  console.log('server alreay start')
})