var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    configDB = require('./config/database.js');
require('./config/passport')(passport);

mongoose.connect(configDB.url);

var port = process.env.PORT || 2222,
    BindUsTogether = express();

BindUsTogether.use(morgan('dev'));
BindUsTogether.use(cookieParser());
BindUsTogether.use(bodyParser.json());
BindUsTogether.use(bodyParser.urlencoded({ extended: true }));

BindUsTogether.set('views', __dirname + '/app/views');
BindUsTogether.set('view engine', 'ejs');

BindUsTogether.use(session({ secret: 'kaokokokorobo' }));
BindUsTogether.use(passport.initialize());
BindUsTogether.use(passport.session());
BindUsTogether.use(flash());

require('./app/routes.js')(BindUsTogether, passport);

BindUsTogether.listen(port);

console.log('The server is started on port ' + port);
