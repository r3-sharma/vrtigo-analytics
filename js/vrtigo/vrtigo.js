import config from './config';
import util from './util';

var vrDisplay = null;
var isSampling = false;

const pose_data = function() {
  if(vrDisplay){
    pushData("event", "displayid", vrDisplay.displayId);
    pushData("event", "DisplayName", vrDisplay.displayName);
    pushData("event", "Headset is on", vrDisplay.isPresenting);
  } else {
    console.log("Unable to access data on your machine.");
  };
};

const start = function(videoId, positionMillis) {
  if (!started) {
    getData.pushData("event", "event", "session_start");
    started = true;
  }
  if (is_Sampling) {
    if (bool) {
      return;

    } else {
      is_Sampling = false;
    }
  } else {
    if (bool) {
      is_Sampling = true;
      //pose_d = setInterval(getData.pose_data, config.config.pose_frequency);
    } else {
      return;
    }
  }
};

const stop = function() {

};

const pause = function() {

};

const unpause = function(positionMillis) {

};

const seekBegin = function() {

};

const seekEnd = function(positionMillis) {


};

const bufferBegin = function() {

};

const bufferEnd = function(positionMillis) {
  
};

export default {
  start: start,
  stop: stop,
  pause: pause,
  unpause: unpause,
  seekBegin: seekBegin,
  seekEnd: seekEnd,
  bufferBegin: bufferBegin,
  bufferEnd: bufferEnd
};
