import vrtigo from './js/vrtigo/vrtigo';
import { config } from './js/vrtigo/config';
import submit from './js/vrtigo/submit';

import { sessionData } from './js/vrtigo/sessionData';
import { setFrameworkVersion, setFrameworkName } from './js/vrtigo/framework';
import { interactive } from './js/vrtigo/interactive';

export default {
  sessionData,
  setFrameworkVersion,
  setFrameworkName,
  start: vrtigo.start,
  stop: vrtigo.stop,
  seekBegin: vrtigo.seekBegin,
  seekEnd: vrtigo.seekEnd,
  pause: vrtigo.pause,
  unpause: vrtigo.unpause,
  bufferBegin: vrtigo.bufferBegin,
  bufferEnd: vrtigo.bufferEnd,
  setUserId: config.setUserId,
  setAppId: config.setAppId,
  submit: submit,
  setPoseFunction: vrtigo.setPoseFunction,
  sessionData: sessionData,
  setFrameworkVersion: setFrameworkVersion,
  setFrameworkName: setFrameworkName,
  startInteractiveScene: interactive.startInteractiveScene,
  presentChoice: interactive.presentChoice,
  userChoice: interactive.userChoice,
  forceChoice: interactive.forceChoice,
  endInteractiveScene: interactive.endInteractiveScene  
};
