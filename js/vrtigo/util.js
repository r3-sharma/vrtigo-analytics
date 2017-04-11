//import moment from 'moment';
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
  const currentTs = currentTs();
  const sts = currentTs - startTs;
  return currentTs - startTs;
};

const getCurrentCts = function(startTs) {
  const currentTs = currentTs();
  const sts = currentTs - startTs;
  return currentTs - startTs;
};

const getDevice = function() {
  return navigator.userAgent;
};

const getSessionId = function() {
  return uuid.v4();
};

export const util = {
  getCurrentTs: getCurrentTs,
  setCurrentSts: getCurrentSts,
  getCurrentCts: getCurrentCts,
  getTimezone: getTimezone,
  getSessionId: getSessionId,
  getDevice : getDevice
};
