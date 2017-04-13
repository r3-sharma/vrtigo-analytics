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
let poseInterval = null;

//initial events
userData.add('event', 'event', 'session_start');
userData.add('session_event', 'event', 'session_start');
userData.add('event', 'platform', 'React VR');

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
  userData.add('event', 'event', 'tracking_enabled');
  userData.add('event', 'event', 'content_baseline_timestamp_set');
  startPoseCollection(POSE_SAMPLING_FREQUENCY);
};

const startPoseCollection = function(frequency) {
  poseInterval = setInterval(function() {
    let poseSample = collectPose();
    userData.add('pose', 'euler_angle', poseSample);
  }, frequency);
};

const collectPose = function() {
  // TODO: This is a React VR SDK function, need to make sure it's
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
    userData.add('content_event', 'event', 'content_start');
    startCollecting(videoId, positionMillis);
  } else {
    healthCheck(videoId, positionMillis);
  }
};

const stopCollecting = function() {
  userData.add('event', 'event', 'tracking_disabled');
  if(poseInterval !== null) {
    clearInterval(poseInterval);
  }
};

const stop = function() {
  userData.add('content_event', 'event', 'content_stop');
  stopCollecting();
  sessionData.currentCid = null;
  sessionData.baselineCts = null;
  sessionData.currentCidStartTs = null;  
};

const pause = function() {
  userData.add('content_event', 'event', 'content_pause');
  stopCollecting();
};

const unpause = function(positionMillis) {
  userData.add('content_event', 'event', 'content_unpause');
  startCollecting(sessionData.currentCid, positionMillis);
};

const seekBegin = function() {
  userData.add('content_event', 'event', 'content_seek_begin');
  stopCollecting();
};

const seekEnd = function(positionMillis) {
  userData.add('content_event', 'event', 'content_seek_end');
  startCollecting(sessionData.currentCid, positionMillis);
};

const bufferBegin = function() {
  userData.add('content_event', 'event', 'content_buffer_begin');
  stopCollecting();
};

const bufferEnd = function(positionMillis) {
  userData.add('content_event', 'event', 'content_buffer_end');
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
