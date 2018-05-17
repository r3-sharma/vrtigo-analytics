import {util} from './util';

// generate the metadata for this session
const sessionDataExport = {
  startTs: util.getCurrentTs(),
  baselineCts: null,
  currentCid: null,
  currentCidStartTs: null,
  tz: util.getTimezone(),
  sid: util.generateSessionId(),
  device: util.getDevice(),
  iid: '',
  cid: '',
  choiceId: '',
  thumbsUp: false
};

export const sessionData = sessionDataExport;
