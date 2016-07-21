var getData = require('./js/VRTIGO/getData.js')
var wglu = require('./js/third-party/wglu-stats.js')
var posting = require('./js/VRTIGO/posting.js')
var sample = require('./js/VRTIGO/sampler.js')
var init = require('./js/VRTIGO/initialization.js')
var config = require('./js/VRTIGO/configurations.js')
var getData = require('./js/VRTIGO/getData.js')

module.exports = {

  getData: getData,
  wglu: wglu,
  addUserID: config.addUserID,
  addAppID: config.addAppID,
  setPoseFrequency: config.setPoseFrequency,
  setBatteryFrequency: config.setBatteryFrequency,
  setRenderFrequency: config.setRenderFrequency,
  addEvent: getData.addEvent





};
