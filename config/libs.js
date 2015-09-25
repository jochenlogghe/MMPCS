var bodyParser    = require('body-parser');
var logger        = require('morgan');

module.exports = function(app){
    app.use(logger(app.get('env')));
    app.use(bodyParser.json());
}