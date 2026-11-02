# TechFest 2026 – Experiment 5 implementation notes

This is an updated copy of the supplied Experiment 4 MERN application. Existing React pages, Express routes, MongoDB models, JWT authentication, and event registration flow are retained.

## Changes made

### Security
- Added API security headers (content-type sniffing, framing, referrer, permissions, CSP, and production HSTS).
- Disabled the Express `X-Powered-By` header.
- Added CORS allow-list configuration through `CLIENT_ORIGIN`.
- Limited JSON request bodies to 20 KB.
- Added recursive MongoDB operator/dotted-key filtering for JSON bodies.
- Added general API and stricter authentication rate limits.
- Normalized email addresses and increased registration password minimum to 8 characters and a maximum of 72 UTF-8 bytes (bcrypt limit).
- Restricted event updates to an explicit allow-list of fields.
- Avoided exposing stack/error details in production.
- Added a health endpoint at `/health`.
- Kept React's normal escaped text rendering; do not use `dangerouslySetInnerHTML` with user-controlled values.

**Authentication architecture note:** the existing app sends JWTs in the `Authorization: Bearer` header and stores them in localStorage. It does not use authentication cookies, so cookie-based CSRF settings (`SameSite`, `HttpOnly`) are not applicable to the current flow. The trade-off is that an XSS flaw could expose a token in localStorage; keep rendering user input as text and retain the frontend CSP. A future cookie-session migration should use HttpOnly/Secure/SameSite cookies plus CSRF tokens and `credentials: true` CORS configuration.

The in-memory rate limiter is suitable for a single-process practical deployment/demo. Use a shared store for multiple backend instances.

### Testing and CI
- Added Node's built-in test runner tests for MongoDB input filtering and rate limiting.
- Added `npm test` and `npm run check` backend scripts.
- Added GitHub Actions workflow to install dependencies, lint and build the frontend, and test/check the backend.

### Performance
- Added lazy loading for route-level React pages.
- Added lazy loading and asynchronous decoding to gallery images.
- Vite's production build performs bundling and minification.

### Deployment configuration
- Added `netlify.toml` and SPA fallback redirect for the React frontend.
- Added Netlify `_headers` security headers.
- Added a Render Blueprint (`techfest-backend/render.yaml`) with health check and environment-variable placeholders.
- Added frontend/backend `.env.example` files.
- Excluded real `.env` files and secrets from the delivered archive.

## Local setup

### Backend
```bash
cd techfest-backend
npm ci
cp .env.example .env
# Edit .env with your MongoDB URI and a long random JWT secret.
npm run seed
npm test
npm start
```

### Frontend
Open a second terminal in `techfest2026-react`:
```bash
npm ci
cp .env.example .env
# For local development, VITE_API_URL=http://localhost:5000/api
npm run lint
npm run build
npm run dev
```

## Cloud deployment steps still requiring your accounts
1. Create a MongoDB Atlas cluster and database user. Add the Render outbound IP/network access as appropriate. Do not commit credentials.
2. Deploy `techfest-backend` on Render. Set `MONGO_URI`, `JWT_SECRET` (at least 32 characters), and `CLIENT_ORIGIN` (your exact Netlify URL).
3. Deploy the frontend on Netlify. Set `VITE_API_URL` to `https://YOUR-RENDER-SERVICE.onrender.com/api`.
4. Trigger a fresh frontend build after setting the environment variable.
5. Add GitHub repository secrets only if future workflow steps need them. The current CI does not need database credentials.

## Important verification
- The app's backend package lock remains aligned with its existing dependencies; security middleware was implemented with built-in Node/Express functionality so no new runtime packages are required.
- Run `npm ci`, `npm test`, `npm run check`, `npm run lint`, and `npm run build` locally or through GitHub Actions before submission.
- Real cloud deployment, Lighthouse scores, and cross-device screenshots cannot be completed without access to the user's hosting accounts and browser.
