<!-- Copilot instructions tailored for this React + Vite Amazon-clone project -->
# GitHub Copilot / AI Agent Instructions

Purpose: help AI agents quickly understand this repository's architecture, workflows, and important implementation patterns so changes are safe and consistent.

- Project type: React app bootstrapped with Vite. Frontend lives in `src/`.
- Hosting: GitHub Pages for static site (`npm run deploy` -> `gh-pages -d dist`) and Firebase Cloud Functions for server-side endpoints (see `functions/`).

Key places to inspect before editing
- Routing and app entry: `src/main.jsx`, `src/Routing.jsx` — the `DataProvider` wraps `App` and `Routing` uses `basename="/Amazon-clone"` for GH Pages.
- Global state: `src/components/DataProvider/DataProvider.jsx` and `src/Utility/reducer.js` (state shape: `{ basket: [], user: null }`, actions defined in `src/Utility/action.type.js`).
- Firebase client: `src/Utility/firebase.js` — contains the Firebase config and exported `auth` and `db` instances.
- Server functions: `functions/index.js` — Express app exported as `api` (deployed at `https://us-central1-<projectId>.cloudfunctions.net/api`). It exposes `/payment/create` which expects `?total=<integer>` and returns a Stripe `clientSecret`.
- API client placeholder: `src/API/Axios.js` exists but is incomplete — typical pattern: export an axios instance with `baseURL` pointed at the functions endpoint (e.g. `https://us-central1-clone-12875.cloudfunctions.net/api`).

Developer workflows & commands (concrete)
- Install deps: `npm install` (root) and `cd functions && npm install` for Cloud Functions.
- Dev server (frontend): `npm run dev` (runs `vite`).
- Build: `npm run build` -> `vite build`.
- Preview build: `npm run preview`.
- Deploy static site to GH Pages: `npm run predeploy && npm run deploy` (uses `gh-pages` and `homepage` field in `package.json`).
- Functions local emulator: `cd functions && npm run serve` (runs `firebase emulators:start --only functions`).
- Deploy functions: `cd functions && npm run deploy` (runs `firebase deploy --only functions`).

Project-specific conventions and gotchas
- Case sensitivity: code imports `./Action.type` while filename is `action.type.js`. Works on Windows (case-insensitive) but be consistent when editing (prefer exact filename `action.type.js`).
- State updates: `reducer.js` tracks `amount` for basket items rather than duplicate entries — use the `Type` constants (ADD_TO_BASKET, REMOVE_FROM_BASKET, SET_USER) when dispatching.
- Stripe integration: client publishable key is present in `src/Routing.jsx` and the server secret key is loaded from `process.env.STRIPE_KEY` in `functions/index.js`. Do not hardcode secret keys — put them into `functions/.env` or your cloud environment.
- Firebase config is currently committed to `src/Utility/firebase.js` — treat this as public config (API key + projectId) but avoid committing secret service keys.

Examples (copy/paste ready)
- Axios instance (implement in `src/API/Axios.js`):

```js
import axios from 'axios';

const BASE = 'https://us-central1-clone-12875.cloudfunctions.net/api';

export default axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' }
});
```

- Calling payment endpoint from frontend:

```js
// assuming axios instance above
const resp = await axios.post(`/payment/create?total=${totalInCents}`);
const clientSecret = resp.data.clientSecret;
```

What to change and when
- Small UI fixes and new pages: update under `src/pages/` or `src/components/` and preserve `DataProvider` state shape.
- Backend/payment changes: edit `functions/index.js`. Add environment secrets to `functions/.env` (not committed) and test with `npm run serve` before deploying.
- If adding new top-level routes, remember the `basename` in `Routing.jsx` for GitHub Pages.

When in doubt
- Run `npm run dev` and the functions emulator (`cd functions && npm run serve`) to reproduce frontend + backend behavior locally.
- Search for examples in `src/pages/Payment/` and `functions/index.js` before implementing payments or Stripe-related code.

If anything in this file looks incomplete or you need extra examples (tests, CI, or deployment variations), ask the repo owner for missing env values or preferred naming conventions.
