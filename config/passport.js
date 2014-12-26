(function () {
    'use strict';

    var User = require('../app/models/user'),
        localLoginStrategy = require('./strategies/strategyLocalLogin'),
        localSignUpStrategy = require('./strategies/strategyLocalSignup'),
        facebookStrategy = require('./strategies/strategyFacebook'),
        twitterStrategy = require('./strategies/strategyTwitter'),
        googleStrategy = require('./strategies/strategyGoogle');

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
})();