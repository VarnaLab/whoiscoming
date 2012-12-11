var create = function (sms) {
  
  var checkNoMessageCriteria = function (list) {
    return ! (list && Array.isArray(list) && list.length > 0);
  }
  
  var sendNewcomers = function (list) {
    if (checkNoMessageCriteria(list)) {
      return; //invalid argument or empty array - do not post
    }
    
    message (list, "came to");
  }
  
  var sendExpired = function (list) {
    if (checkNoMessageCriteria(list)) {
      return; //invalid argument or empty array - do not post
    }
    
    message (list, "left");
  }
  
  var message = function (list, action) {
    if (list.length === 1) {
      singleNameMsg(list, action);
    } else {
      multiNameMsg(list, action);
    }
  }
  
  var singleNameMsg = function (list, action) {
    sms.send(list[0] + " " + action + " Varnalab");
  }
  var multiNameMsg = function (list, action) {
    sms.send(list.length + " people " + action + " Varnalab");
  }
  
  return {
    "sendNewcomers": sendNewcomers
    , "sendExpired": sendExpired
  }
}


module.exports = {
  "create":create
}