'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _route = require('../dao/route');

var route = _interopRequireWildcard(_route);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.redirect('index.html');
});
router.post('/register', route.register);
router.post('/login', route.login);
router.post('/addGoods', route.addGoods);
router.get('/getGoodsList', route.getGoodsList);
router.post('/updataGoods', route.updataGoods);
exports.default = router;