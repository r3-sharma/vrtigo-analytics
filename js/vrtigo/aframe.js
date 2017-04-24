const registerVrtigoAframeComponent = function(callbackFun) {
  //how can we be sure AFRAME global is available?
  AFRAME.registerComponent('vrtigo', {
    init: callbackFun
  });
};

export default registerVrtigoAframeComponent;
