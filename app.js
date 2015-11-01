var express = require('express');
var oauth = require('./oauth.js')
var path    = require("path");
var responseTime = require('response-time');
var app = express();
app.use(responseTime());
app.use(express.static('public'));
app.use(oauth.parseHeader());

var verifyOAuthRequest = [
   oauth.verifyBody(),
   oauth.verifySignature(function (req, type, identifier, callback) {
     console.log('This is the type '+type);
     console.log('This is the identifier '+identifier);
     callback('testsecret');
   })
];

app.post('/sample', verifyOAuthRequest, function (req, res) {
  res.send({'message':'This is the data that was requested via Oauth'});
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});