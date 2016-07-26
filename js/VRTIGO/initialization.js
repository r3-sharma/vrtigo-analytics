var uu = require('uuid');
var config = require('./configurations')
var jstz = require('jstz');
var sid = uu.v1();



function generateTs(){
  var d = new Date();
  return d.getTime();
};

var startTs = generateTs()


function generateTz(){
  var tz = jstz.determine();
  return tz.name();
};

function generateSTS(){
  var currentTs = generateTs();
  var sts = currentTs - startTs;
  return currentTs - startTs;
}

function generatePayload(type, metric, value){
  payload = {};
  payload.type = type;
  payload.metric = metric;
  payload.value = value;
  payload.ts = generateTs();
  payload.sts = generateSTS();
  payload.sid = sid;
  payload.user_id = config.config.user_id;
  payload.app_id = config.config.app_id;
  payload.device = "Galaxy s7"
  payload.tz = generateTz();
  if (value == "session_start") {
    console.log("SESSION_STARTED")
  };
  return payload;
  //console.log(payload)
};



module.exports = {
  generateTs: generateTs,
  generateSTS: generateSTS,
  startTs: startTs,
  generatePayload: generatePayload

}
