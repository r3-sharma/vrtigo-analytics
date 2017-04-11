const params = {
  userId: '',
  appId: '',
  camera: null,
  thumbsUp: false
};

const setUserId = function(userId) {
  params.userId = userId;
};

const setAppId = function(appId) {
  params.appId = appId;
};

const setCamera = function(camera) {
  params.camera = camera;
};


const isAppIdSet = function() {
  return params.appId !== '';
};

const isUserIdSet = function() {
  return params.userId !== '' ;
};

const isCameraSet = function() {
  return params.camera !== null ;
};

const configExport =  { 
  setAppId: setAppId,
  setUserId: setUserId,
  setCamera: setCamera,
  isUserIdSet: isUserIdSet,
  isAppIdSet: isAppIdSet,
  isCameraSet: isCameraSet,
  params: params
};

// export singleton config object
export let config = configExport; 
