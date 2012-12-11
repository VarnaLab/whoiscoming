var request = require("request");
var _ = require("underscore");

module.exports = {
  "create": function (config) {
    return {
      "getPeople": function(callback){
        var getOptions = {uri: config.uri, json:{}};
        request.get(getOptions, function(err, res, body){
          body = _.map(body, function(item){ return item.name; });
          callback(err, body);
        });
      }
    }
  }
}
