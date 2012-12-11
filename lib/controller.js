require("colors");

var create = function (context) {
  var presence = context.presence;
  var messenger = context.messenger;
  var hqapi = context.hqapi;
  
  var cycle = function () {
    hqapi.getPeople(function(err, list){
      if(err) throw err;
      presence.update(list);
      
      messenger.sendNewcomers(presence.newcomers);
      messenger.sendExpired(presence.expired);
     
      console.log("ping".yellow);
    });
  }
  
  var init = function () {
    setInterval(cycle, 60000);
  }
  
  return {
    "init": init
  }
}

module.exports = {
  "create":create
}