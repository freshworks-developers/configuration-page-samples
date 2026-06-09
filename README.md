# CloudFleet Logistics — Configuration Page Samples

Installation parameters (iparams) let admins configure an app **before** agents use it. This repo demonstrates three patterns for the **CloudFleet Logistics** use case — static JSON, dynamic JavaScript, and a fully custom HTML page.

**Platform:** 3.0 · **FDK:** 10.1.2 · **Node:** 24.11.0

---

## Apps in this repo

| App | Pattern | Highlights |
|-----|---------|------------|
| [`iparams-json/`](iparams-json/) | Static `config/iparams.json` | Module-scoped fields, secure API key |
| [`dynamic-iparams/`](dynamic-iparams/) | Dynamic `config/assets/iparams.js` | `currentHost`, change events, `invokeTemplate` credential check |
| [`iparams-html/`](iparams-html/) | Custom `config/iparams.html` | `getConfigs` / `postConfigs`, secure credentials, module-aware UI |

Each app is a standalone FDK project — validate and run from its own folder.

---

## When to use which pattern

| Need | Use |
|------|-----|
| Simple fields, dropdowns, secure text | `iparams-json` |
| Live validation, change events, API check on install | `dynamic-iparams` |
| Full custom layout, branding, complex wizards | `iparams-html` |

---

## Setup

```sh
git clone https://github.com/freshworks-developers/configuration-page-samples.git
cd configuration-page-samples
```

### Static JSON (`iparams-json`)

```sh
cd iparams-json
fdk run
```

Install the app from **Admin → Apps** and configure module-scoped fields (Freshdesk domain + API key vs CRM Group dropdown).

### Dynamic validation (`dynamic-iparams`)

```sh
cd dynamic-iparams
fdk run
```

On the installation page, change the domain field to see inline regex hints; enable credential validation to call `invokeTemplate` before save.

### Custom HTML (`iparams-html`)

```sh
cd iparams-html
fdk run
```

Uses `getConfigs` / `postConfigs` in `config/iparams.html` with secure credential handling and module-aware sections.

```sh
fdk validate   # run in each sub-app folder before pack
fdk pack
```

---

## Project structure

```
configuration-page-samples/
├── iparams-json/           # Static iparams.json
├── dynamic-iparams/        # iparams.js + requests.json
├── iparams-html/           # Custom installation page
├── README.md
└── USECASE.md
```

---

## Tech stack

- **Platform:** Freshworks Platform 3.0
- **Runtime:** Node.js 24.11.0 · FDK 10.1.2

---

## Resources

- [Installation settings page](https://developers.freshworks.com/docs/app-sdk/v3.0/common/app-settings/installation-settings-page/)
- [USECASE.md](./USECASE.md)
