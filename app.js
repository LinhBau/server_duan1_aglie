var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require("express-session");
require("dotenv").config();
const bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "sfd01sd4f56sd4f6dsfsd4f65sd4fsdfsfsf",
  resave: false,
  saveUninitialized: true
}))

app.use("/", require("./routes/home"));
app.use("/sp", require("./routes/sanpham"));
app.use("/donhang", require("./routes/donhang"));
app.use("/users", require("./routes/user"));
app.use("/api/user", require("./routes/api/user.router"));
app.use("/api/sanpham", require("./routes/api/sanpham.router"));
app.use("/api/donhang", require("./routes/api/donhang.router"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if(req.originalUrl.indexOf("/api") == 0){
    res.json({
      status: 0,
      msg: err.message
    })
  }else{
    res.render('error');
  }
});

module.exports = app;
