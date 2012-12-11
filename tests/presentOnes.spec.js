xdescribe("new comers", function(){
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

  it("should not update existing", function(next){
    var removed = listOfPeople.splice(0, 1);
    listOfPeople.push({name: "Pencho"});

    presence.update(listOfPeople, function(err, result){
      expect(err).toBe(null);
      expect(result).toBe(true);
      var repo = presence.getRepository();
      expect(repo[0].cameAt).toBe(removed.cameAt);
      var now = repo[1].cameAt;
      for(var i = 1; i<repo.length; i++)
        expect(repo[i].cameAt).toBe(now);
      next();
    });

  });

});