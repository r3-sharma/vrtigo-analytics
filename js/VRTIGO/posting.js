var getData = require('./getData');

function sendData(data) {

  fetch("https://a.vrtigo.io/update", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        data: data,
        session: []
    })
  });
}

module.exports = {
  sendData: sendData
};
