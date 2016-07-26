var posting = require('./posting');
var getData = require('./getData');
var config = require('./configurations');
var is_Sampling = false;
var animate;
var pose_d;
var batt_d;
var send_d;
var render_d;
var fpsStorage = [];
var frameNumber = 0;
var startTime = 0;


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


function render_data (pushData) {
  getData.pushData("render", "fps", fpsStorage);
  //console.log(fpsStorage);
  fpsStorage = [];
};

function setSampler (bool) {
  if (is_Sampling) {
    if (bool) {
      return;

    } else {
      is_Sampling = false;
      clearInterval(animate);
      clearInterval(send_d);
      clearInterval(pose_d);
      clearInterval(batt_d);
      clearInterval(render_d);
    }
  } else {
    if (bool) {
      is_Sampling = true;
      animate = setInterval(getData.onAnimationFrame, config.config.pose_frequency);
      pose_d = setInterval(getData.pose_data, config.config.pose_frequency);
      batt_d = setInterval(getData.battery_data, config.config.battery_frequency);
      render_d = setInterval(render_data, config.config.render_frequency);
      send_d = setInterval(function() {
//        console.log(getData);
//        let copy = getData.storeData.slice();
//        console.log('copy is:');
        //        console.log(copy);
        //console.log('sending:');
        //console.log(getData.storeData.data.slice());
        posting.sendData(getData.storeData.data.slice());
        getData.storeData.data = [];
      }, 5000);

    } else {
      return;

    }
  }

};

//var samp = setSampler(true);

module.exports = {
  setSampler: setSampler
};
