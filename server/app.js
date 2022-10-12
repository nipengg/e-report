require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const corsOptions = {
  origin: process.env.CLIENT_HOSTNAME,
  credentials: true,
  optionSuccessStatus: 200,
}

var indexRouter = require('./routes/index');
var lecturerRouter = require('./routes/lecturers');
var usersRouter = require('./routes/users');
var classRouter = require('./routes/classes');
var citiesRouter = require('./routes/cities');
var courseRouter = require('./routes/courses');
var studentsRouter = require('./routes/students');
var ipkRouter = require('./routes/ipks');
var scoresRouter = require('./routes/scores');
var enrollsRouter = require('./routes/enrolls');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lecturer', lecturerRouter);
app.use('/class', classRouter);
app.use('/city', citiesRouter);
app.use('/course', courseRouter);
app.use('/student', studentsRouter);
app.use('/ipk', ipkRouter);
app.use('/score', scoresRouter);
app.use('/enroll', enrollsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
