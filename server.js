require('dotenv').config();

//require express
const express = require('express');
const session = require('express-session');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const methodOverride = require('method-override');
// const superagent = require('superagent');
const authService  = require('./controllers/auth/authController');


const app = express();
const PORT = process.env.PORT || 3000;

const artistRouter = require('./routes/index');

app.set('superSecret', process.env.SERVER_SECRET);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

app.use(logger('dev'));

app.use(session({
  secret:            app.get('superSecret'),
  resave:            false,
  saveUninitialized: false,
}));

//Exposing session user to views
app.use(function(req, res, next) {
  res.locals.currentUser = req.session.currentUser;
  next();
});

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => res.render('home/index', {message: 'welcome to artBase'}));

app.use('/', artistRouter);


// Universal Error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).send('Something broke!');
});

//Start up server
app.listen(PORT, () => console.log(`Server up and listening on ${PORT}`));
