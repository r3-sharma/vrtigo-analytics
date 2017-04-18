import momentTz from 'moment-timezone';
import uuid from 'uuid';

const getTimezone = function() {
  return momentTz.tz.guess();
};

const getCurrentTs = function() {
  const d = new Date();
  return d.getTime();
};

const getCurrentSts = function(startTs) {
  const currentTs = getCurrentTs();
  const sts = currentTs - startTs;
  return currentTs - startTs;
};

const getCurrentCts = function(startTs, baselineTs) {
  const currentTs = getCurrentTs();
  return currentTs - startTs + baselineTs;
};

const getDevice = function() {
  return navigator.userAgent;
};

const getSessionId = function() {
  return uuid.v1();
};

export const util = {
  getCurrentTs: getCurrentTs,
  getCurrentSts: getCurrentSts,
  getCurrentCts: getCurrentCts,
  getTimezone: getTimezone,
  getSessionId: getSessionId,
  getDevice : getDevice
};
