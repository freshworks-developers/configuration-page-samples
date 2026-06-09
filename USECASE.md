# Use Cases - CloudFleet Logistics (App Lifecycle & Configuration Sample)

**Sample repo:** [freshworks-developers/configuration-page-samples](https://github.com/freshworks-developers/configuration-page-samples)  
**Apps:** `iparams-json` (static), `dynamic-iparams` (events + live validation), `iparams-html` (custom installation page)

## Company Overview

**CloudFleet Logistics** is a regional logistics SaaS company using **Freshdesk** for shipper support and **Freshworks CRM** for enterprise deals. Their marketplace app connects shipment tracking APIs to tickets and deals. Admins must configure domain, API keys, and routing rules **before** agents use the sidebar—without exposing secrets in the UI or allowing mistyped Freshdesk domains.

## Use Case Scenarios

### 1. Static Installation Page with Module-Scoped Fields (`iparams-json`)

**Scenario**: CloudFleet’s app supports both `support_ticket` (Freshdesk) and `deal` (CRM). Freshdesk admins need domain + API key; sales admins need a **Group** dropdown—fields should not clutter the wrong product’s install flow.

**Use Case**: `config/iparams.json` defines parameters with `"modules": ["support_ticket"]` or `["deal"]` so the installation page only shows relevant fields per subscribed module. `FreshdeskAPIkey` uses `"secure": true` so the key is encrypted at rest. `AccountName` is global (no `modules` filter) for branding across products.

**Platform tie-in:** [Installation parameters](https://developers.freshworks.com/docs/app-sdk/v3.0/common/app-settings/installation-settings-page/) — text, dropdown, required, default_value.

---

### 2. Secure Credential Capture for Compliance

**Scenario**: CloudFleet undergoes SOC 2 audit; API keys must never appear in plaintext in app logs or installation exports.

**Use Case**: Mark sensitive iparams with `"secure": true` (static JSON) or declare them in `postConfigs` `__meta.secure` (custom HTML). Admins enter keys once on the configuration page; runtime access uses request templates without displaying values in the browser after save.

**Platform tie-in:** `iparams-json/config/iparams.json` and `iparams-html/config/assets/iparams.js`.

---

### 3. Real-Time Domain Format Validation (`dynamic-iparams`)

**Scenario**: Admins often paste `company.freshdesk.com` incorrectly (missing subdomain, wrong TLD). Bad domains are only discovered after install when agents open tickets.

**Use Case**: `iparams.js` registers `domainChange` on the domain field via `"events": [{ "change": "domainChange" }]`. The handler applies a regex and sets `utils.set("domain_name", { hint: "Invalid domain" })` inline—blocking confusion before save. Validation runs only when `support_ticket` is in `currentHost.subscribed_modules`.

**Platform tie-in:** Dynamic installation assets in `config/assets/iparams.js`.

---

### 4. Live API Credential Check Before Install Completes

**Scenario**: CloudFleet wants optional “validate credentials” so admins know the API key works against the entered domain **during** configuration, not on first ticket.

**Use Case**: A checkbox iparam fires `validateChange`. When checked, `client.request.invokeTemplate("validateAPI", { context: { domain, apiKey } })` calls Freshdesk `GET /api/v2/tickets` with Basic auth (`encode(context.api_key)` in `requests.json`). Failure sets hints on domain and API key fields—showing **request templates on the installation page**.

**Platform tie-in:** `dynamic-iparams/config/requests.json` + `invokeTemplate` from iparams.js.

---

### 5. Multi-Product Rollout with One Marketplace Listing

**Scenario**: CloudFleet sells one marketplace app to Freshdesk-only SMBs and Freshdesk+CRM enterprises. Installation must adapt without separate listings.

**Use Case**: Combine module-scoped static iparams (which fields appear) with `client.data.get("currentHost")` to read `subscribed_modules` and tailor validation or custom UI sections per product.

**Platform tie-in:** `dynamic-iparams/config/assets/iparams.js` and `iparams-html/config/assets/iparams.js`.

---

### 6. Custom Installation Page with getConfigs / postConfigs (`iparams-html`)

**Scenario**: CloudFleet wants branded install UX with grouped sections (Freshdesk connection vs CRM routing) and client-side validation before Install is clicked.

**Use Case**: `config/iparams.html` renders Crayons form fields. `config/assets/iparams.js` implements `getConfigs` (populate Edit Settings), `postConfigs` (save with `__meta.secure` and `__meta.modules`), `validate`, and `currentHost`-driven show/hide for support vs deal sections.

**Platform tie-in:** [Custom installation page](https://developers.freshworks.com/docs/app-sdk/v3.0/common/app-settings/installation-settings-page/) — iparams.html + assets.

---

## Mapping to Sample Apps

| Scenario | Sample path |
|----------|-------------|
| Static iparams, modules, secure | `configuration-page-samples/iparams-json/` |
| Dynamic change + validate + currentHost | `configuration-page-samples/dynamic-iparams/` |
| Request template for validation | `dynamic-iparams/config/requests.json` |
| Custom HTML install page | `configuration-page-samples/iparams-html/` |
| getConfigs / postConfigs | `iparams-html/config/assets/iparams.js` |
