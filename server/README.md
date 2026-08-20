# Fescora career email service

This small Express service receives career applications and emails the submitted fields to the configured receiver. It does not use a database or save applications.

## Setup

1. Copy `.env.example` to `.env` inside this `server` folder.
2. Set `SMTP_USER`, `SMTP_PASS`, and `FROM_EMAIL` to a Gmail account you control.
3. Keep `CAREER_RECEIVER_EMAIL=anshurai605@gmail.com`, or replace it later with the desired recipient address.
4. In the Google account used for SMTP, enable two-step verification and generate a **Google App Password**. Use that 16-character value as `SMTP_PASS`; never use or share the normal Google password.
5. Start the service with `npm run dev`.

## Run locally

From the project root, run the frontend in one terminal:

```powershell
npm run dev
```

Then run the mail service in another terminal:

```powershell
cd server
npm run dev
```

The frontend sends requests to `http://localhost:5000` by default. Change `VITE_API_URL` in the root `.env` if the deployed API uses another URL.
