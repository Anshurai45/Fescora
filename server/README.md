# Fescora website email service

This Express service is for local development or for a separate backend host such as Render. The production Vercel site should normally use the root `api` serverless functions instead.

## Setup

1. Copy `.env.example` to `.env` inside this `server` folder.
2. Set `SMTP_USER`, `SMTP_PASS`, and `FROM_EMAIL` to the sender mailbox.
3. Keep `CONTACT_RECEIVER_EMAIL=hr.kk@fescora.com` and `CAREER_RECEIVER_EMAIL=anshu.rai@fescora.com`, or replace them with the final recipient addresses.
4. For Gmail SMTP, enable two-step verification and generate a Google App Password. Use that 16-character value as `SMTP_PASS`.
5. Start the service with `npm run dev`.

## Run locally

From the project root, run the frontend in one terminal:

```powershell
npm run dev
```

Then run the mail service in another terminal:

```powershell
cd server
npm install
npm run dev
```

The local frontend sends requests to `http://localhost:5000` when root `.env` contains:

```env
VITE_API_URL=http://localhost:5000
```

## Render deployment

Render is optional. Use it only if you do not want to use Vercel serverless functions.

If you deploy this folder to Render, set:

```env
PORT=5000
CLIENT_ORIGIN=https://your-domain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-sender@gmail.com
SMTP_PASS=your-16-character-app-password
FROM_EMAIL=your-sender@gmail.com
CONTACT_RECEIVER_EMAIL=hr.kk@fescora.com
CAREER_RECEIVER_EMAIL=anshu.rai@fescora.com
```

Then set `VITE_API_URL` in Vercel to the Render service URL.
