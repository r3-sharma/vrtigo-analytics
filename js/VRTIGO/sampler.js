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


function render_data () {
  getData.pushData("render", "fps", fpsStorage);
  console.log(fpsStorage);
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
      animate = setInterval(getData.onAnimationFrame, config.pose_frequency);
      pose_d = setInterval(getData.pose_data, config.pose_frequency);
      batt_d = setInterval(getData.battery_data, config.battery_frequency);
      render_d = setInterval(render_data, config.render_frequency);
      send_d = setInterval(posting.sendData, 1000);

    } else {
      return;

    }
  }

};

var samp = setSampler(true);

module.exports = {
  setSampler: setSampler

};
