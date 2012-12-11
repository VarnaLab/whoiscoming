var twitter = require('twitter');

var create = function (config) {
  var twit = new twitter(config);
  twit.verifyCredentials(function(data) {
    if(data instanceof Error) throw data;
  });  
  
  var sendMessage = function (message, callback) {
    callback = callback || function () {};
    twit.updateStatus(message, function(data) {
      if(data instanceof Error)
        callback(data)
      else
        callback(null, true);
    });
  };
  
  return {
    "send": sendMessage
  }
}


module.exports = {
  "create":create
}