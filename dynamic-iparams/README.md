# dynamic-iparams — Dynamic Installation Validation

CloudFleet Logistics sample demonstrating **dynamic** installation logic in `config/assets/iparams.js` — change events, live credential checks, and module-aware validation via `currentHost`.

### Highlights

- `domainChange` — regex validation on domain field (`events` in `iparams.json`)
- `validateChange` — optional `invokeTemplate("validateAPI")` credential check
- `client.data.get("currentHost")` — skip Freshdesk validation when `support_ticket` is not subscribed

### Files and Folders

```
.
├── README.md
├── app/
├── config/
│   ├── iparams.json
│   ├── requests.json
│   └── assets/
│       └── iparams.js
└── manifest.json
```

**Toolchain:** Platform 3.0 · Node 24.11.0 · FDK 10.1.2
