let client;
let accountNameField;
let freshdeskDomainField;
let freshdeskApiKeyField;
let trackingApiKeyField;
let dealGroupField;
let supportSection;
let dealSection;

init();

async function init() {
  client = await app.initialized();
  accountNameField = document.querySelector(".account-name-field");
  freshdeskDomainField = document.querySelector(".freshdesk-domain-field");
  freshdeskApiKeyField = document.querySelector(".freshdesk-api-key-field");
  trackingApiKeyField = document.querySelector(".tracking-api-key-field");
  dealGroupField = document.querySelector(".deal-group-field");
  supportSection = document.querySelector(".support-section");
  dealSection = document.querySelector(".deal-section");

  const modules = await getSubscribedModules();
  if (!modules.includes("support_ticket")) {
    supportSection.style.display = "none";
  }
  if (!modules.includes("deal")) {
    dealSection.style.display = "none";
  }
}

async function getSubscribedModules() {
  const data = await client.data.get("currentHost");
  return data.currentHost.subscribed_modules || [];
}

// Invoked by platform on Edit Settings
// eslint-disable-next-line no-unused-vars
function getConfigs(configs) {
  accountNameField.value = configs.account_name || "";
  freshdeskDomainField.value = configs.freshdesk_domain || "";
  dealGroupField.value = configs.deal_group || "opt1";
}

// Invoked by platform on Install / Save
// eslint-disable-next-line no-unused-vars
function postConfigs() {
  return {
    __meta: {
      secure: ["freshdesk_api_key", "tracking_api_key"],
      modules: {
        support_ticket: ["freshdesk_domain", "freshdesk_api_key", "tracking_api_key"],
        deal: ["deal_group"]
      }
    },
    account_name: accountNameField.value,
    freshdesk_domain: freshdeskDomainField.value,
    freshdesk_api_key: freshdeskApiKeyField.value,
    tracking_api_key: trackingApiKeyField.value,
    deal_group: dealGroupField.value
  };
}

// Invoked by platform before save
// eslint-disable-next-line no-unused-vars
function validate() {
  let isValid = true;

  if (!accountNameField.value.trim()) {
    accountNameField.setAttribute("state", "error");
    accountNameField.setAttribute("error-text", "Account name is required");
    isValid = false;
  }

  if (supportSection.style.display !== "none") {
    const domainRegex = /^[a-z0-9][a-z0-9-]*\.freshdesk\.com$/i;
    if (!domainRegex.test(freshdeskDomainField.value)) {
      freshdeskDomainField.setAttribute("state", "error");
      freshdeskDomainField.setAttribute(
        "error-text",
        "Enter a valid Freshdesk domain (e.g. company.freshdesk.com)"
      );
      isValid = false;
    }
    if (!freshdeskApiKeyField.value.trim()) {
      freshdeskApiKeyField.setAttribute("state", "error");
      freshdeskApiKeyField.setAttribute("error-text", "API key is required");
      isValid = false;
    }
    if (!trackingApiKeyField.value.trim()) {
      trackingApiKeyField.setAttribute("state", "error");
      trackingApiKeyField.setAttribute("error-text", "Tracking API key is required");
      isValid = false;
    }
  }

  if (dealSection.style.display !== "none" && !dealGroupField.value) {
    dealGroupField.setAttribute("state", "error");
    dealGroupField.setAttribute("error-text", "Select a deal group");
    isValid = false;
  }

  return isValid;
}
