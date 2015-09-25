module.exports = function(app){
    var config      = {};
    
    switch(app.get('env')){
        case 'dev':
            config.dbUrl =  process.env.MONGOURLDEV;
            config.secret = process.env.SECRETDEV;
            config.tokenExpireDays = process.env.TOKENEXPIRESDEV;
            break;
    }
    
    return config;
};