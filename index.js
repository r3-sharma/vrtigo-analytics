import vrtigo from './js/vrtigo/vrtigo';
import {config} from './js/vrtigo/config';
import submit from './js/vrtigo/submit';
import {sessionData} from './js/vrtigo/sessionData';
import {setFrameworkVersion, setFrameworkName} from './js/vrtigo/framework';

export default {
  start: vrtigo.start,
  stop: vrtigo.stop,
  seekBegin: vrtigo.seekBegin,
  seekEnd: vrtigo.seekEnd,
  pause: vrtigo.pause,
  unpause: vrtigo.unpause,
  bufferBegin: vrtigo.bufferBegin,
  bufferEnd: vrtigo.bufferEnd,
  submit: vrtigo.submit,
  setUserId: config.setUserId,
  setAppId: config.setAppId,
  submit: submit,
  setPoseFunction: vrtigo.setPoseFunction,
  sessionData: sessionData,
  setFrameworkVersion: setFrameworkVersion,
  setFrameworkName: setFrameworkName
};
