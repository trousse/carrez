"use strict"
var http = require('http');
var express = require('express');
var reponce = require("./respond");
var app = express();
var bodyParser = require('body-parser');
let scrape = require('Cheerio');
var request = require("request");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.get('/', function(req, res){

});

app.post('/resultat',function(req,res){


  var url = req.body.url;
  var  gotHousse = new Promise((resolve, reject) => {
    request({
      uri: url,
      method: "GET"
    },function getHouseData(error, response, body){
      if(error) reject(error);
      else{

        let BonCoin = scrape.load(body);
        var houseData ;

        BonCoin('script').each(function(i, elem) {
          if(i==7){
            var guillemet = "\"";

            var jsonFormat = BonCoin(this).text().slice(27).split('\n')
            .splice(14,24)
            .map(function(line,index){
              var tab =   line.split(' ');
              tab[tab.length - 3] =   guillemet.concat(tab[tab.length-3]).concat(guillemet);
              line = tab.join(' ');
              return line;
            })
            .join('\n')
            .slice(0,-1);


            jsonFormat = "{".concat(jsonFormat)
            .concat("\n}");

            houseData = JSON.parse(jsonFormat);
            return false;
          }
        });
        resolve(houseData);
      }
    });
}).catch(function(err){
  res.respond(err,404);
}).then(function(house){


  var areaData = new Promise((resolve, reject) => {
    request({
       uri: "https://www.meilleursagents.com/prix-immobilier/"+house.city+'-'+house.cp,
       method: "GET"
     },function getHouseData(error, response, body){
        if(error)reject(error,404);
        else{
          var regex = /(: \d+(\d)*)/g;
          let bestAgent =  scrape.load(body);
           var area = bestAgent("meta[name=description]")
          .prop('content')
          .match(regex);
          if(house.type == 'maison')area = area[0].slice(2);
          else{ area = area[1].slice(2);}
          house.areaPrice = area;
          resolve(house);
        }
      });
    })
    .catch(function(err,code){res.respond(err,code);})
    .then(function(house){
       var value = house.prix/house.surface ;
       if(value<house.areaPrice )res.respond({BeAGoodTrade:true},200);
       else{res.respond({BeAGoodTrade:false},200);}
  });

  });
});

app.listen(3000);
