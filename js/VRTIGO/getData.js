
var vrDisplay = null;
var display;
var matrx = mat4.create();
var storeData = [];
var battery;
var ua = navigator.userAgent
var user_id = "user@oculus.com";
var app_id = "0c680a1e-8a32-46d5-ab22-087d6ea8d1cf";
var quat1;
var quat2;
var quat3;
var quat4;
var sid = uuid.v1();

//var parse = new UAParser();
//var result = parse.getResult();

function generateTs(){
  var d = new Date();
  return d.getTime();
};

//user inserts their user id
function addUserID(userid){
  var user_id = userid
};

//user passes their app id
function addAppID(appid){
  var app_id = appid
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
    var viewMat = mat4.create();
    mat4.fromRotationTranslation(matrx, orientation, position);
    //var euler = new THREE.Euler().setFromRotationMatrix( orientation );
    quat1 = JSON.stringify(matrx[0]);
    quat2 = JSON.stringify(matrx[1]);
    quat3 = JSON.stringify(matrx[2]);
    quat4 = JSON.stringify(matrx[3]);
    //var rotation = new THREE.Euler().setFromQuaternion( matrx );
  } else {
    console.log("No VR devices attached")
    //mat4.identity(viewMat);
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
  payload.sid = uuid.v1();
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

// this function adds data to array and prints it
function printer (){
  //console.log("displayid = " + vrDisplay.displayId);
  //console.log(displayID);
  //console.log("DisplayName = " + vrDisplay.displayName);
  //console.log("Headset is on = " + vrDisplay.isPresenting);
  //console.log("fps = " + ticker.rate)
  //console.log("browser = " + JSON.stringify(result.browser));
  //console.log("os = " + JSON.stringify(result.os));
  //console.log("device = " + JSON.stringify(result.device));
  addEvent("tester");
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

}
module.exports = {
  addUserID: addUserID,
  addAppID: addAppID,
  addEvent: addEvent
};
