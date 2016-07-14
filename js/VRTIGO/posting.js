setInterval(onAnimationFrame, 4000);
setInterval(printer, 4000);
setInterval(sendData, 4000);
//setInterval(overheat, 5000)


function sendData() {

  fetch("http://a.vrtigo.io/update", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        data: storeData,
        session: []
    })
  });
  var backupData = storeData.slice();
  storeData = [];
}
