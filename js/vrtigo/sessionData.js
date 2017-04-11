import {util} from './util';

// generate the metadata for this session
const sessionDataExport = {
  tz: util.getTimezone(),
  sid: util.getSessionId(),
  device: util.getDevice()
};

export const sessionData = sessionDataExport;
