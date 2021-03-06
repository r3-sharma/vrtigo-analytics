// Define package constants here

// *Not* exported
const PROTOCOL = "https://";
const SERVER_ADDR = "a.vrtigo.io";
const THUMBSUP_SERVER_ADDR = "a.vrtigo.io";

// Exported constants
import {version} from '../../package.json';
export const SDK_VERSION = version;

export const UPDATE_URL = PROTOCOL + SERVER_ADDR + "/update";
export const THUMBSUP_URL = PROTOCOL + THUMBSUP_SERVER_ADDR + "/thumbsup";
export const POST_TIMEOUT_MS = 10000;
export const THUMBSUP_TIMEOUT_MS = 10000;
export const POSE_SAMPLING_FREQUENCY_MS = 200;
