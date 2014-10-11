var User = require('../app/models/user');
var localLoginStrategy = require('./strategies/strategyLocalLogin');
var localSignUpStrategy = require('./strategies/strategyLocalSignup');
var facebookStrategy = require('./strategies/strategyFacebook');
var twitterStrategy = require('./strategies/strategyTwitter');
var googleStrategy = require('./strategies/strategyGoogle');

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use('local-login', localLoginStrategy);

    passport.use('local-signup', localSignUpStrategy);

    passport.use(facebookStrategy);

    passport.use(twitterStrategy);

    passport.use(googleStrategy);
};
