var config = {user_id: 0, app_id:"0c680a1e-8a32-46d5-ab22-087d6ea8d1cf", pose_frequency: 200, battery_frequency: 1000, render_frequency: 1000};


//user inserts their user id
function addUserId(userid){
  config.user_id = userid;
};

//user passes their app id
function setAppId(appid){
  config.app_id = appid;
};

function setPoseFrequency(frequency) {
  config.pose_frequency = frequency;
};


function setBatteryFrequency(frequency) {
  config.battery_frequency = frequency;
};

function setRenderFrequency (frequency) {
  config.render_frequency = frequency;
};

module.exports = {
  setAppId: setAppId,
  addUserId: addUserId,
  config:config,
  setRenderFrequency: setRenderFrequency,
  setBatteryFrequency: setBatteryFrequency,
  setPoseFrequency: setPoseFrequency
}
