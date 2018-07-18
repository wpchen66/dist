const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
export function verifyjwt(token, code, callback) {
  jwt.verify(token, code, function (err, success) {
    if (err) {

      let obj = {
        time: true,
        message: 'token超时'
      }
      callback(obj)
      console.error(err)
      return
    }
    let decode = jwt.decode(token, {
      complete: true
    })
    callback(decode)
    return
  })
}
export function createDir() {
  fs.exists(path.resolve('static/images/' + date.getFullYear()), function (exists) {
    if (!exists) {
      fs.mkdir(path.resolve('static/images/' + date.getFullYear()), function (err, data) {
        if (err) {
          console.error(err)
        }
        console.log('年目录创建成功')
      })
    }
  })
  fs.exists(path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1)), function (exists) {
    if (!exists) {
      fs.mkdir(path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1)), function (err, data) {
        if (err) {
          console.error(err)
        }
        console.log('月目录创建成功')
      })
    }
  })
  fs.exists(path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()), function (exists) {
    if (!exists) {
      fs.mkdir(path.resolve('static/images/' + date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()), function (err, data) {
        if (err) {
          console.error(err)
        }
        console.log('日目录创建成功')
      })
    }
  })
}