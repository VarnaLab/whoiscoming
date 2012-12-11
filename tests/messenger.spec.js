describe("messenger", function () {
  var Messenger = require("../lib/messenger");
  
  it("constructs new instance using ShortMessageService{message:function(msg)} as the only parameter", function () {
    var messenger = Messenger.create({});
    expect(messenger).toBeTruthy();
  });
  
  it("sends formated message for newcomers based on an empty array of names", function () {
    var messenger = Messenger.create({});
    
    messenger.sendNewcomers([]);
  });
  
  it("sends formated message for newcomers based on array of names containing single name", function () {
    var sms = createMockSMS()
    var messenger = Messenger.create(sms);
    
    sms.expectedMessage = "Ivo came to Varnalab"
    messenger.sendNewcomers(["Ivo"]);
    expect(sms.invokations).toBe(1);
  });
  
  it("sends formated message for newcomers based on array of names containing more than one name", function () {
    var sms = createMockSMS()
    var messenger = Messenger.create(sms);
    
    sms.expectedMessage = "2 people came to Varnalab";
    messenger.sendNewcomers(["peter", "mary"]);
    expect(sms.invokations).toBe(1);
  });
  
  it("sends formated message for expired users based on empty array of names", function () {
    var messenger = Messenger.create({});
    
    messenger.sendExpired([]);
  });
  
  it("sends formated message for expired users based on array of names[1]", function () {
    var sms = createMockSMS()
    var messenger = Messenger.create(sms);
    
    sms.expectedMessage = "Ivo left Varnalab"
    messenger.sendExpired(["Ivo"]);
    expect(sms.invokations).toBe(1);
  });
  
  it("sends formated message for expired users based on array of names[1+]", function () {
    var sms = createMockSMS()
    var messenger = Messenger.create(sms);
    
    sms.expectedMessage = "2 people left Varnalab";
    messenger.sendExpired(["peter", "mary"]);
    expect(sms.invokations).toBe(1);
  });
  
  var createMockSMS = function () {
    return {
      "send": function (msg) {
        expect(msg).toBe(this.expectedMessage);
        this.invokations ++;
      }
      , "expectedMessage": null 
      , "invokations":0
    }
  }
  
});