# Fescora website

React/Vite frontend with Vercel serverless email endpoints for contact enquiries and career applications.

## How email works

The live Vercel deployment uses these serverless endpoints from the root `api` folder:

- `POST /api/contact`
- `POST /api/careers/apply`
- `POST /api/create-order`
- `POST /api/verify-payment`
- `GET /api/health`

The separate `server` folder is only for local Express testing or for a future Render/Railway backend. If frontend and API are both in this same Vercel project, you do not need Render.

## Local setup

Install frontend dependencies:

```powershell
npm install
```

Create `.env` in the project root for local development:

```env
VITE_API_URL=http://localhost:5000
```

Create `server/.env` from `server/.env.example`, then add real SMTP credentials.

Run the frontend and local Express mail service in separate terminals:

```powershell
npm run dev
```

```powershell
cd server
npm install
npm run dev
```

Then open `http://localhost:5173` and submit both forms.

## Vercel deployment

In Vercel Project Settings -> Environment Variables, add these to Production and Preview:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-sender@gmail.com
SMTP_PASS=your-16-character-app-password
FROM_EMAIL=your-sender@gmail.com
CONTACT_RECEIVER_EMAIL=hr.kk@fescora.com
CAREER_RECEIVER_EMAIL=anshu.rai@fescora.com
VITE_RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_ID=your_test_key_id
RAZORPAY_KEY_SECRET=your_test_key_secret
RAZORPAY_AMOUNT=35400
```

Important: do not set `VITE_API_URL` on Vercel when the API is in this same project. The frontend will call `/api/contact` and `/api/careers/apply` on your custom domain automatically. If `VITE_API_URL` is already set to `http://localhost:5000` in Vercel, remove it and redeploy.

For Gmail SMTP, the sender account must have 2-step verification enabled and `SMTP_PASS` must be a Google App Password, not the normal Gmail password.

After redeploying, verify:

```powershell
curl https://your-domain.com/api/health
```

It should return:

```json
{ "ok": true, "service": "fescora-api" }
```

Then test the Contact page and Career page on the custom domain.

## Razorpay test payment

This project uses Razorpay Standard Web Checkout for Candidate Registration:

- Amount is enforced server-side as `35400` paise, which is `₹354`.
- The frontend only receives/uses the Razorpay Key ID.
- `RAZORPAY_KEY_SECRET` must only be configured in Vercel environment variables.
- Payment success is shown only after `/api/verify-payment` verifies the Razorpay signature server-side.
- After verified payment, the server generates a Member ID in `FSC-YYYY-XXXXXX` format.
- Candidate and admin confirmation emails are attempted after successful payment verification.
- If email delivery fails, the payment remains successful and the UI does not expose SMTP errors.
- Duplicate callbacks are protected with an in-memory per-instance payment cache. Without a database, this is best-effort across serverless instances.

To test after deployment:

1. Open `https://your-domain.com/candidate-registration`.
2. Fill the form and accept the Terms checkbox.
3. Click `Proceed to Payment — ₹354`.
4. Confirm Razorpay TEST checkout opens and shows `₹354`.
5. Complete payment using Razorpay test-mode details from your Razorpay dashboard.
6. Confirm the page shows `Registration Successful` with Member ID and Payment ID.
7. Confirm the candidate email and admin email are received.
8. Close/cancel the checkout once to confirm the page does not show success.

## Custom domain checklist

1. In Vercel, add both `fescora.com` and `www.fescora.com` if you want both to work.
2. In your domain DNS, point the apex/root domain to Vercel and add the `www` CNAME shown by Vercel.
3. Wait until Vercel shows the domain as valid with SSL active.
4. Make sure all SMTP variables above exist in Vercel Production.
5. Redeploy after changing environment variables.

## Render option

Use Render only if you decide to host the Express backend separately. In that case:

1. Deploy the `server` folder as a Node web service.
2. Set the same SMTP variables in Render.
3. Set `CLIENT_ORIGIN=https://your-domain.com` in Render.
4. Set `VITE_API_URL=https://your-render-service-url.onrender.com` in Vercel.

For the current setup, Vercel serverless API is simpler and recommended.
