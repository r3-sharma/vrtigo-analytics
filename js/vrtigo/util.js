import moment from 'moment';

const getTimezone = function() {
  return moment.tz.guess();
};

const currentTs = function() {
  const d = new Date();
  return d.getTime();
};

const currentSts = function(startTs) {
  const currentTs = currentTs();
  const sts = currentTs - startTs;
  return currentTs - startTs;
}

const currentCts = function(startTs) {
  const currentTs = currentTs();
  const sts = currentTs - startTs;
  return currentTs - startTs;
}

export default {
  currentTs: currentTs,
  currentSts: currentSts,
  currentCts: currentCts,
  getTimezone: getTimezone
};
