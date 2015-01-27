var express = require('express');
var app = express();
var http = require('http').Server(app);
var request = require('request');

var APPID = 'wx35f69d06fa9315f8';
var SERECT = '9fa6b3e7b45f5ffe14a3f970aaa36201';
var TOKEN_URL = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + SERECT;

var access_token, expires_in

// setInterval(function(){
//     request(TOKEN_URL, function(error, response, body){
//         body = JSON.parse(body);

//         access_token = body.access_token;
//         expires_in = body.expires_in;
//         console.log(access_token, expires_in);
//     });
// },  60 * 1000);


app.get('/', function(req, res){
    console.log(req.param('echostr'));
    res.send(req.param('echostr'));
});

http.listen(8987, function(){
    console.log('listening~~~');
});
