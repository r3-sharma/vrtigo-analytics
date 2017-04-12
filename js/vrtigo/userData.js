import {util} from './util';
import {sessionData} from './sessionData';
import {config} from './config';

// generate the  for this session
const userDataArray= [];

const add = function(type, metric, value) {
  //string headerRow = "val,type,tz,ts,mt,sts,sid,cid,cts,uid,app,dev\n";

  //performance?
  let data = {};
  data.val = JSON.stringify(value);
  data.type = type;
  data.tz = sessionData.tz;
  data.ts  = util.getCurrentTs();
  data.mt = metric;
  data.sts = util.getCurrentSts(sessionData.startTs);
  data.sid = sessionData.sid;
  data.cid = sessionData.currentCid,
  data.cts = util.getCurrentCts(sessionData.currentCidStartTs,
                                sessionData.baselineCts);
  data.uid = config.getUserId();
  data.app = config.getAppId();
  data.dev = sessionData.device;

  userDataArray.push(data);
};

const get = function() {
  return userDataArray;
};

const clear = function() {
  userDataArray.length = 0;
};

const userDataExport = {
  add, get, clear
};

export const userData = userDataExport;
