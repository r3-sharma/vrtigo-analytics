export let SDK_FRAMEWORK_VERSION = '';
export let SDK_FRAMEWORK_NAME = '';
export let EVENT_TYPE_NAME = "event_js";
export let POSE_TYPE_NAME = "pose_js";
export let SESSION_EVENT_TYPE_NAME = "session_event_js";
export let CONTENT_EVENT_TYPE_NAME = "content_event_js";
import {SDK_VERSION} from './constants';

export const setFrameworkVersion = function(version) {
  SDK_FRAMEWORK_VERSION = version;
  console.log('Vrtigo Analytics Version: ' +
              'Core SDK: ' + SDK_VERSION +
              ', Framework: ' + SDK_FRAMEWORK_VERSION);
};

export const setFrameworkName = function(name) {
  SDK_FRAMEWORK_NAME = name;
  EVENT_TYPE_NAME = "event_js_" + name;
  POSE_TYPE_NAME = "pose_js_" + name;
  SESSION_EVENT_TYPE_NAME = "session_event_js_" + name;
  CONTENT_EVENT_TYPE_NAME = "content_event_js_" + name;
};
