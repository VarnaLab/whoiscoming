describe("get current people", function(){
  var hqapi = require("../lib/hqapi");

  it("should work", function(next){
    hqapi.getPeople(function(err, list){
      expect(err).toBe(null);
      expect(list).toBeDefined();
      expect(Array.isArray(list)).toBe(true);
      expect(list.length > 0).toBe(true);
      expect(list[0].name).toBeDefined();
      next();
    });
  });
});