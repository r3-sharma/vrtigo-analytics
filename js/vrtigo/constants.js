// Define package constants here

// *Not* exported
const PROTOCOL = "http://";
const SERVER_ADDR = "a.vrtigo.io";
const THUMBSUP_SERVER_ADDR = "localhost:8080";

// Exported constants
export const SDK_VERSION = "0.7.0";
export const UPDATE_URL = PROTOCOL + SERVER_ADDR + "/update";
export const THUMBSUP_URL = PROTOCOL + THUMBSUP_SERVER_ADDR + "/thumbsup";
export const POST_TIMEOUT_MS = 10000;
export const THUMBSUP_TIMEOUT_MS = 10000;
export const POSE_SAMPLING_FREQUENCY = 0.2;
