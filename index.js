import vrtigo from './js/vrtigo/vrtigo';
import {config} from './js/vrtigo/config';

console.log("Vrtigo Analytics loaded...");

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
  setCamera: config.setCamera
};
