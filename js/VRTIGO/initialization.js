var uu = require('uuid');
var config = require('./configurations')
var jstz = require('jstz');
var sid = uu.v1();
var storeData = [];


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


function pushData(type, metric, value){
  payload = {};
  payload.type = type;
  payload.metric = metric;
  payload.value = value;
  payload.ts = generateTs();
  payload.sts = generateSTS();
  payload.sid = sid;
  payload.user_id = config.user_id;
  payload.app_id = config.app_id;
  payload.device = "Galaxy s7"
  payload.tz = generateTz();
  //console.log(payload)
  storeData.push(payload);
};

function addEvent(event){
  pushData("event", "event", event)
};

module.exports = {
  generateTs: generateTs,
  startTs: startTs,
  pushData: pushData,
  addEvent: addEvent,
  storeData: storeData

}
