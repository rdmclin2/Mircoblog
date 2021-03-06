var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var settings = require('./settings');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');


var routes = require('./routes/index');

var dburl = settings.host+":"+settings.port+"/"+settings.db;
//console.log(dburl);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: settings.cookieSecret,
  store: new MongoStore({
    // url : dburl
    db : settings.db
  }),
  resave: true,
  saveUninitialized:true
}));

app.use(function (req,res,next) {
  console.log("app.usr local");
    res.locals.user = req.session.user;

    var err = req.flash('error');
    res.locals.error = err.length ? err: null;

    var success = req.flash('success');
    res.locals.success = success.length ? success : null;

    next();
});


app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
