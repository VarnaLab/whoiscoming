xdescribe("Twitter post message", function(){
  var util = require('util');
  var twitter = require('twitter');
  var config = require("../config.json");

  var twit = new twitter(config);

  var message = 'Test tweet from node-twitter/' + twitter.VERSION;

  it("should send message", function(next){
    twit
    .verifyCredentials(function(data) {
      expect(data).toBeDefined();
      expect(data instanceof Error).toBe(false);
    })
    .updateStatus(message,function(data) {
      expect(data).toBeDefined();
      expect(data instanceof Error).toBe(false);
      next();
    });
  });
});