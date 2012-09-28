require("colors");

var hqapi = require("./lib/hqapi");
var presence = require("./lib/hqpresence");

setInterval(function(){
  hqapi.getPeople(function(err, list){
    if(err) throw err;
    presence.update(list, function(err, result){
      if(result) 
        console.log("whoiscoming is just tweeted newcomer...".blue);
    });
    presence.removeExpired(5*1000, function(err, result){
      if(result) 
        console.log("whoiscoming is just tweeted leftover...".blue);
    });
    console.log("ping".yellow);
  });
}, 1000);

console.log("whoiscoming is running...".green);