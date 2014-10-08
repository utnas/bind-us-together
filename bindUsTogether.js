var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

var port = process.env.PORT || 2222;

var BindUsTogether = express();

BindUsTogether.use(morgan('dev'));
BindUsTogether.use(cookieParser());
BindUsTogether.use(bodyParser.json());
BindUsTogether.use(bodyParser.urlencoded({ extended: true }));

BindUsTogether.set('view engine', 'ejs');

BindUsTogether.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
BindUsTogether.use(passport.initialize());
BindUsTogether.use(passport.session());
BindUsTogether.use(flash());

require('./app/routes.js')(BindUsTogether, passport);

BindUsTogether.listen(port);
console.log('The server is started on port ' + port);
