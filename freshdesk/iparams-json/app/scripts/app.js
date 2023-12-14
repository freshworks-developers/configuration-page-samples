var client;

(async function init() {
  client = await app.initialized();
  client.events.on('app.activated', getContacts);
})();

async function getContacts() {

  let { response } = await client.request.invokeTemplate("getContactsAPI");
  let contacts = JSON.parse(response);

  document.body.insertAdjacentHTML('beforebegin', '<h2>Listing contacts</h2>');
  contacts.forEach(function renderContact({ name }) {
    return document.body.insertAdjacentHTML('afterbegin', `${name}<br>`);
  });
}
