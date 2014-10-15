/*global require, module, __dirname */
/*jslint node: true */
'use strict';

var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    configDB = require('./config/database.js'),
    serveStatic = require('serve-static');
require('./config/passport')(passport);

mongoose.connect(configDB.url);

var port = process.env.PORT || 2222;
var ubikin = express();

ubikin.use(serveStatic(__dirname + '/app/public'));
ubikin.use(morgan('dev'));
ubikin.use(cookieParser());
ubikin.use(bodyParser.json());
ubikin.use(bodyParser.urlencoded({ extended: true }));

ubikin.set('views', __dirname + '/app/views');
ubikin.set('view engine', 'ejs');

ubikin.use(session({ secret: 'kaokokokorobo' }));
ubikin.use(passport.initialize());
ubikin.use(passport.session());
ubikin.use(flash());

require('./app/routes/routes')(ubikin, passport);

ubikin.listen(port);

console.log('The server is started on port ' + port);
