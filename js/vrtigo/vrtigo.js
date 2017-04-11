import {config} from './config';
import util from './util';
import checkThumbsUp from './thumbsup';

let collecting = false;
let firstTime = true; 

const pose_data = function() {
  if(vrDisplay){
    pushData("event", "displayid", vrDisplay.displayId);
    pushData("event", "DisplayName", vrDisplay.displayName);
    pushData("event", "Headset is on", vrDisplay.isPresenting);
  } else {
    console.log("Unable to access data on your machine.");
  };
};

const healthCheck = function(videoId, positionMillis) {
  return checkThumbsUp()
    .then(function(response) {
      firstTime = false;
      config.thumbsUp = true;
      start(videoId, positionMillis);
    })
    .catch(function(error) {
      firstTime = false;
      config.thumbsUp = false;
    });
};

const startCollecting = function(videoId, positionMillis) {
  // send events
  // turn on pose collection
};

const start = function(videoId, positionMillis) {
  // check that app ID and user ID are set
  if(!config.isUserIdSet() || !config.isAppIdSet()) {
    console.log('use vrtigo.setAppId() and vrtigo.setUserId() before collecting data');
    return;
  }
  
  if(!firstTime) {
    startCollecting(videoId, positionMillis);
  } else {
    healthCheck(videoId, positionMillis);
  }
};

const stop = function() {
  stopCollecting();
};

const pause = function() {
  stopCollecting();
};

const unpause = function(positionMillis) {
  start();
};

const seekBegin = function() {
  stopCollecting();
};

const seekEnd = function(positionMillis) {
  startCollecting();
};

const bufferBegin = function() {
  stopCollecting();
};

const bufferEnd = function(positionMillis) {
  startCollecting();
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
