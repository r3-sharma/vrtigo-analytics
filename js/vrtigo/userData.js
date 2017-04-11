import {util} from './util';
import {sessionData} from './sessionData';
import {config} from './config';

// generate the  for this session
const userDataArray= [];

const add = function(type, metric, value, cid) {
  //string headerRow = "val,type,tz,ts,mt,sts,sid,cid,cts,uid,app,dev\n";

  //performance?
  let data = {};
  data.val = JSON.stringify(value);
  data.type = type;
  data.tz = sessionData.tz;
  data.ts  = util.getCurrentTs();
  data.mt = metric;
  data.sts = util.getCurrentSts();
  data.sid = sessionData.sid;
  data.cid = cid || '';
  data.cts = util.getCurrentCts();
  data.uid = config.userId();
  data.app = config.appId();
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
