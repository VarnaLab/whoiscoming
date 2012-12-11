/**
 * Presence is a class containing a list of names over time.
 * After each "update" new names are added or expired.
 * the number of updates before expire is passed to the create method
 * 
 */
var create = function (config) {
  var _present = {};
  var _epoch = 0;
  var _ttl = config.ttl || 7;
  var newcomers = [];
  var expired = [];
  
  var update = function (snapshot) {
      _epoch ++;
      newcomers = [];
      expired = [];
    
      snapshot.forEach(function (name) {
        checkNewcomer(name);
        addPresent(name);
      });
      
      checkExpire();
  }
  
  var checkNewcomer = function (name) {
    if(! _present["1" + name]) {
      newcomers.push(name);
    }
  };
  
  var addPresent = function (name) {
    _present["1" + name] = _epoch;
  };
  
  var checkExpire = function () {
    for (key in _present) {
      if (_present[key] + _ttl <= _epoch) {
        delete _present[key];
        expired.push(key.substr(1));
      }
    }
  };
  
  var result = {
    "update": update
  }
  
  Object.defineProperty(result
    , "newcomers", {get : function(){ return newcomers; }});
  Object.defineProperty(result
    , "expired", {get : function(){ return expired; }});                     
  
  return result;
}

module.exports = {
  "create": create
}