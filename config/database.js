var secret = require('./secretDatabase');

module.exports = {
    //'url': 'mongodb://mongodb://localhost:27017/ubikin'
    'url': "mongodb://" + secret.user + ":" + secret.password + "@dogen.mongohq.com:10024/app31210724"
};