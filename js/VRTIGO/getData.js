var gl = require('gl-matrix');
var af = require('aframe');
var uu = require('uuid');
var jstz = require('jstz');
var vrDisplay = null;
var display;
var matrx = gl.mat4.create();
var storeData = [];
var battery;
var ua = navigator.userAgent
var user_id = "user@oculus.com";
var app_id = "0c680a1e-8a32-46d5-ab22-087d6ea8d1cf";
var quat1;
var quat2;
var quat3;
var quat4;
var sid = uu.v1();
var startTime = 0; //for fps counter
var frameNumber = 0; //for fps counter
var fpsStorage = [];
var pose_frequency = 200;
var battery_frequency = 1000;
var is_Sampling = false;
var animate;
var pose_d;
var batt;
var send;

AFRAME.registerComponent('vrtigo',{
  schema: { default: true },

  tick: function(){

    frameNumber++;
    var c = new Date().getTime(),
    currentTime = ( c - startTime ) / 1000,
    result = Math.floor( ( frameNumber / currentTime ) );
  	if( currentTime > 1 ){
      startTime = new Date().getTime();
      frameNumber = 0;		}
    fpsStorage.push(result);
  }
});


//var parse = new UAParser();
//var result = parse.getResult();

function generateTs(){
  var d = new Date();
  return d.getTime();
};

//user inserts their user id
function addUserID(userid){
   user_id = userid
};

//user passes their app id
function addAppID(appid){
  app_id = appid
};

function setPoseFrequency(frequency) {
  pose_frequency = frequency;
};


function setBatteryFrequency(frequency) {
  battery_frequency = frequency;
};

var startTs = generateTs()


// sets a vrDisplay to be used for data
if (navigator.getVRDisplays) {
  navigator.getVRDisplays().then(function (displays){
    if (displays.length > 0 && displays[0] != undefined ){
      vrDisplay = displays[0];
      console.log("vr device found")
    } else {
      console.log("WebVR supported but no VRDisplays found.");

    }
  });
}

// each second this updates the information (orientation, pose, etc)
function onAnimationFrame () {
  if (vrDisplay) {
    var pose = vrDisplay.getPose();
    var orientation = pose.orientation;
    var position = pose.position;
    var ts = pose.timestamp;
    var velocity = pose.linearVelocity;
    var angularVelocity = pose.angularVelocity;
    if (!orientation) { orientation = [0, 0, 0, 1]; }
    if (!position) { position = [0, 0, 0]; }
    var viewMat = gl.mat4.create();
    gl.mat4.fromRotationTranslation(matrx, orientation, position);
    //the matrix might need to be inverted since this describes camera orientation. something about local vs world orientation. not sure about that. (mat4.invert(matrx, matrx)) should work
  } else {
    console.log("No VR devices attached")
    //gl.mat4.identity(viewMat);
  }
}

//var ticker = fps({
//    every: 10   // update every 10 frames
//});

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
  payload.user_id = user_id;
  payload.app_id = app_id;
  payload.device = "Galaxy s7"
  payload.tz = generateTz();
  //console.log(payload)
  storeData.push(payload);
};

function overheat(){
  pushData("event", "event", "overheat")
}

function addEvent(event){
  pushData("event", "event", event)
};

pushData("event", "event", "session_start")

function battery_data () {
  navigator.getBattery().then(function(battery){
      battery.addEventListener('chargingchange', function(){
        pushData("hardware", 'charging =', battery.charging)
      })
      battery.addEventListener('levelchange', function(){
        var batteryLevel = battery.level*100 + "%"
        pushData("hardware", "battery level", batteryLevel);
      })
      /*if (battery.charging){
          pushData("hardware", "battery charging time = ", battery.chargingTime);
      } else {
        pushData("hardware","battery discharging time = ", battery.dischargingTime);
      }*/
  });
};

function pose_data () {
  if(vrDisplay){

    pushData("device", "displayid", vrDisplay.displayId);
    pushData("device", "DisplayName", vrDisplay.displayName);
    pushData("event", "Headset is on", vrDisplay.isPresenting)
    pushData("event", "Quaternion1", quat1);
    pushData("pose", "Quaternion2", quat2);
    pushData("pose", "Quaternion3", quat3);
    pushData("pose", "Quaternion4", quat4);

  } else {
    console.log("Unable to access data on your machine.")
  };
};

function setSampler (bool) {
  if (is_Sampling) {
    if (bool) {
      continue;

    } else {
      is_Sampling = false
      clearInterval(animate);
      clearInterval(send);
      clearInterval(pose_d);
      clearInterval(batt);
    }
  } else {
    if (bool) {
      is_Sampling = true
      animate = setInterval(onAnimationFrame, pose_frequency);
      send = setInterval(sendData, 1000);
      pose_d = setInterval(pose_data, pose_frequency)
      batt = setInterval(battery_data, battery_frequency)

    } else {
      continue;

    }
  }

};
//setInterval(overheat, 5000)

function sendData() {

  fetch("http://a.vrtigo.io/update", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        data: storeData,
        session: []
    })
  });
  var backupData = storeData.slice();
  storeData = [];
}

module.exports = {
  addUserID: addUserID,
  addAppID: addAppID,
  addEvent: addEvent
};
