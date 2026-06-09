# iparams-json — Static Installation Parameters

CloudFleet Logistics sample demonstrating **static** installation parameters in `config/iparams.json` — module-scoped fields and secure API keys.

### Highlights

- `"modules": ["support_ticket"]` / `["deal"]` — fields appear only for subscribed products
- `"secure": true` on `FreshdeskAPIkey` — encrypted at rest
- Global `AccountName` — shared across products

### Files and Folders

```
.
├── README.md
├── app/
├── config/
│   └── iparams.json
└── manifest.json
```

**Toolchain:** Platform 3.0 · Node 24.11.0 · FDK 10.1.2
