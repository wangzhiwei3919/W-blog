var express = require('express');
var app = express();
var question = require('./router/router');
var bodyParser = require('body-parser');

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));

app.use('/question',question);
app.use('/public', express.static('public'));
app.use('/views', express.static('views'));

var server = app.listen(9000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});