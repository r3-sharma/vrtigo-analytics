import {SDK_VERSION, THUMBSUP_URL, THUMBSUP_TIMEOUT} from './constants';
import axios from 'axios';

const checkThumbsUp = function(payload) {

  const axiosConfig = {
    method: 'get',
    url: THUMBSUP_URL,
    timeout: THUMBSUP_TIMEOUT,
    headers: {'Vrtigo-Sdk-Version': SDK_VERSION },
    responseType: 'text'
  };

  return axios(axiosConfig);
};

export default checkThumbsUp;
