const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const app = express();
const routes = require('./config/routes');
const User = require('./models/user');
const { port, dbURI } = require('./config/enviroment');

mongoose.connect(dbURI);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(expressLayouts);

app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));


app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));


app.use((req, res, next) => {
  if(!req.session.userId) return next();
  console.log('session middleware');
  console.log(req.session);
  User
    .findById(req.session.userId)
    .then((user) =>{
      res.locals.currentUser = user;
      res.locals.isLoggedIn = true;
      next();
    });


});

app.use(routes);

app.listen(port, () => console.log(`Express started on port: ${port}`));
