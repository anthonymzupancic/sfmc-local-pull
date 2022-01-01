const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const dotenv = require('dotenv').config()

const indexRouter = require('./routes/index');
const sfmcAccounts = require('./routes/sfmc/sfmc-accounts');
const sfmcAssets = require('./routes/sfmc/sfmc-assets');
//const sfmcJourneys = require('./routes/sfmc/sfmc-journeys');
//const sfmcDataExtensions = require('./routes/sfmc/sfmc-data-extensions');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sfmc/accounts', sfmcAccounts);
app.use('/sfmc/assets', sfmcAssets);
//app.use('/sfmc/journeys', sfmcJourneys);
//app.use('/sfmc/de', sfmcDataExtensions);

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

module.exports = app;