var _ = require("underscore");
var SMS = require("./twitterSMS");
var config = require("../config.json");
var moment = require("moment");

var sms = SMS.create(config);
var repository = {};

module.exports.getRepository = function(){
  return repository;
}

module.exports.updateCameAt = function(target){
  _.each(target, function(p){
    p.cameAt = new Date();
  });
}

module.exports.update = function(list, callback) {
  var current = _.pluck(list, "alias");

  var newOnes = _.filter(current, function(item){
    return typeof repository["1"+item] == "undefined";
  });

  _.each(current, function(item){
    repository["1"+item] = new Date();
  });

  if(newOnes.length == 0)
    return callback(null, false);

  var message = "";
  if(newOnes.length > 1) {
    message = newOnes.length+" people came to Varnalab";
  } else {
    message = newOnes[0]+" came to Varnalab";
  }

  sms.send(message, callback);
}

module.exports.removeExpired = function(timespanMilis, callback){
  var now = moment();

  var toBeRemoved = [];
  for(var key in repository) {
    if(key.indexOf("1") === 0) {
      var nameMoment = moment(repository[key]);
      if(now.diff(nameMoment) > timespanMilis) {
        toBeRemoved.push(key.substring(1));
        delete repository[key];
      }
    }
  }

  if(toBeRemoved.length == 0) return callback(null, false);

  var message = "";
  if(toBeRemoved.length > 1) {
    message = toBeRemoved.length+" people left Varnalab";
  } else {
    message = toBeRemoved[0]+" left Varnalab";
  }

  sms.send(message, callback);
}