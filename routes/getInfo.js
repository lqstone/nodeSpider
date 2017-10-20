var express = require('express');
var router = express.Router();
var User = require('../utils/config.js')

/* GET users listing. */
router.post('/', function(req, res, next) {
    req.session.userName = req.body.name;
    res.json({error: 0});
});

module.exports = router;
