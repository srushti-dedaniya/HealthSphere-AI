# HealthSphere AI

> Enterprise healthcare intelligence platform — AI-powered clinical tools for patients, doctors, and hospital administrators.

HealthSphere AI is a full-stack healthcare platform built with a **React + TypeScript** frontend and an **Express + TypeScript** backend. It provides role-based dashboards (Patient, Doctor, Admin) for managing appointments, medical reports, prescriptions, AI health insights, and more, backed by an OTP-based email/phone verification system.

---

## Features

- **Role-based dashboards** — dedicated experiences for Patients, Doctors, and Admins
- **Patient tools** — book appointments, upload & view medical reports, prescriptions, medicine reminders, AI chat, health timeline, and AI health insights
- **Doctor tools** — manage patients, appointments, calendar, prescriptions, medical history, and analytics
- **Admin tools** — user management, doctor verification, hospitals, analytics, reports, audit logs, and notifications
- **OTP verification** — email/SMS verification via `POST /api/otp/send` and `POST /api/otp/verify`, with an in-memory store, TTL, resend cooldown, and max attempt limits
- **Demo mode** — runs out-of-the-box without any email/SMS provider (OTPs are logged to the server console)
- **Monorepo** — npm workspaces for `client` and `server`
- **CI** — GitHub Actions workflows for frontend build/typecheck and backend (placeholder)

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18, TypeScript, React Router 6, Vite 5, Tailwind CSS 3 |
| Backend | Node.js, Express 4, TypeScript, `tsx` (dev), `tsc` (build) |
| Email / SMS | Nodemailer (SMTP), Twilio (optional) |
| Database | PostgreSQL 17, Prisma 7 ORM + driver adapter |
| Utilities | CORS, dotenv, npm workspaces |

---

## Prerequisites

- **Node.js** 18+ (20 LTS recommended — used by CI)
- **npm** 9+

---

## Steps to Run the Project

### 1. Install dependencies

From the project root, install dependencies for all workspaces:

```bash
npm install
```

### 2. Configure environment variables

The server reads its configuration from `server/.env`. Copy the example file and adjust as needed:

```bash
cp server/.env.example server/.env
```

> **Note:** The repo already contains a `server/.env`. When running in a fresh clone, create your own from the example. All variables are optional — the app runs in **demo mode** when email/SMS providers are left empty (OTPs are printed to the server console).

### 3. Run the backend (API server)

```bash
npm run dev --workspace server
```

The API will start at **http://localhost:4000**. Verify it with:

```bash
curl http://localhost:4000/api/health
# {"success":true,"service":"healthsphere-ai-api","status":"ok"}
```

### 4. Run the frontend (Vite dev server)

Open a second terminal and run:

```bash
npm run dev
```

The client starts at **http://localhost:5173**. The Vite dev server proxies `/api/*` requests to `http://localhost:4000` (see `client/vite.config.ts`), so no CORS setup is needed in development.

### 5. Open the app

