# Warren Website

This project is a static website with a reservation flow: `yes.html` → `date.html` → `restaurants.html`.

## Free deployment setup (best choice)

### 1. Host the static site on GitHub Pages

1. Push this repository to GitHub.
2. In your repo settings, open **Pages**.
3. Choose the branch (`main` or `master`) and set the folder to `/`.
4. Save. Your site will be available at `https://<username>.github.io/<repo>`.

### 2. Deploy the Discord-forwarding function on Vercel

1. Install and log in to the Vercel CLI:

```bash
npm i -g vercel
vercel login
```

2. Deploy from the project folder:

```bash
vercel
```

3. In the Vercel dashboard, add an environment variable named `DISCORD_WEBHOOK_URL` with your webhook URL.

4. Copy the deployment URL Vercel gives you (for example `https://your-app.vercel.app`).

5. Replace the placeholder in `restaurants.html`:

```js
const SERVERLESS_ENDPOINT = 'https://your-app.vercel.app/api/submit';
```

### 3. Use the site

- Your static HTML/CSS/JS is served from GitHub Pages.
- Form submissions are sent to the Vercel function at `/api/submit`.
- The Vercel function forwards the reservation to Discord using your webhook URL.

## Notes

- The static front-end is free on GitHub Pages.
- The serverless function is free on Vercel's hobby tier for small usage.
- Keep `DISCORD_WEBHOOK_URL` in Vercel environment variables only. Do not publish it in client-side code.

## Local testing

1. Install dependencies:

```bash
npm install
```

2. Use Vercel dev if installed:

```bash
vercel dev
```

This will run the function locally so you can test `restaurants.html` with the serverless endpoint.
