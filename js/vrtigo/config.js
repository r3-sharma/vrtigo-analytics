const params = {
  userId: '',
  appId: '',
  thumbsUp: false
};

const setUserId = function(userId) {
  params.userId = userId;
};

const setAppId = function(appId) {
  params.appId = appId;
};

const isAppIdSet = function() {
  return params.appId !== '';
};

const isUserIdSet = function() {
  return params.userId !== '' ;
};

const configExport =  { 
  setAppId: setAppId,
  setUserId: setUserId,
  isUserIdSet: isUserIdSet,
  isAppIdSet: isAppIdSet,
  params: params
};

// export singleton config object
export let config = configExport; 
