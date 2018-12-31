var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;

if (process.env.ENV == 'Test') {
    mongoose.connect('mongodb://localhost/bookAPI_test', { useNewUrlParser: true });
}
else {
    mongoose.connect('mongodb://localhost/bookAPI', { useNewUrlParser: true });
}

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/Books', bookRouter);
//app.use('/api/authors', apiRouter);


app.get('/', function (req, res) {
    res.send('welcome to my API!');
});

app.listen(port, function () {
    console.log('Gulp is running my app on PORT: ' + port);
});


module.exports = app;