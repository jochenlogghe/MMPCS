var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var autoIncrement   = require('mongoose-auto-increment');

var customerSchema = new Schema({
    name: { type: String, required: true }
});

customerSchema.plugin(autoIncrement.plugin, { model: 'Customer', field: 'customer_id' });

module.exports = mongoose.model('Customer', customerSchema);