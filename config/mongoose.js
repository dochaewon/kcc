var config = require('./config'),
     mongoose = require('mongoose');

module.exports = function() {
   var db = mongoose.connect(config.db);

   require('../app/models/user.server.model.js');
   require('../app/models/article.server.model.js'); // 추가
   return db;
}
