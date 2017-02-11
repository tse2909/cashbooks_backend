var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var nameRefSchema = new Schema({
    list_id: String,
    name: String,
});


module.exports = mongoose.model('Name', nameRefSchema );