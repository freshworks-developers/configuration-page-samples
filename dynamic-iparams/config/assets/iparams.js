let client;
let subscribedModules = [];

init();

async function init() {
  client = await app.initialized();
  subscribedModules = await getSubscribedModules();
}

async function getSubscribedModules() {
  const data = await client.data.get("currentHost");
  return data.currentHost.subscribed_modules || [];
}

// Referenced from config/iparams.json domain_name change event
// eslint-disable-next-line no-unused-vars
function domainChange(newValue) {
  if (!subscribedModules.includes("support_ticket")) {
    return;
  }

  const regex = /[A-Za-z]+[0-9]+\.freshdesk\.com/i;
  if (!regex.test(newValue)) {
    utils.set("domain_name", { hint: "Invalid domain" });
  } else {
    utils.set("domain_name", { hint: "" });
  }
}

// Referenced from config/iparams.json validate change event
// eslint-disable-next-line no-unused-vars
async function validateChange(newValue) {
  if (!subscribedModules.includes("support_ticket")) {
    return;
  }

  if (newValue) {
    try {
      await client.request.invokeTemplate("validateAPI", {
        context: {
          domain: utils.get("domain_name"),
          apiKey: utils.get("api_key")
        }
      });
      utils.set("domain_name", { hint: "" });
      utils.set("api_key", { hint: "" });
    } catch {
      utils.set("domain_name", { hint: "Invalid domain" });
      utils.set("api_key", { hint: "Invalid API key" });
    }
  }
}
