const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');



// const swaggerDocumentCategory = require('./swagger/categories.swaggeres.json');
// const swaggerDocumentComentario = require('./swagger/Comentarios-1.0.0-resolved.json');

require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const activitiesRouter = require('./routes/activities');

const organizationsRouter = require('./routes/organizations');

const authRouter = require('./routes/auth');
const categoryRouter = require('./routes/category');
const newRouter = require('./routes/news');
const contacts = require('./routes/contacts');
const comment = require('./routes/comments');
const swaggerDocument = require('./swagger/novedades_swagger.json');

const slidesRouter = require('./routes/slides');



const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/v2', express.static(__dirname + '/public/v2'));
//app.use(express.static(__dirname + 'public')); //Serves resources from public folder
app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/category', categoryRouter);

app.use('/organizations', organizationsRouter);
app.use('/auth', authRouter);
app.use('/news', newRouter);

app.use('/activities', activitiesRouter);
app.use('/comment', comment);
app.use('/contacts', contacts);
app.use('/slides', slidesRouter);

// Swagger config
//app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

//app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentCategory));


// Swagger config
var options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: 'http://localhost:3002/public/v2/novedades_swagger.json',
        name: 'Novedades'
      },
      {
        url: 'http://localhost:3002/public/v2/Comentarios-1.0.0-resolved.json',
        name: 'Comentarios'
      },
      {
        url: 'http://localhost:3002/public/v2/auth.swagger.json',
        name: 'Auth'
      },
      {
        url: 'http://localhost:3002/public/v2/authentication.swagger.json',
        name: 'Authentication'
      },
      {
        url: 'http://localhost:3002/public/v2/categories.swaggeres.json',
        name: 'Categories'
      },
      {
        url: 'http://localhost:3002/public/v2/testimonial.swaggeres.json',
        name: 'Testimonial'
      }
    ]
  }
}
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(null, options));
 //app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// app.use(
//   '/api/docs',
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerDocumentComentario)
// );


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
  res
    .status(err.status || 500)
    .json({ message: res.locals.message, statusCode: err.status });
});

module.exports = app;
