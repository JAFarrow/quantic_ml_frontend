# quantic_ml_frontend

Purpose-built React + TypeScript shell for ingesting prediction rows and CSV batches against the Quantic ML API.

## Quick start
1. Install dependencies: `npm install`
2. Run the dev server: `npm run dev`
3. Build for production: `npm run build`

## What’s inside
- **Inline row editor**: Every field in `PredictionRowSchema` is committed to the form so analysts can submit detailed rows without leaving the UI. Each response renders a simple malware/clearware flag next to the row.
- **CSV batch upload**: Drop or select a `.csv` file that matches the same schema and send it to `/api/upload`. Successful uploads show results plus evaluation data inside a dialog over the page.
- **Centralized helpers**: Response envelopes are parsed consistently for both flows (`/api/insert` and `/api/upload`). Errors and loading states are surfaced via badges.
- **Planning + API contract**: `.opencode/planning.md` captures the roadmap; the backend expectations live in `.opencode/api_contract.md`.

## Notes
- The project treats `/api` as the base path for the backend, so no extra proxy configuration is required when the server runs on the same host.
- Responses follow the shared envelope documented in `.opencode/api_contract.md`, which you can use to reason about retries, validation errors, and `Label` handling.
- The backend base path defaults to `/api`, but you can target a different host by setting `API_BASE_URL` (e.g., `API_BASE_URL=http://127.0.0.1:8000`). `/api` is appended automatically in the client.
