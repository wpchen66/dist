'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

exports.addUser = addUser;
exports.queryUser = queryUser;
exports.addGoods = addGoods;
exports.getGoodsList = getGoodsList;
exports.updataGoods = updataGoods;

var _collection = require('./collection.js');

var _mongoose = require('mongoose');

var _config = require('./config.js');

var select = _interopRequireWildcard(_config);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _util = require('../util/util.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var uuid = require('uuid/v4');
var serverUrl = '127.0.0.1:3000';

function addUser(user, callback) {
  var username = user.username,
      mobile = user.mobile,
      nickname = user.nickname,
      password = user.password;

  console.log(username, mobile);
  _collection.userModel.findOne({
    $or: [{
      username: username
    }, {
      mobile: mobile
    }]
  }, function (err, res) {
    if (err) return console.error(err);
    if (res && res.username == username) {
      var obj = {
        success: false,
        message: '该用户已存在，请重新注册'
      };
      callback(obj);
      return;
    } else if (res && res.mobile == mobile) {
      console.log(res.mobile);
      var _obj = {
        success: false,
        message: '该手机号已存在，请重新注册'
      };
      callback(_obj);
      return;
    }

    var userInfo = new _collection.userModel({
      username: username,
      mobile: mobile,
      password: password,
      nickname: nickname
    });
    userInfo.save(function (err, res) {
      if (err) return console.error(err);
      var obj = {
        success: true,
        message: '注册成功'
      };
      callback(obj);
    });

    // let userInfo = new userModel({
    //       username,
    //       mobile,
    //       password,
    //       nickname
    //     })
    //     userInfo.save(function (err, res) {
    //       if (err) return console.error(err)
    //       let obj = {
    //         success: true,
    //         message: '注册成功'
    //       }
    //       callback(obj)
    //     })
    // if (res) {
    //   let userInfo = new userModel({
    //     username,
    //     mobile,
    //     password,
    //     nickname
    //   })
    //   userInfo.save(function (err, res) {
    //     if (err) return console.error(err)
    //     let obj = {
    //       success: true,
    //       message: '注册成功'
    //     }
    //     callback(obj)
    //   })
    // } else {
    //   let obj = {
    //     success: false,
    //     message: '该用户已存在，请重新注册'
    //   }
    //   callback(obj)
    // }
  });
}

function queryUser(user, callback) {
  var username = user.username,
      password = user.password,
      mobile = user.mobile;


  _collection.userModel.findOne({
    $or: [{
      username: username
    }, {
      mobile: mobile
    }],
    password: password
  }, function (err, res) {
    if (err) {
      console.error(err);
      return;
    }
    if (res) {
      var token = _jsonwebtoken2.default.sign({
        userId: res.id
      }, select.secret, {
        expiresIn: 3600
      });
      res.token = token;
      res.save(function (err) {
        if (err) {
          callback({
            success: false,
            message: 'token 发生错误'
          });
        } else {
          var obj = {
            success: true,
            message: '登陆成功',
            nickname: res.nickname,
            token: 'Bearer ' + token
          };
          callback(obj, token);
        }
      });
    } else {
      var obj = {
        success: false,
        message: '账户或密码错误，请重新登陆'
      };
      callback(obj);
    }
  });
}
function addGoods(req, callback) {
  var goods = {};
  var date = new Date();
  var form = new formidable.IncomingForm();
  var imgPath = path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate());
  var imgList = [];
  (0, _util.createDir)();
  // form.uploadDir = imgPath
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.error(err);
    }
    goods = JSON.parse(fields.form);
    (0, _values2.default)(files).forEach(function (item, index) {
      // console.log(item)
      fs.readFile(item.path, function (err, data) {
        if (err) {
          console.error(err);
          return;
        }
        var id = uuid();
        var type = item.type.split('/')[1];
        fs.writeFile(imgPath + '/' + id + '.' + type, data, function (err, data) {
          if (err) {
            console.error(err);
          }
          var imgUrl = 'http://' + serverUrl + '/static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + '/' + id + '.' + type;
          imgList.push(imgUrl);
          if (index === (0, _values2.default)(files).length - 1) {
            var _date = new Date();
            var year = _date.getFullYear() + '-' + (_date.getMonth() + 1) + '-' + _date.getDate();
            var time = _date.getHours() + ':' + _date.getMinutes() + ':' + _date.getSeconds();
            var goodsInfo = new _collection.goodsModel({
              time: time,
              date: year,
              name: goods.name,
              des: goods.des,
              price: goods.price,
              number: goods.number,
              pic: imgList
            });

            goodsInfo.save(function (err, data) {
              if (err) {
                console.log(err);
                return;
              }
              console.log(data, '商品保存成功');
            });
          }
        });
      });
    });

    // console.log(files)
    // let b = JSON.parse(files.upload)
    // console.log(typeof files)
    // files.upload.forEach((item, index)=> {
    //   console.log(item)
    // })
  });
}
function getGoodsList(callback) {
  _collection.goodsModel.find(function (err, res) {
    var obj = {
      success: true,
      data: res
    };
    callback(obj);
  });
}
function updataGoods(req, callback) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (err) {
      console.error(err);
    }
    var goodsInfo = JSON.parse(fields.form);
    var id = goodsInfo.id;
    var name = goodsInfo.name;
    var des = goodsInfo.des;
    var price = goodsInfo.price;
    var number = goodsInfo.number;
    _collection.goodsModel.findOne({ _id: id }, function (err, data) {
      if (err) {
        console.error(err);
      }
      console.log(data, 1231223);
      var arr = [];
      data['pic'].forEach(function (item, index) {
        if (!goodsInfo.removeList.indexOf(item)) {
          arr.push(item);
        }
      });
      data.name = name;
      data.price = price;
      data.des = des;
      data.number = number;
      data.pic = arr;
      (0, _util.createDir)();

      data.save(function (err, data) {
        if (err) {
          console.error(err);
        }
        console.log(data, '商品更新成功');
      });
    });
  });
}