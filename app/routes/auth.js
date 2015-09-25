var jwt     = require('jwt-simple');
var _       = require('underscore');
var config  = require('../../config/config');

var User    = require('../models/user');

var auth =  {
    
    register: function(req, res){
        
        if(!((req.body && req.body.emailaddress) && (req.body && req.body.password)))
            res.status(400).json({message:'Invalid e-mailaddress or password'});
        
        var user = new User();
        _.extend(user, req.body);
        
        user.setPassword(req.body.password);
        
        user.save(function(err, user){
            if(err)
                res.status(500).json({ message: 'Something went wrong during your registration'});
                
            res.status(200).json({message:'User succesfully registered.'});
        })
    },
    
    login: function(req, res){
        
        var emailaddress = req.body.emailaddress;
        var password     = req.body.password;
        
        if(!emailaddress || !password){
            res.status(401).json({ succes: false, message: 'Authentication Failed. Invalid e-mailaddres or password.' });
        }
        
        User.findOne({ 
            emailaddress: req.body.emailaddress 
        } , function(err, user){
                
                if(err)  res.status(500).json({ succes:false, message: 'Could not fetch the user.' });
                    
                if(!user){
                    res.status(404).json({ succes:false, message: 'Authentication Failed. User not found.' });
                }else if(user){
                    if(!user.isValidPassword(req.body.password)){
                        res.status(401).json({ succes:false, message: 'Authentication Failed. Wrong Password.' });
                    }else{
                        res.json(generateToken(user));
                    }
                }
                
                
        });
    },
    
    validate: function(req, res , next){
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
        
        if(token){
            try{
                var decoded = jwt.decode(token, 'thisismylittlesecret');
                
                if(decoded.exp <= Date.now()){
                    res.status(400).json({ message: 'Token has expired' });
                }
                
                User.findOne({
                    emailaddress: decoded.emailaddress 
                }, function(err, user){
                    req.user = user;
                    next();
                });
            }catch (err){
                res.status(500).json({ message: 'Internal Server Error, Something went wrong while validating your authentication.' });
            }
        }else{
            res.status(403).send({
                succes:false,
                message: 'No Token Provided.'
            });
        }
    }
};


function generateToken(user) {
  var expires = expiresIn(7);
  var omittedUser = _.omit(user, 'salt', 'password');
  
  var token = jwt.encode({
    exp: expires,
    emailaddress: user.emailaddress
  }, 'thisismylittlesecret');
 
  return {
    token: token,
    expires: expires,
    user: omittedUser
  };
}
 
function expiresIn(days) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + days);
}
 
 
 module.exports = auth;