module.exports = function(app){
    var config      = {};
    
    config.secret = 'thisismylittlesecret';
    config.tokenExpireDays = 1;
    
    switch(app.get('env')){
        case 'dev':
            config.dbUrl =  'mongodb://teccomcrmuser:teccomcrmuser@ds027483.mongolab.com:27483/teccomcrm';
            break;
    }
    
    return config;
};