# API Docs

Next.js + Fumadocs + Fumadocs OpenAPI/Scalar documentation starter with a MongoDB-backed admin panel.

## Development

```bash
npm install
npm run dev
```

Routes:

- `/docs` — documentation
- `/docs/openapi` — generated OpenAPI reference
- `/admin` — admin panel

## Environment

Copy `.env.example` to `.env.local` and configure:

```env
MONGODB_URI="mongodb://..."
MONGODB_DB="socialchat"
ADMIN_SECRET="strong-admin-password"
ADMIN_SESSION_SECRET="strong-random-session-secret"
DEFAULT_OPENAPI_SOURCE_URL="https://staging-api.socialchat.id/partner/explorer-json"
```

Never commit real secrets.

## Admin flow

1. Login at `/admin` using `ADMIN_SECRET`.
2. Create or edit an OpenAPI source.
3. Click **Sync** to fetch and store the schema in MongoDB.
4. Export the active schema into `openapi.json` for static Fumadocs builds:

```bash
npm run admin:export-openapi
```

Optional one-shot seed + sync:

```bash
npm run admin:seed-openapi
npm run admin:export-openapi
```

## Validation

```bash
npm run lint
npm run build
```
