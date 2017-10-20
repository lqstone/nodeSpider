var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.userName){
        res.render('chat', { title: "聊天室", userName: req.session.userName });
    }else{
        res.redirect('/')
    }

})
module.exports = router;