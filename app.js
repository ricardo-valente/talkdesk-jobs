// var express = require('express');
// var path = require('path');
// var hbs = require('express-handlebars');
// var app = express();
// var index = require('./routes/index');
//
// // set the port of our application
// // process.env.PORT lets the port be set by Heroku
// var port = process.env.PORT || 8080;
//
// // set the view engine to ejs
// app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
// app.set('view engine', 'hbs');
//
// // make express look in the public directory for assets (css/js/img)
// app.use(express.static(__dirname + '/public'));
//
// // set the home page route
// app.get('/', function(req, res) {
//
//     // ejs render automatically looks in the views folder
//     res.render('index');
// });
//
// app.listen(port, function() {
//     console.log('Our app is running on http://localhost:' + port);
// });

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('express-handlebars');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// var port = process.env.PORT || 8080;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use('/', index);
app.use('/users', users);

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

// app.listen(port, function() {
//   console.log('Our app is running on http://localhost:' + port);
// });

module.exports = app;
