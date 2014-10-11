var LocalStrategy = require('passport-local').Strategy;
var User = require('../../app/models/user');

var localStrategySignUp = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },

    function (req, email, password, done) {
        if (email) {
            email = email.toLowerCase();
        }
        process.nextTick(function () {
                if (!req.user) {
                    User.findOne({ 'local.email': email }, function (err, user) {
                        if (err) {
                            return done(err);
                        }
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                        } else {
                            var newUser = new User();
                            newUser.local.email = email;
                            newUser.local.password = newUser.generateHash(password);
                            newUser.save(function (err) {
                                if (err) {
                                    throw err;
                                }
                                return done(null, newUser);
                            });
                        }
                    });
                }
                else if (!req.user.local.email) {
                    var user = req.user;
                    user.local.email = email;
                    user.local.password = user.generateHash(password);
                    user.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return done(null, user);
                    });
                } else {
                    return done(null, req.user);
                }
            }
        );
    });

module.exports = localStrategySignUp;