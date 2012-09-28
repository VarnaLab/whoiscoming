var request = require("request");
var _ = require("underscore");

var Person = module.exports.Person = function(data){
  _.extend(this, data);
}

module.exports.getPeople = function(callback){
  var getOptions = {uri: "http://hq.varnalab.org/list.php", json:{}};
  request.get(getOptions, function(err, res, body){
    _.map(body, function(item){ return new Person(item); });
    callback(err, body);
  });
}