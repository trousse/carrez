const PORT = 8080;

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
  'url':"https://www.leboncoin.fr/ventes_immobilieres/1076257949.htm?ca=12_s"
})
.expect('Has ID', function (err, res, body) {

  var obj;
  assert.doesNotThrow(function() { obj = JSON.parse(body) }, SyntaxError);
  assert.isObject(obj);
  assert.include(obj, 'BeAGoodTrade');
  assert.equal(true, obj.BeAGoodTrade);
  console.log("sa marhe");
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