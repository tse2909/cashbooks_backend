var express = require('express')
var app = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var Name = require('./models/nameRef');
var Transaction = require('./models/transaction');
var nameRefData = require('./data/nameRefData');
var cashData = require('./data/cashData');
var uuidV1 = require('uuid/v1');
mongoose.connect('mongodb://123123:123123@ds149069.mlab.com:49069/db_cashbooks');

app.use(bodyParser.urlencoded({
    extended: false
})); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
Name.remove({}, function (res) {
    console.log("removed records");
});

Name.count({}, function (err, count) {
    console.log("Names: " + count);
    if (count === 0) {
        var recordsToGenerate = nameRefData.length;
        for (var i = 0; i < recordsToGenerate; i++) {
            var newName = new Name({
                list_id: '1000-' + 1001 + i,
                name: nameRefData[i].name
            });
            newName.save(function (err, doc) {
                console.log("Created test document: " + doc._id);
            });
        }
    }
});


// Transaction.remove({}, function (res) {
//     console.log("removed records");
// });

// Transaction.count({}, function (err, count) {
//     console.log("Transaction: " + count);
//     if (count === 0) {
//         var recordsToGenerate = cashData.length;
//         for (var i = 0; i < recordsToGenerate; i++) {
//             var newTransaction = new Transaction({

//                 Txn_ID: '3000-' + 1001 + i,
//                 Account: 'Cash(IDR)',
//                 Date: cashData[i].Date,
//                 Name: cashData[i].Nama,
//                 Voucher: cashData[i].Voucher,
//                 KW: '',
//                 CN: '',
//                 Description: cashData[i].Description,
//                 Debit: cashData[i].Debit,
//                 Credit: cashData[i].Credit
              
//             });
//             newTransaction.save(function (err, doc) {
//                 console.log("Created test document: " + doc._id);
//             });
//         }
//     }
// });

app.get('/', function (req, res) {
    res.send('Hello World!');
})

app.get('/names', function (req, res) {
    Name.find({}, function (err, names) {
        if (err) {
            res.send(err);
        } else {
            res.json(names);
        }
    })
})

app.get('/transaction', function (req, res) {
    Transaction.find({}, function (err, transaction) {
        if (err) {
            res.send(err);
        } else {
            res.json(transaction);
        }
    })
})


app.listen(3000, function () {
    console.log(nameRefData.length);
    console.log(uuidV1());
    console.log('Example app listening on port 3000!')
})