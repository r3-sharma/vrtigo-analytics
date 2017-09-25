import { config } from './config';
import { sessionData } from './sessionData';
import { userData } from './userData';

import { POSE_SAMPLING_FREQUENCY_MS} from './constants';

import { EVENT_TYPE_NAME, POSE_TYPE_NAME, SESSION_EVENT_TYPE_NAME, CONTENT_EVENT_TYPE_NAME } from './framework';

import checkThumbsUp from './thumbsup';
import { util } from './util';
import { interactive } from './interactive';

let firstTime = true;
let poseInterval = null;
let poseFunction;
let trackingPose = false;
let paused = false;

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
  userData.add(EVENT_TYPE_NAME, 'event', 'content_baseline_timestamp_set');

  if(!trackingPose && !paused) {
    // only enable tracking if we're not tracking pose and not paused
    // if we are tracking pose already, we don't want to start another interval
    // if we are paused
    userData.add(EVENT_TYPE_NAME, 'event', 'tracking_enabled');
    startPoseCollection(POSE_SAMPLING_FREQUENCY_MS);
  }
};

const setPoseFunction = function(func) {
  poseFunction = func;
};

const startPoseCollection = function(frequency) {
  trackingPose = true;
  poseInterval = setInterval(function() {
    let poseSample = poseFunction();
    userData.add(POSE_TYPE_NAME, 'euler_angle', poseSample);
  }, frequency);
};

const start = function(videoId, positionMillis) {
  // check that app ID and user ID are set
  if(!config.isUserIdSet() || !config.isAppIdSet()) {
    console.log('use vrtigo.setAppId() and vrtigo.setUserId() before collecting data');
    return;
  }
  
  if(!firstTime) {
    startCollecting(videoId, positionMillis);
    userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_start');
  } else {
    healthCheck(videoId, positionMillis);
  }
};

const stopCollecting = function() {
  userData.add(EVENT_TYPE_NAME, 'event', 'tracking_disabled');
  trackingPose = false;
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
  paused = true;
  userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_pause');
  stopCollecting();
};

const unpause = function(positionMillis) {
  paused = false;
  startCollecting(sessionData.currentCid, positionMillis);
  userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_unpause');
};

const seekBegin = function() {
  userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_seek_begin');
  stopCollecting();
};

const seekEnd = function(positionMillis) {
  //still call startCollecting so that cts gets set properly
  startCollecting(sessionData.currentCid, positionMillis);
  userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_seek_end');
};

const bufferBegin = function() {
  userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_buffer_begin');
  stopCollecting();
};

const bufferEnd = function(positionMillis) {
  startCollecting(sessionData.currentCid, positionMillis);
  userData.add(CONTENT_EVENT_TYPE_NAME, 'event', 'content_buffer_end');
};

export default {
  start,
  stop,
  pause,
  unpause,
  seekBegin,
  seekEnd,
  bufferBegin,
  bufferEnd,
  setPoseFunction,
};

