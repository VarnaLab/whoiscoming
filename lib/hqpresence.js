var _ = require("underscore");
var twitter = require('twitter');
var config = require("../config.json");
var moment = require("moment");

var Person = function(name) {
  this.name = name;
  this.cameAt = null;
}

Person.prototype.toString = function(){
  return this.name;
}

var repository = [];

var twit = new twitter(config);
twit.verifyCredentials(function(data) {
  if(data instanceof Error) throw data;
});

module.exports.getRepository = function(){
  return repository;
}

module.exports.updateCameAt = function(target){
  _.each(target, function(p){
    p.cameAt = new Date();
  });
}

module.exports.update = function(list, callback) {
  var current = _.pluck(list, "name");
  for(var i = 0; i<current.length; i++)
    current[i] = new Person(current[i]);

  var newOnes = _.difference(current, repository);
  var presentOnes = _.intersection(repository, current);

  module.exports.updateCameAt(presentOnes);

  if(newOnes.length == 0)
    return callback(null, false);

  repository = repository.concat(newOnes);
  module.exports.updateCameAt(newOnes);

  _.each(newOnes, function(i){
    console.log(i.name, i, i.cameAt);
  });

  var message = "";
  if(newOnes.length > 1) {
    message = newOnes.length+" people came to Varnalab";
  } else {
    message = newOnes[0]+" came to Varnalab";
  }

  twit.updateStatus(message, function(data) {
    if(data instanceof Error)
      callback(data)
    else
      callback(null, true);
  });
}

module.exports.removeExpired = function(timespanMilis, callback){
  var now = moment();

  var toBeRemoved = _.filter(repository, function(name){
    var nameMoment = moment(name.cameAt);
    console.log(now.valueOf()-nameMoment.valueOf());
    return now.diff(nameMoment) > timespanMilis;
  });

  if(toBeRemoved.length == 0) return callback(null, false);

  _.without(repository, toBeRemoved);

  var message = "";
  if(toBeRemoved.length > 1) {
    message = toBeRemoved.length+" people left Varnalab";
  } else {
    message = toBeRemoved[0]+" left Varnalab";
  }

  twit.updateStatus(message, function(data) {
    if(data instanceof Error)
      callback(data)
    else
      callback(null, true);
  });
}