# iparams-html — Custom Installation Page

CloudFleet Logistics sample demonstrating a **custom** installation page (`config/iparams.html`) with `getConfigs`, `postConfigs`, `validate`, and module-aware UI via `currentHost`.

### Highlights

- `config/iparams.html` — branded form with Freshdesk and CRM sections
- `config/assets/iparams.js` — `getConfigs` / `postConfigs` with `__meta.secure` and `__meta.modules`
- `client.data.get("currentHost")` — show/hide sections by `subscribed_modules`

### Files and Folders

```
.
├── README.md
├── app/                        Frontend placeholder (ticket_conversation_editor, deal_entity_menu)
├── config/
│   ├── iparams.html            Custom installation page
│   └── assets/
│       ├── iparams.js          getConfigs, postConfigs, validate, currentHost
│       └── iparams.css
└── manifest.json
```

**Toolchain:** Platform 3.0 · Node 24.11.0 · FDK 10.1.2
