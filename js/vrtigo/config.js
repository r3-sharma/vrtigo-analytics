const params = {
  user_id: '',
  app_id: '',
  thumbsUp: false
};

const setUserId = function(userid) {
  params.user_id = userid;
};

const setAppId = function(appid){
  params.app_id = appid;
};

const config_export =  { 
  setAppId: setAppId,
  setUserId: setUserId,
  params: params
};

// export singleton
export let config = config_export; 
