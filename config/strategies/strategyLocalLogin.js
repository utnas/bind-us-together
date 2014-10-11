var LocalStrategy = require('passport-local').Strategy;
var User = require('../../app/models/user');

var localStrategyLogin = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },

    function (req, email, password, done) {
        if (email) {
            email = email.toLowerCase();
        }
        process.nextTick(function () {
            User.findOne({ 'local.email': email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                }
                else {
                    return done(null, user);
                }
            });
        });
    });

module.exports = localStrategyLogin;