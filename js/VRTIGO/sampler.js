var posting = require('posting');
var getData = require('getData');
var config = require('configurations');
var is_Sampling = false;
var animate;
var pose_d;
var batt_d;
var send_d;
var render_d


function setSampler (bool) {
  if (is_Sampling) {
    if (bool) {
      continue;

    } else {
      is_Sampling = false
      clearInterval(animate);
      clearInterval(send_d);
      clearInterval(pose_d);
      clearInterval(batt_d);
      clearInterval(render_d);
    }
  } else {
    if (bool) {
      is_Sampling = true
      animate = setInterval(getData.onAnimationFrame, config.pose_frequency);
      send = setInterval(posting.sendData, 1000);
      pose_d = setInterval(getData.pose_data, config.pose_frequency);
      batt = setInterval(getData.battery_data, config.battery_frequency);
      render_d = setInterval(getData.render_data, config.render_frequency);

    } else {
      continue;

    }
  }

};

module.exports = {
  setSampler: setSampler

}
