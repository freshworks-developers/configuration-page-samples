document.onreadystatechange = whenInteractive;

function whenInteractive() {
  if (document.readyState === 'interactive') {
    return app.initialized().then(getClientAPI).catch(console.error);
  }
}

function getClientAPI(_client) {
  window.client = _client;
  // For apps those run in background,the callback is invoked everytime page is opened by the Freshdesk Agent.
  client.events.on('app.activated', makeAPIcall);
}

function makeAPIcall() {
  client.iparams
    .get()
    .then(function (iparams) {
      client.request
        .invokeTemplate("getAgentsAPI")
        .then(function ({ response }) {
          let agentData = JSON.parse(response);
          document.getElementById('apptext').innerText = `Hey ${agentData['agent']['first_name']}, ${iparams.transformation} is my fav transformation too!, No Pinky Promise 😝`
        })
        .catch(console.error);
    })
}
