var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var crypto          = require('crypto');
var uuid            = require('node-uuid');

var userSchema = new Schema({
    emailaddress: { type:String, index: { unique: true } },
    password: { type:String },
    full_name: { type:String },
    first_name: { type: String },
    last_name: { type: String },
    role: { type: String, default: 'Guest' },
    salt: { type: String, required: true, default: uuid.v1},
    password: { type: String, required: true }
});
 
var hash = function(passwd, salt) {
    return crypto.createHmac('sha256', salt).update(passwd).digest('hex');
};
 
userSchema.methods.setPassword = function(passwordString) {
    this.password = hash(passwordString, this.salt);
};
 
userSchema.methods.isValidPassword = function(passwordString) {
    return this.password === hash(passwordString, this.salt);
};
 
module.exports = mongoose.model('User', userSchema);