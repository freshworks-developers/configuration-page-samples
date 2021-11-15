var client;

(async function init() {
  client = await app.initialized();
  client.events.on('app.activated', makeAPIcall);
})();

async function getContacts() {
  const iparamData = await client.iparams.get('creatorDomain');
  const URL = `https://${iparamData.creatorDomain}.freshdesk.com/api/v2/contacts`;
  const options = {
    headers: {
      Authorization: `Basic <%= encode(iparam.api_key) %>`, // substitution happens by platform
      'Content-Type': 'application/json'
    }
  };

  let { response } = await client.request.get(URL, options);
  let contacts = JSON.parse(response);

  document.body.insertAdjacentHTML('beforebegin', '<h2>Listing contacts</h2>');
  contacts.forEach(function renderContact({ name }) {
    return document.body.insertAdjacentHTML('afterbegin', `${name}<br>`);
  });
}
