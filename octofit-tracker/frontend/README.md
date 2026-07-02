# OctoFit Frontend (React 19 + Vite)

## Required environment variable

Define `VITE_CODESPACE_NAME` so the frontend can call the backend on port 8000 through the GitHub Codespaces URL.

Example `.env.local`:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

With this variable, API requests are sent to:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

For example:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
```

## Safe fallback behavior

If `VITE_CODESPACE_NAME` is unset, the app avoids invalid URLs like `https://undefined-8000...` and falls back to:

```text
http://localhost:8000/api/[component]/
```

## Run commands

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
