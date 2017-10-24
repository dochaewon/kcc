var mongoose = require('mongoose'),
    crypto = require('crypto'),   // 추가
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    username : String ,
    userid :  {
        type : String ,
        unique : true ,                           // 추가
        required : 'Username is required'   ,      // 추가
        trim : true
    },
    password : {                                     // ------password 변경
        type : String ,                              //
        validate : [                                 //
         function(password) {                        //
            return password && password.length > 6;  //
         }, 'Password should be longer'              //
        ]                                            //
    },                                               // ------password 변경 끝

    salt : {                                         // ------salt 추가
        type : String                                //
    },                                               // ------salt 추가 끝

    provider : {                                     // ------provider 추가
        type : String ,                              //
        required : 'Provider is required'            //
    },                                               // ------provider 추가 끝

    providerId : String ,                            // ------providerId 추가

    providerData : {} ,                              // ------providerData 추가

    email : {                                                           // email 변경
        type : String ,
                                              //
        match : [/.+\@.+\..+/, "pleas fill a valid e-mail address"]     //
    } ,                                                                 // email 변경 끝
    created : {
        type : Date,
        default : Date.now
    }
});




UserSchema.pre('save', function(next){                                      // ------------ 추가 메소드
    if(this.password) {

        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'),
        'base64');

    this.password = this.hashPassword(this.password);

    }
    next();
});

UserSchema.methods.hashPassword = function(password) {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUserid = function(userid, suffix, callback) {
    var _this = this;

    var possibleUserid = userid + (suffix || '');

    _this.findOne({
        userid : possibleUserid
    }, function(err,user) {
        if(!err) {
            if(!user) {
                callback(possibleUserid);
            }else{
                return _this.findUniqueUserid(userid, (suffix || 0) + 1, callback);
            }
        }else{
            callback(null);
        }
    });
};                                                                               // 추가 끝



UserSchema.set('toJSON',{ getters : true , virtuals : true});
mongoose.model('User',UserSchema);
