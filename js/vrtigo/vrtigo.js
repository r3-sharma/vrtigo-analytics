import { config } from './config';
import { sessionData } from './sessionData';
import { userData } from './userData';
import { POSE_SAMPLING_FREQUENCY,
         EVENT_TYPE_NAME,
         POSE_TYPE_NAME,
         SESSION_EVENT_TYPE_NAME,
         CONTENT_EVENT_TYPE_NAME
       } from './constants';
import checkThumbsUp from './thumbsup';

import { util } from './util';
import registerAframe from './aframe';

let firstTime = true;
let poseInterval = null;

//register Aframe component
registerAframe(function () {
  var sceneEl = this.el.sceneEl;
  // Get active camera
  sceneEl.addEventListener('camera-set-active', function(evt) {
    sessionData.camera = evt.detail.cameraEl;
  });
});

//initial events
userData.add(EVENT_TYPE_NAME, 'event', 'session_start');
userData.add(SESSION_EVENT_TYPE_NAME, 'event', 'session_start');
userData.add(EVENT_TYPE_NAME, 'platform', 'React VR');

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
  sessionData.currentCid = videoId;
  sessionData.baselineCts = positionMillis;
  sessionData.currentCidStartTs = util.getCurrentTs();
  userData.add(EVENT_TYPE_NAME, 'event', 'tracking_enabled');
  userData.add(EVENT_TYPE_NAME, 'event', 'content_baseline_timestamp_set');
  startPoseCollection(POSE_SAMPLING_FREQUENCY);
};

const startPoseCollection = function(frequency) {
  poseInterval = setInterval(function() {
    let poseSample = collectPose();
    userData.add(POSE_TYPE_NAME, 'euler_angle', poseSample);
  }, frequency);
};

const collectPose = function() {
  //console.log(sessionData.camera.getAttribute('rotation'));
  return sessionData.camera.getAttribute('rotation');;
};

const start = function(videoId, positionMillis) {
  // check that app ID and user ID are set
  if(!config.isUserIdSet() || !config.isAppIdSet()) {
    console.log('use vrtigo.setAppId() and vrtigo.setUserId() before collecting data');
    return;
  }
  
  if(!firstTime) {
    userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_start');
    startCollecting(videoId, positionMillis);
  } else {
    healthCheck(videoId, positionMillis);
  }
};

const stopCollecting = function() {
  userData.add(EVENT_TYPE_NAME, 'event', 'tracking_disabled');
  if(poseInterval !== null) {
    clearInterval(poseInterval);
  }
};

const stop = function() {
  userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_stop');
  stopCollecting();
  sessionData.currentCid = null;
  sessionData.baselineCts = null;
  sessionData.currentCidStartTs = null;  
};

const pause = function() {
  userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_pause');
  stopCollecting();
};

const unpause = function(positionMillis) {
  userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_unpause');
  startCollecting(sessionData.currentCid, positionMillis);
};

const seekBegin = function() {
  userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_seek_begin');
  stopCollecting();
};

const seekEnd = function(positionMillis) {
  userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_seek_end');
  startCollecting(sessionData.currentCid, positionMillis);
};

const bufferBegin = function() {
  userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_buffer_begin');
  stopCollecting();
};

const bufferEnd = function(positionMillis) {
  userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_buffer_end');
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
