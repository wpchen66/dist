'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;
exports.login = login;
exports.getGoodsList = getGoodsList;
exports.addGoods = addGoods;
exports.updataGoods = updataGoods;

var _collection = require('./collection.js');

var _mongoose = require('mongoose');

var _util = require('../util/util.js');

var _operation = require('./operation.js');

var db = _interopRequireWildcard(_operation);

var _config = require('./config.js');

var select = _interopRequireWildcard(_config);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var jwt = require('jsonwebtoken');
function register(req, res) {
  var username = req.body.username;
  var mobile = req.body.mobile;
  var password = req.body.password;
  var nickname = req.body.nickname;
  function callback(result, token) {
    if (token) {
      req.setHeader();
    }
    return res.send(result);
  }
  db.addUser({ username: username, mobile: mobile, password: password, nickname: nickname }, callback);
}

function login(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var mobile = req.body.username;
  function callback(result) {
    res.send(result);
    return;
  }
  db.queryUser({ username: username, password: password, mobile: mobile }, callback);
}
//node.js会把请求头的属性全部识别成小写
function getGoodsList(req, res) {
  var token = req.headers.authorization.split(' ')[1];
  (0, _util.verifyjwt)(token, select.secret, function (obj) {
    console.log(obj);
    if (obj.time) {
      res.send({
        success: false,
        token: 0,
        messgae: obj.messgae
      });
    } else {
      var callback = function callback(data) {
        res.send(data);
      };

      var userId = obj.payload.userId;

      db.getGoodsList(callback);
    }
  });
}
function addGoods(req, res) {
  var callback = function callback() {};
  db.addGoods(req, callback);
}
function updataGoods(req, res) {
  console.log(req.body);
  var callback = function callback() {};
  db.updataGoods(req, callback);
}