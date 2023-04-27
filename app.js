var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// var productRouter = require('./routes/products');
// var inquiryRouter = require('./routes/inquiry')
var customerRouter = require('./routes/users')
var adminRouter = require('./routes/admin')
var maintainRouter = require('./routes/maintain')
var repairRouter = require('./routes/repairlog')
var carpostRouter = require('./routes/carspost')
var bidRouter = require('./routes/bids')
var showroomRouter = require('./routes/newcars')
var salesRouter = require('./routes/sales')
var expenseRouter = require('./routes/expense')






var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use('/customer', customerRouter);
app.use('/admin', adminRouter);
app.use('/maintain', maintainRouter);
app.use('/log', repairRouter);
app.use('/car', carpostRouter);
app.use('/make', bidRouter);
app.use('/showroom', showroomRouter);
app.use('/sale', salesRouter);
app.use('/expense', expenseRouter);








// app.use('/products',productRouter);
// app.use('/inquiry',inquiryRouter);

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