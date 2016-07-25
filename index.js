var getData = require('./js/VRTIGO/getData.js')
var wglu = require('./js/third-party/wglu-stats.js')
var aframe = require('./js/third-party/aframe.js')
var posting = require('./js/VRTIGO/posting.js')
var sample = require('./js/VRTIGO/sampler.js')
var init = require('./js/VRTIGO/initialization.js')
var config = require('./js/VRTIGO/configurations.js')
var getData = require('./js/VRTIGO/getData.js')

module.exports = {
  setSampler: sample.setSampler,
  getData: getData,
  wglu: wglu,
  aframe: aframe,
  addUserId: config.addUserId,
  setAppID: config.setAppId,
  setPoseFrequency: config.setPoseFrequency,
  setBatteryFrequency: config.setBatteryFrequency,
  setRenderFrequency: config.setRenderFrequency,
  addEvent: getData.addEvent





};
