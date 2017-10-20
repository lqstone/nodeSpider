var express = require('express');
var router = express.Router();
/* GET home page. */


router.get('/', function(req, res, next) {
    if(req.session.userName){
        res.redirect('/chat')
    }else{
        res.render('index', { title: "登录" });
    }
});



module.exports = router;
