import { config } from './config';
import { sessionData } from './sessionData';
import { userData } from './userData';
import { POSE_SAMPLING_FREQUENCY } from './constants';
import checkThumbsUp from './thumbsup';
import { VrHeadModel } from 'react-vr';
import { util } from './util';

// state for this module, consider moving to sessionData
// or somewhere else

let firstTime = true;
let collecting = false;
let poseInterval = null;

const healthCheck = function(videoId, positionMillis) {
  return checkThumbsUp()
    .then(function(response) {
      firstTime = false;
      sessionData.thumbsUp = true;
      start(videoId, positionMillis);
    })
    .catch(function(error) {
      firstTime = false;
      sessionData.thumbsUp = false;
    });
};

const startCollecting = function(videoId, positionMillis) {
  // send event indicating tracking started
  sessionData.currentCid = videoId;
  sessionData.baselineCts = positionMillis;
  sessionData.currentCidStartTs = util.getCurrentTs();
  startPoseCollection(POSE_SAMPLING_FREQUENCY);
};

const startPoseCollection = function(frequency) {
  poseInterval = setInterval(function() {
    let poseSample = collectPose();
    userData.add('pose', 'euler_angle', poseSample);
  }, frequency);
};

const collectPose = function() {
  // TODO: This is a React VR SDK object, need to make sure it's
  // available
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
  if(poseInterval !== null) {
    clearInterval(poseInterval);
  }
};

const stop = function() {
  stopCollecting();
  
  sessionData.currentCid = null;
  sessionData.baselineCts = null;
  sessionData.currentCidStartTs = null;  
};

const pause = function() {
  stopCollecting();
};

const unpause = function(positionMillis) {
  startCollecting(sessionData.currentCid, positionMillis);
};

const seekBegin = function() {
  stopCollecting();
};

const seekEnd = function(positionMillis) {
  startCollecting(sessionData.currentCid, positionMillis);
};

const bufferBegin = function() {
  stopCollecting();
};

const bufferEnd = function(positionMillis) {
  startCollecting(sessionData.currentCid, positionMillis);
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
