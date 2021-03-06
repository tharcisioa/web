
const express = require('express');
const morgan = require('morgan')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose')
const passport = require('passport')
require('./config/passport')(passport)


mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/site-auth')
mongoose.connect('mongodb://heroku_vvkx14vr:d41pog6sjgov1dedaavslp6ohf@ds347298.mlab.com:47298/heroku_vvkx14vr')


const app = express()
app.use(morgan('dev'))
 
// 2
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', expressHandlebars({ defaultLayout: 'layout' }))
app.set('view engine', 'handlebars')
 
// 3
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  cookie: { maxAge: 500000 },
  secret: 'codeworkrsecret',
  saveUninitialized: false,
  resave: false
}));
 
app.use(passport.initialize())
app.use(passport.session())
 

// 4
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_mesages = req.flash('success')
  res.locals.error_messages = req.flash('error')
  next()
})
 
// 5
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.engine('html', require('ejs').renderFile);
 
// 6
// catch 404 and forward to error handle
 
// 7
app.listen(process.env.PORT ||5000, () => console.log('Server started listening on port 5000!'))