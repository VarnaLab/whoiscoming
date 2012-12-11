describe("presence", function () {
  var Presence = require("../lib/presence");
  
  var updateData = [
    [] //nothing on 0th cycle
    , ["to die in iteration 6", "mery", "chris", "peter", "missing in 2"]
    , ["mery", "peter", "chris", "newcomer 1" ]
    , ["mery", "peter", "chris", "newcomer 2", "newcomer 1", "missing in 2"]
    , [] //simulate an error ocured
    , ["mery", "peter", "chris", "newcomer 2", "newcomer 1", "missing in 2"] //same as 3
    , ["mery", "peter", "chris", "newcomer 2", "newcomer 1", "missing in 2"] //and now first expired must be present
  ];
  
  var buildPresenceToCycle = function (cycle) {
    var presence = Presence.create({ "ttl":5 });
    for (var i = 1; i <= cycle; i ++) {
      presence.update(updateData[i]);
    }
    return presence;
  }
  
  var expectEmptyArray = function (list) {
    expect(Array.isArray(list)).toBe(true);
    expect(list.length).toBe(0);
  }
  
  var expectArrayEquals = function (actual, expected) {
    expect(Array.isArray(actual)).toBe(true);
    expect(actual.length).toBe(expected.length);
    expected.forEach(function (item) {
      expect(actual).toContain(item);
    });
  }
  
  it("should CREATE an instance with no newcomers and expired", function () {
    var presence = buildPresenceToCycle(0);
    expectEmptyArray(presence.newcomers);
    expectEmptyArray(presence.expired);
  });
  
  it("should register all as newcomers after first update", function () {
    var presence = buildPresenceToCycle(1);
    expectEmptyArray(presence.expired);
    expectArrayEquals(presence.newcomers, updateData[1]);
  });
  
  it("should register only ones not present in the first update as newcomers during the second update", function () {
    var presence = buildPresenceToCycle(2);
    expectArrayEquals(presence.newcomers, ["newcomer 1"]);
    expectEmptyArray(presence.expired);
  });
  
  it("should register only new ones as newcomers during third update as well. Ones not present in second but present in first should not be register as newcomers", function () {
    var presence = buildPresenceToCycle(3);
    expectArrayEquals(presence.newcomers, ["newcomer 2"]);
    expectEmptyArray(presence.expired);
  });
  
  it("should not misbehave when provided an empty list of names on iteration 4", function () {
    var presence = buildPresenceToCycle(4);
    expectEmptyArray(presence.newcomers);
    expectEmptyArray(presence.expired);
    
    var presence2 = buildPresenceToCycle(5);
    expectEmptyArray(presence2.newcomers);
    expectEmptyArray(presence2.expired);
  });
  
  it("after the sixth update people not present on the list since update one should be in the expired list", function () {
    var presence = buildPresenceToCycle(6);
    expectEmptyArray(presence.newcomers);
    expectArrayEquals(presence.expired, ["to die in iteration 6"]);
  })
  
  
})