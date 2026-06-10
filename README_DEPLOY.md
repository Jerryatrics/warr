Deploying the serverless forwarder (Vercel / Netlify)

Option: Vercel (recommended)

1. Create a Vercel account and install the Vercel CLI:

```bash
npm i -g vercel
```

2. From the project root, run:

```bash
vercel login
vercel
```

Follow prompts to deploy. The default deployment will expose a URL like `https://your-app.vercel.app`.

3. In the Vercel dashboard, set an Environment Variable `DISCORD_WEBHOOK_URL` to your webhook value.

4. Update `restaurants.html` by replacing the `SERVERLESS_ENDPOINT` placeholder with:

```
https://your-app.vercel.app/api/submit
```

5. Test by opening your site and selecting date + cuisine.

Option: Netlify

1. Create a Netlify account.
2. Create a new site from your Git repository.
3. Add an environment variable `DISCORD_WEBHOOK_URL` in Site Settings → Build & Deploy → Environment.
4. In Netlify, serverless functions should live under `netlify/functions/` — you can adapt `api/submit.js` to Netlify's handler format if needed.

Security note: keep your webhook in environment variables; do not paste it into client-side code.
