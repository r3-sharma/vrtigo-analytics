import { config } from './config';
import { sessionData } from './sessionData';
import { userData } from './userData';
import { POSE_SAMPLING_FREQUENCY } from './constants';
import checkThumbsUp from './thumbsup';
import { VrHeadModel } from 'react-vr';
import submit from './submit';

let collecting = false;
let firstTime = true;

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
  // send event indicating tracking started
  userData.add({'a': 10});
  startPoseCollection(POSE_SAMPLING_FREQUENCY);
};

const startPoseCollection = function(frequency) {
  setInterval(function() {
    let poseSample = collectPose(frequency);
    userData.add(poseSample);
  });
};

const collectPose = function() {
  return VrHeadModel.rotationOfHeadMatrix();
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

const stopCollecting = function() {

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
  bufferEnd: bufferEnd,
  submit: submit
};
