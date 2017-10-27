var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.tetrisName){
        console.log("--------玩家--------" + req.session.tetrisName + "--------------进来了-----------")
        res.render('tetris', { title: "俄罗斯方块", tetrisName: req.session.tetrisName });
    }else{
        res.redirect('/')
    }
})
module.exports = router;