import {SDK_VERSION, UPDATE_URL, POST_TIMEOUT} from 'constants';
import fetch from 'fetch';

const submit = function(payload) {
  fetch(UPDATE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Vrtigo-Sdk-Version': SDK_VERSION
    },
    body: JSON.stringify({
      data: payload,
      session: []
    })
  });
};

export default submit;
