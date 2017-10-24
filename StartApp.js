process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('./config/express_config'),
    mongoose = require('./config/mongoose'),
    passport = require('./config/passport');  // 추가



var db = mongoose();
var app = express();
var passport = passport();    // 추가


app.listen(3000);
module.exports = app;

console.log('Server running at localhost');
