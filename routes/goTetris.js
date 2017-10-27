var express = require('express');
var router = express.Router();
var User = require('../utils/config.js')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('loginTetris', { title: "俄罗斯方块登录" });
});

module.exports = router;
