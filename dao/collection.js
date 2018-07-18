let mogoose = require('mongoose')
const bcrypt = require('bcrypt');
let userSchema = new mogoose.Schema({
  username: [String, Number],
  token: String,
  mobile: Number,
  nickname: [String, Number],
  password: [String, Number],
  money: {type: Number, default: 0}
})
//密码加密  除了用户谁都不知道密码
//  userSchema.pre('save', function (next) {
//    let _this = this,
//    if(this.isModified('password') || this.isNew){
//      bcrypt.genSalt(10, function (err, salt) {
//        if(err) return next(err)
//        bcrypt.hash(_this.password, salt, function (err, hash) {
//          if(err) return next(err)
//          _this.password = hash
//          next()
//        })
//      })
//    }
//  })
// userSchema.methods.comparePassword = function (passw, cb) {
//   bcrypt.compare(passw, this.password, (err, isMatch) => {
//     if(err) return cb(err)
//     cb(null, isMatch)
//   })
// }

let goodsSchema = new mogoose.Schema({
  date: {type: String},
  time: {type: String},
  name: {type: String},
  number: {type: Number, default: 0},
  price: {type: Number, default: 0},
  des: {type: String},
  pic: {type: [String, Array]}
})

export const userModel = mogoose.model('userInfo', userSchema)
export const goodsModel = mogoose.model('goodsInfo', goodsSchema)

