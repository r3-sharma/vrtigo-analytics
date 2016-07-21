var gl = require('gl-matrix');
var af = require('aframe');
var config = require('./configurations')
var init = require('./initialization')
var vrDisplay = null;
var display;
var matrx = gl.mat4.create();
var battery;
var ua = navigator.userAgent
var pose_frequency = 200;
var battery_frequency = 1000;
var storeData = [];

//var parse = new UAParser();
//var result = parse.getResult();


function addEvent(event){
  var payload = init.generatePayload("event", "event", event);
  storeData.push(payload)
};

function pushData(type, metric, value) {
  var load = init.generatePayload(type, metric, value);
  storeData.push(load);
};

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
    pushData("event", "Headset is on", vrDisplay.isPresenting);
    pushData("pose", "quaternion", matrx);

  } else {
    console.log("Unable to access data on your machine.")
  };
};

//setInterval(overheat, 5000)


module.exports = {
  pose_data: pose_data,
  battery_data: battery_data,
  onAnimationFrame: onAnimationFrame,
  storeData: storeData,
  addEvent: addEvent,
  pushData: pushData
};
