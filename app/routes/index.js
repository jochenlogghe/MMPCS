var auth = require('./auth');

module.exports = function(app){
    
    
     app.post('/login', auth.login);
     app.post('/register', auth.register);
     app.get('/api/public/test', function(req, res){
          res.status(200).json('Hello anonymous user');
     });
     
     app.use('/api/restricted/test', auth.validate);
     
     app.get('/api/restricted/test' , function(req, res){
         res.status(200).json({ message: 'Hello authenticated user' + req.user.emailaddress });
     });
}

 