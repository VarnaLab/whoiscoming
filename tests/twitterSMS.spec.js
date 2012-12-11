describe("get current people", function(){
  var TwitterSMS = require("../lib/twitterSMS");
  var config = require("../config.json").twitter;
  
  it("should work", function(next){
    sms = TwitterSMS.create(config);
    sms.send("It is working. This is a test tweet", function (err, data) {
      expect(err).toBeFalsy();
      next();
    });
  });
});