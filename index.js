var HqAPI = require("./lib/hqapi")
, Messenger = require("./lib/messenger")
, Presence = require("./lib/presence")
, TwitterSMS = require("./lib/twitterSMS")
, Controller = require("./lib/controller")
, config = require("./config.json");

Controller.create({
  "presence": Presence.create(config.presence)
  , "messenger": Messenger.create(
    TwitterSMS.create(config.twitter))
  , "hqapi": HqAPI.create(config.hqapi)
}).init();