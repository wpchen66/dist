'use strict';

var _index = require('../router/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var app = require('express')();
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');


mongoose.connect('mongodb://localhost/eleme');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connetcion error;'));
db.once('open', function () {
  console.log('we are connection');
});
app.set('views', './views');
app.use('/static', express.static("static"));
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
var option = {
  target: 'http://127.0.0.1:3000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
};
var proxyConfig = proxy(option);
app.use('/api', proxyConfig);
app.use('/', _index2.default);
var server = app.listen(3000, function () {
  console.log('server alreay start');
});