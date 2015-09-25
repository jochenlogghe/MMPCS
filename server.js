var express = require('express');

var app = express();

app.set('env', 'dev');
app.set('port', 3000);

var config = require('./config/config')(app);

require('./config/db')(config.dbUrl);
require('./config/libs')(app);

require('./app/routes/index')(app);

var server = app.listen(process.env.PORT || app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});