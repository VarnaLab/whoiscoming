describe("get current people", function(){
  var HqAPI = require("../lib/hqapi");

  it("should work", function(next){
    var hqapi = HqAPI.create({
      "uri": "http://hq.varnalab.org/list.php"
    });
    hqapi.getPeople(function(err, list){
      expect(err).toBe(null);
      expect(list).toBeDefined();
      expect(Array.isArray(list)).toBe(true);
      expect(list.length > 0).toBe(true);
      expect(typeof list[0]).toBe("string");
      next();
    });
  });
});