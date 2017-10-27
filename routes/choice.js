var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('choice', {title: "选择"});
});

module.exports = router;