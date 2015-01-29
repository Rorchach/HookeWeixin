var express = require('express');
var app = express();
var http = require('http').Server(app);
var request = require('request');
var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var builder = new xml2js.Builder();

var bodyParser = require('body-parser');

var APPID = 'wx35f69d06fa9315f8';
var SERECT = '9fa6b3e7b45f5ffe14a3f970aaa36201';
var TOKEN_URL = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + APPID + '&secret=' + SERECT;

var TULING_URL = 'http://www.tuling123.com/openapi/api?key=fbf41cfbb78db8c29bc3520178495a2e';

var access_token, expires_in

// setInterval(function(){
//     request(TOKEN_URL, function(error, response, body){
//         body = JSON.parse(body);

//         access_token = body.access_token;
//         expires_in = body.expires_in;
//         console.log(access_token, expires_in);
//     });
// },  60 * 1000);

function reply(res, callback) {
    request(TULING_URL + '&info=' + res.text + '&userid=' + res.userid, function(error, response, body){
  	if(callback) callback(body);
    });  
}

app.use(bodyParser.text({type: 'text/xml'}));

app.post('/message/custom/send', function(req, res){
    res.send({message:111});
});

app.post('/', function(req, res){
    
    console.log(req.body);
    
    parseString(req.body, function(err, result){
        console.log(result);
	var content = '';
        
        if (result.xml.MsgType.indexOf('text') >= 0) {
            content = result.xml.Content;
        } else if (result.xml.MsgType.indexOf('voice') >= 0) {
            content = result.xml.Recognition.join(',');
        }

	var fromUserName = result.xml.FromUserName,
	    toUserName = result.xml.ToUserName,
            lon = result.xml.Longitude,
            lat = result.xml.Latitued;
       
        console.log(content);
       
        reply({text: content, userid: fromUserName, lon: lon, lat: lat}, function(data){
            data = JSON.parse(data);
         
            var reply = {xml:{}};

            reply.xml.FromUserName = toUserName;
	    reply.xml.ToUserName = fromUserName;
	    reply.xml.Content = data.text;
            reply.xml.CreateTime = new Date().getTime()/1000;
            reply.xml.MsgType = 'text';

            console.log(builder.buildObject(reply));
            res.send(builder.buildObject(reply));	
        });

    });
});

app.get('/', function(req, res){
    res.send(req.param('echostr'));
});

http.listen(8987, function(){
    console.log('listening~~~');
});