Navigate to [http://localhost:5173](http://localhost:5173).

Log in with one of the demo accounts (shown on the login page). The login form posts to `POST /api/auth/login`, which validates the email/password against the `patients`, `doctors`, and `owners` tables in PostgreSQL. Wrong or unregistered credentials return an error:

| Role | Email | Password |
| --- | --- | --- |
| Patient | `patient@healthsphere.ai` | `patient123` |
| Doctor | `doctor@healthsphere.ai` | `doctor123` |
| Admin | `admin@healthsphere.ai` | `admin123` |

---

## Database (PostgreSQL + Prisma)

The app stores accounts in a PostgreSQL database managed by Prisma, split across three tables — one per role:

| Table | Stores |
| --- | --- |
| `patients` | patient accounts |
| `doctors` | doctor accounts |
| `owners` | the platform owner / admin account |

The login endpoint looks up the email in all three tables and returns the matching role (`patient`, `doctor`, or `admin` for owners).

### 1. Setup

Configure the connection in `server/.env`. **Local PostgreSQL**:

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/healthsphere?schema=public
```

Adjust the username/password to match your local PostgreSQL. The database `healthsphere` can be created with:

```bash
psql -U postgres -c "CREATE DATABASE healthsphere;"
```

**Supabase (hosted)** — copy the exact string from **Dashboard → Project Settings → Database → Connection string → URI**, replace `[YOUR-PASSWORD]`, and add `?sslmode=disable`:

```
DATABASE_URL=postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres?sslmode=disable
```

Notes:
- Use `sslmode=disable` (not `require`) — Prisma Studio and Prisma's CLI/Node runtime otherwise fail on Supabase's self-signed TLS chain.
- If your Supabase project is paused, resume it from the dashboard first (free projects auto-pause after ~1 week of inactivity).

### 2. Run migrations

From the `server/` directory:

```bash
npm run db:migrate        # applies migrations (and runs the seed)
```

### 3. Seed demo users

```bash
npm run db:seed
```

This inserts the three demo accounts shown above (`patient@healthsphere.ai`, `doctor@healthsphere.ai`, `admin@healthsphere.ai`).

### 4. View the data

**Option A — Prisma Studio** (visual, browser-based):

```bash
npm run db:studio
```

**Option B — psql** (command line):

```bash
psql -U postgres -h localhost -d healthsphere
```

Then run any SQL you like, for example:

```sql
\dt                                    -- list all tables
SELECT * FROM patients;                -- see every patient
SELECT * FROM doctors;                 -- see every doctor
SELECT * FROM owners;                  -- see the owner account
\q                                     -- quit
```

Or run a single query without entering the shell:

```bash
psql -U postgres -h localhost -d healthsphere -c "SELECT id, \"fullName\", email, mobile, \"isVerified\" FROM patients ORDER BY id;"
```

**Option C — any SQL client** (pgAdmin, DBeaver, DataGrip, etc.):

- Local: Host `localhost`, Port `5432`, Database `healthsphere`, User `postgres`
- Supabase: use the connection details from **Dashboard → Project Settings → Database**, or just browse the data in the **Table Editor** at `https://supabase.com/dashboard` (Table Editor → `patients` / `doctors` / `owners`).

### Prisma scripts

| Command | Description |
| --- | --- |
| `npm run db:generate` | Regenerate the Prisma client |
| `npm run db:migrate` | Create/apply migrations |
| `npm run db:seed` | Seed demo users |
| `npm run db:studio` | Open Prisma Studio (visual DB viewer) |

The Prisma schema lives in `server/prisma/schema.prisma` and the client is generated into `server/src/generated/prisma` (git-ignored). Prisma 7 configuration is in `server/prisma.config.ts`.

---

## Running Both With npm Workspaces

| Purpose | Command |
| --- | --- |
| Install all dependencies | `npm install` |
| Start backend only | `npm run dev --workspace server` |
| Start frontend only | `npm run dev` (root) or `npm run dev --workspace client` |
| Typecheck both workspaces | `npm run typecheck` |
| Build client | `npm run build` |
| Preview production client build | `npm run preview` |

---

## Environment Variables

All configuration lives in `server/.env` (see `server/.env.example`):

| Variable | Default | Description |
| --- | --- | --- |
| `PORT` | `4000` | API server port (must match Vite proxy target) |
| `NODE_ENV` | `development` | Runtime environment |
| `CORS_ORIGIN` | `*` | Comma-separated allowed origins, or `*` for all |
| `OTP_TTL_SECONDS` | `600` | OTP expiry in seconds |
| `OTP_RESEND_COOLDOWN_SECONDS` | `30` | Min seconds between resends |
| `OTP_MAX_ATTEMPTS` | `5` | Max verification attempts per OTP |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_SECURE` | — | SMTP settings for email delivery |
| `SMTP_USER` / `SMTP_PASS` | — | SMTP credentials (leave empty for demo mode) |
| `EMAIL_FROM` | `HealthSphere AI <no-reply@healthsphere.ai>` | Sender address |
| `SMS_PROVIDER` | — | Set to `twilio` to enable SMS |
| `TWILIO_ACCOUNT_SID` / `TWILIO_AUTH_TOKEN` / `TWILIO_PHONE_FROM` | — | Twilio credentials |
| `GOOGLE_CLIENT_ID` | — | Google OAuth 2.0 Web Client ID (see below) |
| `ABDM_BASE_URL` / `ABDM_CLIENT_ID` / `ABDM_CLIENT_SECRET` / `ABDM_FACILITY_ID` | — | ABDM/NDHM credentials (India HealthID/ABHA) |

Client-side env (in `client/.env`, see `client/.env.example`):

| Variable | Description |
| --- | --- |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID used by the "Continue with Google" button |

**Google Sign-In setup** — create an OAuth 2.0 **Web application** client at `https://console.cloud.google.com/apis/credentials`, copy the Client ID (ends in `.apps.googleusercontent.com`) into both `GOOGLE_CLIENT_ID` (server) and `VITE_GOOGLE_CLIENT_ID` (client), and add `http://localhost:5173` to the **Authorized JavaScript origins**. Google login only works for accounts that already exist in the database (no auto-registration).

**HealthID (ABHA/NDHM) setup** — register a health facility on the ABDM sandbox (`https://sandbox.abdm.gov.in/`) to get `ABDM_CLIENT_ID` / `ABDM_CLIENT_SECRET` and an `ABDM_FACILITY_ID`. Until these are set, HealthID login runs in **demo mode** (OTP `123456` is returned to the client and the doctor is matched by the ABHA number stored on their account — the seeded doctor uses `10-1234-5678-9012`).

> **Security:** Never commit real credentials. `server/.env` is git-ignored; only `.env.example` should be committed.

---

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/health` | Health check |
| `POST` | `/api/auth/login` | Login with email + password (validated against `patients`/`doctors`/`owners`) |
| `POST` | `/api/auth/google` | Login with a Google ID token (works only for existing accounts) |
| `POST` | `/api/auth/healthid/request-otp` | Start HealthID/ABHA login for a doctor (sends OTP via ABDM) |
| `POST` | `/api/auth/healthid/verify` | Verify the HealthID OTP and log in the doctor |
| `POST` | `/api/otp/send` | Send OTP to an email or mobile number |
| `POST` | `/api/otp/verify` | Verify an OTP code |

Example — login:

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "patient@healthsphere.ai", "password": "patient123"}'
```

Example — send an OTP:

```bash
curl -X POST http://localhost:4000/api/otp/send \
  -H "Content-Type: application/json" \
  -d '{"channel": "email", "email": "patient@example.com"}'
```

Example — verify the OTP (in demo mode the code is returned in the send response):

```bash
curl -X POST http://localhost:4000/api/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"channel": "email", "email": "patient@example.com", "code": "123456"}'
```

---

## Project Structure

```
.
├── client/                  # React + Vite frontend (npm workspace)
│   ├── pages/               # public, auth, patient, doctor, admin pages
│   ├── components/          # reusable UI components
│   ├── context/             # AuthContext (demo auth + session storage)
│   ├── routes/              # route definitions + protected/role guards
│   ├── styles/              # Tailwind theme / design tokens
│   └── vite.config.ts       # dev proxy to :4000
├── server/                  # Express + TypeScript API (npm workspace)
│   ├── src/
│   │   ├── config/          # env configuration
│   │   ├── controllers/     # request handlers
│   │   ├── middleware/      # validation + error handling
│   │   ├── routes/          # API routes
│   │   ├── services/        # OTP, email, SMS logic
│   │   └── validators/      # request validation
│   └── .env.example         # server environment template
├── docker/                  # Dockerfiles + nginx config (scaffolds)
├── docs/                    # API, architecture, deployment docs (scaffolds)
└── package.json             # root workspace config + shared scripts
```

---

## Troubleshooting

- **OTP never arrives?** No SMTP/Twilio configured — that's expected. Check the server console: OTPs are printed there and included in the `/api/otp/send` response in demo mode.
- **API not reachable from the client?** Make sure the backend is running on port `4000` and matches the proxy target in `client/vite.config.ts`.
- **Port already in use?** Change `PORT` in `server/.env` (and the Vite proxy target) or run with a different port.

---

## License

[MIT](./LICENSE)
