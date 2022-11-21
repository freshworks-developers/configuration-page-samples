const dropdown = document.querySelector('.select-alien');
const datepicker = document.querySelector('.datepicker');
let selectedVal = document.querySelector('.select-alien');
let apiKey = document.querySelector('.secure-field');
let selectedDate = document.querySelector('.datepicker');
let domain = document.querySelector('.domain');
let nameField = document.querySelector('.text-field');

function postConfigs() {
    return {
      __meta: {
        secure: ['apiKey']
      },
      api_key: apiKey.value,
      transformation: selectedVal.value,
      domain_url: domain.value,
      name: nameField.value,
      date: selectedDate.value
    };
  }

function getConfigs(configs) {
  let { api_key, transformation, domain_url, name, date } = configs;
  selectedVal.value = transformation;
  apiKey.value = api_key;
  selectedDate.value = date;
  domain.value = domain_url;
  nameField.value = name;
  return;
}

async function validate() {
  let URL = `https://${domain.value}/api/v2/tickets`;
  let base64Encoded = btoa(apiKey.value);
  let options = {
    headers: {
      Authorization: `Basic ${base64Encoded}`,
      'Content-Type': 'application/json'
    }
  };

  try {
    var res = JSON.parse(await client.request.get(URL, options));
    var { status } = res;
    if (status == 200) return '';
  } catch (error) {
    console.error(error);
    if (status == 401) return 'Invalid API Key';
  }
}

document.onreadystatechange = function () {
  if (document.readyState === 'interactive') renderApp();
  async function renderApp() {
    try {
      let client = await app.initialized();
      window.client = client;
    } catch (error) {
      return console.error(error);
    }
  }
};

dropdown.addEventListener('fwOptionClick', function updLablOfDrpdwn() {
  return dropdown.setAttribute('label', dropdown.value);
});
