import axios from 'axios';
import toCSV from './serialize';
import { SDK_VERSION, UPDATE_URL, POST_TIMEOUT_MS } from './constants';
import { SDK_FRAMEWORK_VERSION, SDK_FRAMEWORK_NAME } from './framework';
import { sessionData } from './sessionData';
import { userData } from './userData';

const submit = function() {

  if(!sessionData.thumbsUp) {
    return Promise.reject('No thumbsup');
  }

  const axiosConfig = {
    method: 'post',
    url: UPDATE_URL,
    timeout: POST_TIMEOUT_MS,
    headers: {
      'X-Vrtigo-Sdk-Version': SDK_VERSION,
      'X-Vrtigo-Framework-Sdk-Version': SDK_FRAMEWORK_VERSION,
      'X-Vrtigo-Framework-Sdk-Name': SDK_FRAMEWORK_NAME,
      'Content-Type': 'text/csv'
    },
    data: toCSV(userData.get())
  };

  return axios(axiosConfig)
    .then(function (response) {
      userData.clear();
      return Promise.resolve(response);
    })
    .catch(function (error) {

      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
    });
};

export default submit;
