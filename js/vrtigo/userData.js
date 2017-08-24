import { util } from './util';
import { sessionData } from './sessionData';
import { config } from './config';

const userDataArray= [];

const add = function(type, metric, value) {
  //string headerRow = "val,type,tz,ts,mt,sts,sid,cid,cts,uid,app,dev\n";
  let data = {};
  data.val = value;
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
  data.iid = sessionData.iid;
  data.dev = sessionData.device;

  userDataArray.push(data);
};

const addUidAndAppId = function(data) {
  return data.map(function(d) {
    // if uid or app id are missing, add them...
    if(d.uid === '') {
      d.uid = config.getUserId();
    }

    if(d.app === '') {
      d.app = config.getAppId();
    }
    
    return d;
  });
};

const get = function() {
  const userDataUidAppId = addUidAndAppId(userDataArray);
  return userDataUidAppId;
};

const clear = function() {
  userDataArray.length = 0;
};

const userDataExport = {
  add, get, clear
};

export const userData = userDataExport;
