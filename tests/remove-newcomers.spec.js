describe("remove comers", function(){
  var hqapi = require("../lib/hqapi");
  var presence = require("../lib/hqpresence");
  var listOfPeople = null;

  it("should boot", function(next){
    hqapi.getPeople(function(err, list){
      expect(err).toBe(null);
      listOfPeople = list;
      next();
    });
  });

  it("should send twitter message", function(next){
    presence.update(listOfPeople, function(err, result){
      expect(err).toBe(null);
      expect(result).toBe(true);
      next();
    });
  });

  it("should not remove all expired", function(next){
    setTimeout(function(){
      presence.removeExpired(1000, function(err, result){
        expect(err).toBe(null);
        expect(result).toBe(false);
        next();
      });
    }, 500);
  });

  it("should remove all expired", function(next){
    setTimeout(function(){
      presence.removeExpired(1000, function(err, result){
        expect(err).toBe(null);
        expect(result).toBe(true);
        next();
      });
    }, 1500);
  });

});