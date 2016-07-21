var getData = require('./getData')


function sendData() {

  fetch("https://a.vrtigo.io/update", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        data: getData.storeData,
        session: []
    })
  });
  var backupData = getData.storeData.slice();
  getData.storeData = [];
}

module.exports = {
  sendData: sendData
}
