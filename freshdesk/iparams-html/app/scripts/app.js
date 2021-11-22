var client;

(async function init() {
  client = await app.initialized();
  client.events.on('app.activated', getJoke);
})();

async function getJoke() {
  const JOKE_ENDPOINT = 'https://official-joke-api.appspot.com/random_joke';
  let [err, data] = await to(client.request.get(JOKE_ENDPOINT));
  if (err) {
    console.error('The Joke API is unavailable at the moment\nDetails:', err);
    pick('.spinner-div').style.display = 'none';
    pick('section').innerHTML = `<p> The Joke API Server is down at the moment<p>`;
    return;
  }
  let response = data.response;
  showSpinner(response);
  response = JSON.parse(response);
  const { setup, punchline } = response;
  displayPunchline(punchline);
  pick('.card').style.display = 'block';
  pick('#setup').innerHTML = `<fw-label value="Question:" color="red"></fw-label> ${setup}`;
}

function showSpinner(data) {
  if (data) {
    pick('.spinner-div').style.display = 'none';
  }
}

function displayPunchline(punchline) {
  pick('#punchline-btn').addEventListener('click', function () {
    pick('#punchline').innerHTML = `<fw-label value="${punchline}" color="green"></fw-label>`;
  });
}

function pick(selector) {
  return document.querySelector(selector);
}

function to(promise, improved) {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      if (improved) {
        Object.assign(err, improved);
      }
      return [err];
    });
}
