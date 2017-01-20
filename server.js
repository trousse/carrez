var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
});

app.post('/resultat',function(req,res){
  res.send({'BeAGoodTrade':true},400);
});
app.listen(3000);
