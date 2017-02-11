var mongoose = require('mongoose');


var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    Txn_ID: String,
    Account: String,
    Date: Date,
    Name: String,
    Voucher: String,
    KW: String,
    CN: String,
    Description: String,
    Debit: Number,
    Credit: Number
});


module.exports = mongoose.model('Transaction', transactionSchema );