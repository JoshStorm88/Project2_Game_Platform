const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const databaseURI = 'mongodb://localhost/mongoose-intro';
mongoose.connect(databaseURI);
const router = require('./config/routes');
const session = require('express-session');


app.set('view engine','ejs');
app.set('views', `${__dirname}/views`);
app.use(ejsLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(methodOverride((req) => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'ssh it\'s a secret',
  resave: false,
  saveUninitialized: false
}));

app.use(router);

// listen out for incoming requests on PORT 4000
app.listen(4000, ()=> console.log('Express is listening to port 4000'));
