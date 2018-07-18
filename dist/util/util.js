'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyjwt = verifyjwt;
exports.createDir = createDir;
var jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');
function verifyjwt(token, code, callback) {
  jwt.verify(token, code, function (err, success) {
    if (err) {

      var obj = {
        time: true,
        message: 'token超时'
      };
      callback(obj);
      console.error(err);
      return;
    }
    var decode = jwt.decode(token, {
      complete: true
    });
    callback(decode);
    return;
  });
}
function createDir() {
  fs.exists(path.resolve('static/images/' + date.getFullYear()), function (exists) {
    if (!exists) {
      fs.mkdir(path.resolve('static/images/' + date.getFullYear()), function (err, data) {
        if (err) {
          console.error(err);
        }
        console.log('年目录创建成功');
      });
    }
  });
  fs.exists(path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1)), function (exists) {
    if (!exists) {
      fs.mkdir(path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1)), function (err, data) {
        if (err) {
          console.error(err);
        }
        console.log('月目录创建成功');
      });
    }
  });
  fs.exists(path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()), function (exists) {
    if (!exists) {
      fs.mkdir(path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()), function (err, data) {
        if (err) {
          console.error(err);
        }
        console.log('日目录创建成功');
      });
    }
  });
}