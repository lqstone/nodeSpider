var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var choice = require('./routes/choice');
var index = require('./routes/index');
var getInfo = require('./routes/getInfo');
var getInfoTetris = require('./routes/getInfoTetris');
var chat = require('./routes/chat');
var tetris = require('./routes/tetris');
var goTetris = require('./routes/goTetris');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: '12345',
    name: 'chatName',
    cookie: { maxAge: 1000*60*60*60*12 },
    resave: false,
    saveUninitialized: true,
}))
app.use('/', choice);
app.use('/goChat', index);
app.use('/getInfo', getInfo);
app.use('/getInfoTetris', getInfoTetris);
app.use('/goTetris', goTetris);
app.use('/chat', chat);
app.use('/tetris', tetris);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
