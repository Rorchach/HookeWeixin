var express = require('express');
var app = express();
var http = require('http').Server(app);

var TOKEN = 'ACCESS_TOKEN';

app.get('/', function(req, res){
    res.send(req.param('signatrue'));
});

http.listen(8987, function(){
    console.log('listening~~~');
});