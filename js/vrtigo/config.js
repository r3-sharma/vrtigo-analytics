const params = {
  userId: '',
  appId: ''
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

const getUserId = function() {
  return params.userId;
};

const getAppId = function() {
  return params.appId;
};

const configExport =  {
  getAppId:    getAppId,
  setAppId:    setAppId,
  isAppIdSet:  isAppIdSet,  
  getUserId:   getUserId,
  setUserId:   setUserId,
  isUserIdSet: isUserIdSet
};

// export singleton config object
export let config = configExport;
