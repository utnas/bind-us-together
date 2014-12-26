(function () {
    'use strict';

    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
        User = require('../../app/models/user'),
        configAuth = require('../auth');

    module.exports = new GoogleStrategy({
            clientID: configAuth.googleAuth.clientID,
            clientSecret: configAuth.googleAuth.clientSecret,
            callbackURL: configAuth.googleAuth.callbackURL,
            passReqToCallback: true
        },

        function (req, token, refreshToken, profile, done) {
            process.nextTick(function () {
                if (!req.user) {
                    User.findOne({'google.id': profile.id}, function (err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            if (!user.google.token) {
                                user.google.token = token;
                                user.google.name = profile.displayName;
                                user.google.email = (profile.emails[0].value || '').toLowerCase();
                                user.save(function (err) {
                                    if (err) {
                                        throw err;
                                    }
                                    return done(null, user);
                                });
                            }
                            return done(null, user);
                        } else {
                            var newUser = new User();
                            newUser.google.id = profile.id;
                            newUser.google.token = token;
                            newUser.google.name = profile.displayName;
                            newUser.google.email = (profile.emails[0].value || '').toLowerCase();
                            newUser.save(function (err) {
                                if (err) {
                                    throw err;
                                }
                                return done(null, newUser);
                            });
                        }
                    });
                } else {
                    var user = req.user;
                    user.google.id = profile.id;
                    user.google.token = token;
                    user.google.name = profile.displayName;
                    user.google.email = (profile.emails[0].value || '').toLowerCase();
                    user.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, user);
                    });
                }
            });
        });
})();