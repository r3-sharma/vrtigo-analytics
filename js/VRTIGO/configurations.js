var aframe = require('aframe')
var fpsStorage = [];
var user_id = "user@oculus.com";
var app_id = "0c680a1e-8a32-46d5-ab22-087d6ea8d1cf";
var pose_frequency = 200;
var battery_frequency = 1000;
var render_frequency = 1000;
var frameNumber = 0;
var fpsStorage = [];
var startTime = 0

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

function setRenderFrequency (frequency) {
  render_frequency = frequency;
};

module.exports = {
  fpsStorage: fpsStorage,
  addAppID: addAppID,
  addUserID: addUserID,
  pose_frequency: pose_frequency,
  render_frequency:render_frequency,
  battery_frequency: battery_frequency,
  setRenderFrequency: setRenderFrequency,
  setBatteryFrequency: setBatteryFrequency,
  setPoseFrequency: setPoseFrequency
}
