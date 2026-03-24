# GearShift Frontend

> React-based frontend for the GearShift vehicle diagnostics and service marketplace platform.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Routing | React Router DOM v6 |
| HTTP Client | Axios |
| Database/Auth | Supabase JS Client |
| Testing | React Testing Library + Jest |

---

## Project Structure

```
frontend/
├── public/            # Static assets
└── src/
    ├── App.js         # Root component & routing
    ├── components/    # Reusable UI components
    ├── context/       # React context (auth, global state)
    └── lib/           # Supabase client & utilities
```

---

## Getting Started

### Prerequisites

- Node.js v18+
- GearShift Backend running on `http://localhost:5000`
- A [Supabase](https://supabase.com) project

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/naumaniqbal2005/GearShift-Frontend.git
cd GearShift-Frontend

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your values in .env

# 4. Start the dev server
npm start
```

The app will be available at **http://localhost:3000**.

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the following:

```env
REACT_APP_SUPABASE_URL=your_supabase_url_here
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key_here
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_FRONTEND_URL=http://localhost:3000
```

> **Note:** All React environment variables must be prefixed with `REACT_APP_`.

---

## Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run tests with React Testing Library |
| `npm run eject` | Eject from Create React App (irreversible) |

---

## Connecting to the Backend

The frontend makes requests to backend endpoints like `/api/auth/login` and `/api/users/profile`.

You have two valid setups:

1) **Use CRA proxy (recommended for local dev)**: leave `REACT_APP_API_BASE_URL` empty and rely on the `proxy` field in `package.json`:

```json
"proxy": "http://localhost:5000"
```

2) **Use an explicit base URL**: set `REACT_APP_API_BASE_URL=http://localhost:5000` (or your deployed backend URL). In this case, the `proxy` setting is not required.

Make sure the backend server is running before using the app.

---

## Supabase OAuth Redirect URL (if using Google)

If you use `supabase.auth.signInWithOAuth(...)`, configure your Supabase project’s redirect URL to match the frontend:

- Local: `http://localhost:3000`

The app includes an `OAuthCallback` screen that exchanges the Supabase session access token for a backend JWT via:

- `POST /api/auth/supabase/exchange`

---

## License

MIT — GearShift Team
