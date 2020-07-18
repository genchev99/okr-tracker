'use strict';
require('dotenv').config({path: './.env'});

const createError = require('http-errors');
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

/* Load database models */
require('./models/user');

const PORT = 8080;
const app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

require('./config/passport')(passport);
app.use(passport.initialize());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const base = '/api/v1';

app.use(`${base}/`, indexRouter);
app.use(`${base}/auth`, authRouter);

app.use((req, res, next) => {
  console.log('req.session', req.session);
  next();
});

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
  res.render('error');
});

mongoose.connect(process.env.DATABASE_URL).then(() => {
  console.info('Database successfully connected on: ', process.env.DATABASE_URL);
  console.info('Starting express server on port: ', PORT);
  app.listen(PORT);
  console.info('Express server successfully started on: ', PORT);
});
