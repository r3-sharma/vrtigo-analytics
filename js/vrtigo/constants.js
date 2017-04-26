// Define package constants here

// *Not* exported
const PROTOCOL = "https://";
const SERVER_ADDR = "a.vrtigo.io";
const THUMBSUP_SERVER_ADDR = "a.vrtigo.io";

// Exported constants
export const SDK_VERSION = "0.7.5";
export const UPDATE_URL = PROTOCOL + SERVER_ADDR + "/update";
export const THUMBSUP_URL = PROTOCOL + THUMBSUP_SERVER_ADDR + "/thumbsup";
export const POST_TIMEOUT_MS = 10000;
export const THUMBSUP_TIMEOUT_MS = 10000;
export const POSE_SAMPLING_FREQUENCY_MS = 200;

export const EVENT_TYPE_NAME = "event_js";
export const POSE_TYPE_NAME = "pose_js";
export const SESSION_EVENT_TYPE_NAME = "session_event_js";
export const CONTENT_EVENT_TYPE_NAME = "content_event_js";
