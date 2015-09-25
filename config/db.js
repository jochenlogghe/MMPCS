var mongoose                = require('mongoose');
var mongooseAutoIncrement   = require('mongoose-auto-increment');

module.exports = function(url){
    var connection = mongoose.connect(url, function(err) {
        if (err) 
            console.log('error connecting to mongodb');
            
        console.log('succesfully connected with mongodb');
    });
    
    mongooseAutoIncrement.initialize(connection);
};