let client
init();

async function init() {
  client = await app.initialized();
}

function domainChange(newValue) {
  //Input type validation
  let regex = /[A-Za-z]+[0-9]+\.freshdesk\.com/i;
  if(!regex.test(newValue)){
    utils.set("domain_name", { hint: "Invalid domain" })
  }
}

async function validateChange(newValue) {
  if (newValue) {
    try {
      let res = await client.request.invokeTemplate("validateAPI", {
        context: {
          domain: utils.get("domain_name"),
          apiKey: utils.get("api_key")
        }
      })
    } catch (e) {
      utils.set("domain_name", { hint: "Invalid domain" })
      utils.set("api_key", { hint: "Invalid API key" })
    }
  }
}