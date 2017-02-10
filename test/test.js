const PORT = 3000;

var assert = require('assert')
var app = require('../server')


require('api-easy')
.describe('scrap')
.discuss('yolo')
.use('localhost', PORT)
.root('resultat')
.setHeader('Content-Type', 'application/json')
.setHeader('Accept', 'application/json')
.post({
  'url':"https://www.leboncoin.fr/ventes_immobilieres/1087285711.htm?ca=12_s"
  //'url':"https://www.google.fr/search?q=principalement&ie=utf-8&oe=utf-8&client=firefox-b-ab&gfe_rd=cr&ei=n8OFWPTtBpDFaPSqkhg"
})
.expect('Has ID', function (err, res, body) {

  var obj;
  assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
  assert.isObject(obj);
  assert.include(obj, 'BeAGoodTrade');
  assert.equal(false, obj.BeAGoodTrade);

}).next()

/*.del('/R')
.expect('delect', function(err,res,body){
  var obj ;
  assert.doesNotThrow(function() { obj = JSON.parse(body);
    console.error(obj);
  }, SyntaxError);
  assert.equal(obj.result, true);
  console.log(JSON.stringify(obj));
})*/
.export(module)
