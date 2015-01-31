/*global require, module, __dirname */
/*jslint node: true */
(function () {
    'use strict';

    var express = require('express'),
        mongoose = require('mongoose'),
        passport = require('passport'),
        flash = require('connect-flash'),
        morgan = require('morgan'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        session = require('express-session'),
        configDB = require('./config/database'),
        serveStatic = require('serve-static'),
        favicon = require('serve-favicon'),
        socket = require('socket.io'),
        http = require('http');

    require('./config/passport')(passport);
    mongoose.connect(configDB.url);

    var ubikinPort = process.env.PORT || 2222,
        ubikin = express(),
        server = http.createServer(ubikin),
        io = socket.listen(server);

    ubikin.use(serveStatic(__dirname + '/app/public'));
    ubikin.use(favicon(__dirname + '/app/public/assets/images/favicon.png'));
    ubikin.use(morgan('dev'));
    ubikin.use(cookieParser());
    ubikin.use(bodyParser.json());
    ubikin.use(bodyParser.urlencoded({extended: true}));

    ubikin.set('views', __dirname + '/app/views');
    ubikin.set('view engine', 'ejs');

    ubikin.use(session({secret: '!!---!!-à)&é+=/;.,?¨^`£$*€r-_!!!!'}));
    ubikin.use(passport.initialize());
    ubikin.use(passport.session());
    ubikin.use(flash());

    require('./app/routes/routes')(ubikin, passport);

    ubikin.listen(ubikinPort);

    console.log('The server is started on Port ' + ubikinPort);
})();