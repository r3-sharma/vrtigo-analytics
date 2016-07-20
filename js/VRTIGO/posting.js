var getData = require('./getData')
var init = require('./initialization')

function sendData() {

  fetch("http://a.vrtigo.io/update", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        data: init.storeData,
        session: []
    })
  });
  var backupData = init.storeData.slice();
  init.storeData = [];
}

module.exports = {
  sendData: sendData
}
