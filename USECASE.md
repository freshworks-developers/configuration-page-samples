Use Cases - CloudFleet Logistics / Configuration Page Samples
==============================================================

Company Overview
----------------

**CloudFleet Logistics** is a regional logistics SaaS company using **Freshdesk** for shipper support and **Freshworks CRM** for enterprise deals. Their marketplace app connects shipment tracking APIs to tickets and deals. Admins must configure domain, API keys, and routing rules before agents use the sidebar — without exposing secrets or allowing mistyped Freshdesk domains.

* * * * *

Use Case Scenarios
------------------

### 1\. Static Installation Page with Module-Scoped Fields

**Scenario**: CloudFleet's app supports both Freshdesk tickets and CRM deals. Freshdesk admins need domain plus API key; sales admins need a Group dropdown — fields should not clutter the wrong product's install flow.

**Use Case**: `iparams-json/config/iparams.json` defines parameters with `"modules": ["support_ticket"]` or `["deal"]` so the installation page only shows relevant fields per subscribed module. `FreshdeskAPIkey` uses `"secure": true` for encryption at rest.

* * * * *

### 2\. Secure Credential Capture for Compliance

**Scenario**: CloudFleet undergoes SOC 2 audit; API keys must never appear in plaintext in app logs or installation exports.

**Use Case**: Sensitive iparams use `"secure": true` in static JSON or `__meta.secure` in custom HTML `postConfigs`. Admins enter keys once; runtime access uses request templates without displaying values in the browser after save.

* * * * *

### 3\. Real-Time Domain Format Validation

**Scenario**: Admins often paste `company.freshdesk.com` incorrectly. Bad domains are only discovered after install when agents open tickets.

**Use Case**: `dynamic-iparams/config/assets/iparams.js` registers `domainChange` via `"events": [{ "change": "domainChange" }]`. The handler applies a regex and sets inline hints with `utils.set` before the admin clicks Install.

* * * * *

### 4\. Live API Credential Check Before Install Completes

**Scenario**: CloudFleet wants optional "validate credentials" so admins know the API key works against the entered domain during configuration, not on first ticket.

**Use Case**: A checkbox fires `validateChange`. When enabled, `client.request.invokeTemplate('validateAPI', { context: { domain, apiKey } })` calls Freshdesk and sets field hints on failure — demonstrating request templates on the installation page itself.

* * * * *

### 5\. Custom Installation Page with getConfigs / postConfigs

**Scenario**: CloudFleet wants branded install UX with grouped sections (Freshdesk connection vs CRM routing) and client-side validation before Install is clicked.

**Use Case**: `iparams-html/config/iparams.html` renders a Crayons form. `config/assets/iparams.js` implements `getConfigs`, `postConfigs`, `validate`, and `currentHost`-driven show/hide for support vs deal sections.
