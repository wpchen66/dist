import {userModel} from './collection.js'
import { Model } from 'mongoose';
import {verifyjwt} from '../util/util.js'
import * as db from './operation.js'
import * as select from './config.js'
const jwt = require('jsonwebtoken')
export function register(req, res) {
  const username = req.body.username
  const mobile = req.body.mobile
  const password = req.body.password
  const nickname = req.body.nickname
  function callback(result, token) {
    if(token){
      req.setHeader()
    }
   return res.send(result)
  }
  db.addUser({username, mobile, password, nickname}, callback)
}

export function login(req, res) {
  const username = req.body.username
  const password = req.body.password
  const mobile = req.body.username
  function callback (result) {
    res.send(result)
    return 
  }
  db.queryUser({username, password, mobile}, callback)
}
//node.js会把请求头的属性全部识别成小写
export function getGoodsList(req, res) {
  let token = req.headers.authorization.split(' ')[1]
  verifyjwt(token, select.secret, function (obj) {
    console.log(obj)
    if (obj.time){
      res.send({
        success: false,
        token: 0,
        messgae: obj.messgae
      })
    }else{
      let userId = obj.payload.userId
      function callback (data) {
        res.send(data)
      }
      db.getGoodsList(callback)
    }
  })
}
export function addGoods (req, res) {
  let callback = function () {

  }
  db.addGoods(req, callback)
}
export function updataGoods(req, res){
  console.log(req.body)
  let callback =  () => {

  }
  db.updataGoods(req,callback)
}